import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { ICON_DELETE, ICON_DRAG_HANDLE, ICON_LOADING, ICON_SETTINGS } from '../basic-widgets/constants';
import { useForceUpdate } from '../basic-widgets/utils';
import { fetchChartData } from '../services/console/report';
import { ChartDataSet } from '../services/tuples/chart-types';
import { saveReport } from '../services/tuples/report';
import { Report } from '../services/tuples/report-types';
import { CHART_MIN_HEIGHT, CHART_MIN_WIDTH } from './constants';
import { Diagram } from './diagram';
import { DiagramLoading } from './diagram/widgets';
import { useReportEventBus } from './report-event-bus';
import { ReportEventTypes } from './report-event-bus-types';
import { DragType } from './types';
import { ChartButton, ChartButtons, ChartContainer, ChartDragHandle, ChartDragHandlePart } from './widgets';

interface DragState {
	top: number;
	left: number;
	width: number;
	height: number;
	type: DragType;
	startX: number;
	startY: number;
}
interface DiagramState {
	loaded: boolean;
	dataset?: ChartDataSet;
}

const resizeFromTop = (top: number, height: number, clientY: number, startY: number) => {
	let newHeight: number, newTop: number;
	if (clientY <= startY) {
		// more height gained from top
		newHeight = Math.max(height + startY - clientY, CHART_MIN_HEIGHT);
		newTop = Math.max(top + clientY - startY, 0);
	} else if (clientY - startY <= height) {
		// reduce height, but still on top of bottom border
		newHeight = Math.max(height - (clientY - startY), CHART_MIN_HEIGHT);
		newTop = Math.max(top + clientY - startY, 0);
	} else {
		// resize from top side, mouse client Y is under original bottom border
		// which means new height is min value, so just simply move top
		// and top is current mouse client Y
		newHeight = CHART_MIN_HEIGHT;
		newTop = Math.max(top + clientY - startY, 0);
	}
	return { top: newTop, height: newHeight };
};

const resizeFromBottom = (top: number, height: number, clientY: number, startY: number) => {
	let newHeight: number, newTop = top;
	if (startY - clientY <= 0) {
		// more height gained from bottom
		newHeight = Math.max(height + clientY - startY, CHART_MIN_HEIGHT);
	} else if (startY - clientY <= height) {
		// reduce height, but still on bottom of top border
		newHeight = Math.max(height - (startY - clientY), CHART_MIN_HEIGHT);
		if (newHeight === CHART_MIN_HEIGHT) {
			// start to push, not resize anymore
			newTop = Math.max(top - (startY - clientY - (height - CHART_MIN_HEIGHT)), 0);
		}
	} else {
		// resize from bottom side, mouse client Y is above original top border
		// which means new height is min value, so just simply move top
		// and top is current mouse client Y subtract current height change
		newHeight = CHART_MIN_HEIGHT;
		newTop = Math.max(top - (startY - clientY - (height - CHART_MIN_HEIGHT)), 0);
	}
	return { top: newTop, height: newHeight };
};

const resizeFromLeft = (left: number, width: number, clientX: number, startX: number) => {
	let newWidth: number, newLeft: number;
	if (clientX <= startX) {
		// more width gained from left
		newWidth = Math.max(width + startX - clientX, CHART_MIN_WIDTH);
		newLeft = Math.max(left + clientX - startX, 0);
	} else if (clientX - startX <= width) {
		// reduce width, but still on left of right border
		newWidth = Math.max(width - (clientX - startX), CHART_MIN_WIDTH);
		newLeft = Math.max(left + clientX - startX, 0);
	} else {
		// resize from left side, mouse client X is over original right border
		// which means new width is min value, so just simply move left
		// and left is current mouse client X
		newWidth = CHART_MIN_WIDTH;
		newLeft = Math.max(left + clientX - startX, 0);
	}
	return { left: newLeft, width: newWidth };
};

const resizeFromRight = (left: number, width: number, clientX: number, startX: number) => {
	let newWidth: number, newLeft = left;
	if (startX - clientX <= 0) {
		// more width gained from right
		newWidth = Math.max(width + clientX - startX, CHART_MIN_WIDTH);
	} else if (startX - clientX <= width) {
		// reduce width, but still on right of left border
		newWidth = Math.max(width - (startX - clientX), CHART_MIN_WIDTH);
		if (newWidth === CHART_MIN_WIDTH) {
			// start to push, not resize anymore
			newLeft = Math.max(left - (startX - clientX - (width - CHART_MIN_WIDTH)), 0);
		}
	} else {
		// resize from right side, mouse client X is over original left border
		// which means new width is min value, so just simply move left
		// and left is current mouse client X subtract current width change
		newWidth = CHART_MIN_WIDTH;
		newLeft = Math.max(left - (startX - clientX - (width - CHART_MIN_WIDTH)), 0);
	}
	return { left: newLeft, width: newWidth };
};

