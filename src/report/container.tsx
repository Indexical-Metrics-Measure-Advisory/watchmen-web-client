import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {ICON_DELETE, ICON_DRAG_HANDLE, ICON_LOADING, ICON_SETTINGS} from '../basic-widgets/constants';
import {useForceUpdate} from '../basic-widgets/utils';
import {fetchChartData, fetchChartDataTemporary} from '../services/console/report';
import {ChartDataSet} from '../services/tuples/chart-types';
import {Report, ReportRect} from '../services/tuples/report-types';
import {Diagram} from './diagram';
import {DiagramLoading} from './diagram/widgets';
import {useDragAndResize} from './drag-and-resize/use-drag-and-resize';
import {useReportEventBus} from './report-event-bus';
import {ReportEventTypes} from './report-event-bus-types';
import {DragType} from './types';
import {ChartButton, ChartButtons, ChartContainer, ChartDragHandle, ChartDragHandlePart} from './widgets';

enum DiagramLoadState {
	FALSE = 'false',
	TRUE = 'true',
	RELOAD = 'reload'
}

interface DiagramState {
	loaded: DiagramLoadState;
	dataset?: ChartDataSet;
}

export const Container = (props: {
	report: Report;
	fixed: boolean;
	editable: boolean;
	editing: boolean;
	removable: boolean;
}) => {
	const {report, fixed, editable, editing, removable} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const dndRef = useRef<HTMLDivElement>(null);
	const {fire, on, off} = useReportEventBus();
	const [diagramState, setDiagramState] = useState<DiagramState>({loaded: DiagramLoadState.FALSE});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (diagramState.loaded === DiagramLoadState.FALSE) {
			(async () => {
				const dataset = await fetchChartData(report.reportId, report.chart.type);
				setDiagramState({loaded: DiagramLoadState.TRUE, dataset});
			})();
		} else if (diagramState.loaded === DiagramLoadState.RELOAD) {
			(async () => {
				const dataset = await fetchChartDataTemporary(report);
				setDiagramState({loaded: DiagramLoadState.TRUE, dataset});
			})();
		}
		const onEditCompleted = (completedReport: Report, changed: boolean, shouldReloadData: boolean) => {
			if (report !== completedReport && !changed) {
				return;
			}
			if (shouldReloadData) {
				// state change will lead data reload, see codes above.
				setDiagramState({loaded: DiagramLoadState.FALSE});
			} else {
				forceUpdate();
			}
		};
		const onDoReloadDataOnEditing = (editReport: Report) => {
			if (report !== editReport || !editing) {
				return;
			}
			setDiagramState({loaded: DiagramLoadState.RELOAD});
		};
		const onDoRefresh = (refreshReport: Report) => {
			// eslint-disable-next-line
			if (refreshReport.reportId != report.reportId) {
				return;
			}
			// force reload data
			setDiagramState({loaded: DiagramLoadState.FALSE});
		};
		on(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
		on(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onDoReloadDataOnEditing);
		on(ReportEventTypes.DO_REFRESH, onDoRefresh);
		return () => {
			off(ReportEventTypes.EDIT_COMPLETED, onEditCompleted);
			off(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onDoReloadDataOnEditing);
			off(ReportEventTypes.DO_REFRESH, onDoRefresh);
		};
	}, [
		on, off, forceUpdate,
		report, diagramState.loaded, editing
	]);

	const writeToRect = (rect: ReportRect) => report.rect = rect;
	const onDrop = () => fire(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, report);
	const {onMouseUp, onMouseLeave, onMouseDown, onMouseMove, dragState} = useDragAndResize({
		containerRef,
		dndRef,
		writeToRect,
		onDrop
	});

	const onEditClicked = () => fire(ReportEventTypes.DO_EDIT, report);
	const onRemoveClicked = () => fire(ReportEventTypes.DO_DELETE_REPORT, report);

	return <ChartContainer rect={report.rect} fixed={fixed} ref={containerRef}>
		{diagramState.loaded === DiagramLoadState.TRUE
			? <Diagram report={report} dataset={diagramState.dataset!}/>
			: <DiagramLoading>
				<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
			</DiagramLoading>}
		{
			fixed
				? null
				: <ChartDragHandle onMouseDown={onMouseDown} onMouseUp={onMouseUp}
				                   onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}
				                   dragging={dragState.type !== DragType.NONE}>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_RIGHT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_TOP_RIGHT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM_LEFT}/>
					<ChartDragHandlePart data-position={DragType.RESIZE_BOTTOM_RIGHT}/>
					<ChartDragHandlePart data-part-type="dragging" data-position={dragState.type}/>
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