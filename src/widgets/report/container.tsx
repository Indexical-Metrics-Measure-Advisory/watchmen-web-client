import {fetchChartData, fetchChartDataTemporary} from '@/services/data/console/report';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report, ReportRect} from '@/services/data/tuples/report-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {ICON_DELETE, ICON_DRAG_HANDLE, ICON_LOADING} from '../basic/constants';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
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
	const {fire: fireGlobal} = useEventBus();
	const {fire, on, off} = useReportEventBus();
	const [diagramState, setDiagramState] = useState<DiagramState>({loaded: DiagramLoadState.FALSE});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (report.simulating) {
			setTimeout(() => {
				const dataset = {data: report.simulateData ?? []};
				fire(ReportEventTypes.DATA_LOADED, report, dataset);
				setDiagramState({loaded: DiagramLoadState.TRUE, dataset});
			}, 200);
		} else {
			if (diagramState.loaded === DiagramLoadState.FALSE) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchChartData(report.reportId, report.chart.type),
					(dataset: ChartDataSet) => {
						fire(ReportEventTypes.DATA_LOADED, report, dataset);
						setDiagramState({loaded: DiagramLoadState.TRUE, dataset});
					});
			} else if (diagramState.loaded === DiagramLoadState.RELOAD) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchChartDataTemporary(report),
					(dataset: ChartDataSet) => {
						fire(ReportEventTypes.DATA_LOADED, report, dataset);
						setDiagramState({loaded: DiagramLoadState.TRUE, dataset});
					});
			}
		}
		const onDoReloadDataByClient = (editReport: Report) => {
			if (report !== editReport) {
				return;
			}
			setDiagramState({loaded: DiagramLoadState.RELOAD});
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
		on(ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, onDoReloadDataByClient);
		on(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onDoReloadDataOnEditing);
		on(ReportEventTypes.DO_REFRESH, onDoRefresh);
		return () => {
			off(ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, onDoReloadDataByClient);
			off(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onDoReloadDataOnEditing);
			off(ReportEventTypes.DO_REFRESH, onDoRefresh);
		};
	}, [fireGlobal, on, off, fire, forceUpdate, report, diagramState.loaded, editing]);
	useEffect(() => {
		if (diagramState.loaded === DiagramLoadState.TRUE) {
			fire(ReportEventTypes.REPAINTED, report);
		}
	}, [fire, report, diagramState.loaded]);

	const writeToRect = (rect: ReportRect) => report.rect = rect;
	const onDrop = () => fire(ReportEventTypes.REPORT_MOVE_OR_RESIZE_COMPLETED, report);
	const {onMouseUp, onMouseLeave, onMouseDown, onMouseMove, dragState} = useDragAndResize({
		containerRef,
		dndRef,
		writeToRect,
		onDrop
	});

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