export const Container = (props: {
	report: Report;
	fixed: boolean;
	editable: boolean;
	removable: boolean;
}) => {
	const { report, fixed, editable, removable } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const dndRef = useRef<HTMLDivElement>(null);
	const { fire, on, off } = useReportEventBus();
	const [ dragState, setDragState ] = useState<DragState>({
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		type: DragType.NONE,
		startX: 0,
		startY: 0
	});
	const [ diagramState, setDiagramState ] = useState<DiagramState>({ loaded: false });
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (!diagramState.loaded) {
			(async () => {
				const dataset = await fetchChartData(report.reportId, report.chart.type);
				setDiagramState({ loaded: true, dataset });
			})();
		}
		const onEditCompleted = (completedReport: Report, shouldReloadData: boolean) => {
			if (report !== completedReport) {
				return;
			}
			if (shouldReloadData) {
				setDiagramState({ loaded: false });
				(async () => {
					const dataset = await fetchChartData(report.reportId, report.chart.type);
					setDiagramState({ loaded: true, dataset });
				})();
			} else {
				forceUpdate();
			}
		};
		on(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
		return () => {
			off(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
		};
	}, [
		on, off, forceUpdate,
		report, diagramState.loaded
	]);

	const onMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
		const { current: container } = containerRef;
		if (!container) {
			return;
		}

		// start dnd
		const { clientX, clientY } = event;
		const top = parseFloat(container.style.top);
		const left = parseFloat(container.style.left);
		const width = parseFloat(container.style.width);
		const height = parseFloat(container.style.height);
		const target = event.target as HTMLElement;
		const position = dndRef.current?.contains(target) ? DragType.DND : target.getAttribute('data-position');
		if (position) {
			// sides and corners
			container.style.transition = 'none';
			container.style.boxShadow = 'var(--warn-hover-shadow)';
			setDragState({ top, left, width, height, type: position as DragType, startX: clientX, startY: clientY });
		}
	};
	const releaseDraggingIfCan = () => {
		if (dragState.type !== DragType.NONE) {
			// end dnd
			const { current: container } = containerRef;
			if (container) {
				container.style.transition = '';
				container.style.boxShadow = '';
				const { width, height } = container.getBoundingClientRect();
				report.rect = {
					x: parseInt(container.style.left),
					y: parseInt(container.style.top),
					width,
					height
				};
			}
			setDragState({ top: 0, left: 0, width: 0, height: 0, type: DragType.NONE, startX: 0, startY: 0 });
			window.getSelection()?.removeAllRanges();
			(async () => {
				await saveReport(report);
			})();
		}
	};
	const onMouseUp = () => releaseDraggingIfCan();
	const onMouseLeave = () => releaseDraggingIfCan();
	const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		const { current: container } = containerRef;
		if (dragState.type === DragType.NONE || !container) {
			return;
		}

		const { clientX, clientY } = event;
		const chartStyle = container.style;
		const { top, left, width, height, type } = dragState;
		const { startX, startY } = dragState;

		switch (type) {
			case DragType.DND: {
				// console.log('top:', top, startY, clientY, top + clientY - startY, 'left:', left, startX, clientX, left + clientX - startX);
				chartStyle.top = `${Math.max(0, top + clientY - startY)}px`;
				chartStyle.left = `${Math.max(0, left + clientX - startX)}px`;
				break;
			}
			case DragType.RESIZE_TOP: {
				const { top: newTop, height: newHeight } = resizeFromTop(top, height, clientY, startY);
				chartStyle.top = `${newTop}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_BOTTOM: {
				const { top: newTop, height: newHeight } = resizeFromBottom(top, height, clientY, startY);
				chartStyle.top = `${newTop}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_LEFT: {
				const { left: newLeft, width: newWidth } = resizeFromLeft(left, width, clientX, startX);
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				break;
			}
			case DragType.RESIZE_RIGHT: {
				const { left: newLeft, width: newWidth } = resizeFromRight(left, width, clientX, startX);
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				break;
			}
			case DragType.RESIZE_TOP_LEFT: {
				const { top: newTop, height: newHeight } = resizeFromTop(top, height, clientY, startY);
				const { left: newLeft, width: newWidth } = resizeFromLeft(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_TOP_RIGHT: {
				const { top: newTop, height: newHeight } = resizeFromTop(top, height, clientY, startY);
				const { left: newLeft, width: newWidth } = resizeFromRight(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_BOTTOM_LEFT: {
				const { top: newTop, height: newHeight } = resizeFromBottom(top, height, clientY, startY);
				const { left: newLeft, width: newWidth } = resizeFromLeft(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
			case DragType.RESIZE_BOTTOM_RIGHT: {
				const { top: newTop, height: newHeight } = resizeFromBottom(top, height, clientY, startY);
				const { left: newLeft, width: newWidth } = resizeFromRight(left, width, clientX, startX);
				chartStyle.top = `${newTop}px`;
				chartStyle.left = `${newLeft}px`;
				chartStyle.width = `${newWidth}px`;
				chartStyle.height = `${newHeight}px`;
				break;
			}
		}
	};
	const onEditClicked = () => fire(ReportEventTypes.DO_EDIT, report);
	const onRemoveClicked = () => fire(ReportEventTypes.DO_DELETE, report);

	return <ChartContainer rect={report.rect} fixed={fixed} ref={containerRef}>
		{diagramState.loaded
			? <Diagram report={report} dataset={diagramState.dataset!}/>
			: <DiagramLoading>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</DiagramLoading>}
		{
			fixed
				? null
				: <ChartDragHandle onMouseDown={onMouseDown} onMouseUp={onMouseUp}
				                   onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_RIGHT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP_RIGHT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM_RIGHT}/>
					<ChartDragHandlePart data-part-type='dragging' data-position={dragState.type}/>
					<ChartDragHandlePart data-position={DragType.DND} ref={dndRef}>
						<FontAwesomeIcon icon={ICON_DRAG_HANDLE}/>
					</ChartDragHandlePart>
					{editable || removable
						? <ChartButtons>
							{editable
								? <ChartButton onClick={onEditClicked}>
									<FontAwesomeIcon icon={ICON_SETTINGS}/>
								</ChartButton>
								: null}
							{removable
								? <ChartButton onClick={onRemoveClicked}>
									<FontAwesomeIcon icon={ICON_DELETE}/>
								</ChartButton>
								: null}
						</ChartButtons>
						: null}
				</ChartDragHandle>
		}
	</ChartContainer>;
};