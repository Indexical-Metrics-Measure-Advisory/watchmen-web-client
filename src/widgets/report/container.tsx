import {fetchChartData, fetchChartDataTemporary} from '@/services/data/console/report';
import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {Report, ReportId, ReportRect} from '@/services/data/tuples/report-types';
import {isReportDefValid} from '@/services/data/tuples/report-utils';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useRef, useState} from 'react';
import {ICON_DELETE, ICON_DRAG_HANDLE, ICON_LOADING} from '../basic/constants';
import {useForceUpdate} from '../basic/utils';
import {useEventBus} from '../events/event-bus';
import {EventTypes} from '../events/types';
import {Lang} from '../langs';
import {ChartHelper} from './chart-utils';
import {Diagram} from './diagram';
import {DiagramBroken, DiagramLoading} from './diagram/widgets';
import {useDragAndResize} from './drag-and-resize/use-drag-and-resize';
import {useReportEventBus} from './report-event-bus';
import {ReportEventTypes} from './report-event-bus-types';
import {DragType} from './types';
import {ChartButton, ChartButtons, ChartContainer, ChartDragHandle, ChartDragHandlePart} from './widgets';

enum DiagramLoadState {
	FALSE = 'false',
	TRUE = 'true',
	RELOAD = 'reload',

	DEF_BROKEN = 'def-broken'
}

interface DiagramState {
	reportId: ReportId;
	loadState: DiagramLoadState;
	dataset?: ChartDataSet;
}

const shouldLoadData = (state: DiagramLoadState): boolean => {
	return [DiagramLoadState.FALSE, DiagramLoadState.RELOAD, DiagramLoadState.DEF_BROKEN].includes(state);
};

export const Container = (props: {
	report: Report;
	fixed: boolean;
	editable: boolean;
	editing: boolean;
	removable: boolean;
	thumbnail: boolean;
}) => {
	const {report, fixed, editable, editing, removable, thumbnail} = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const dndRef = useRef<HTMLDivElement>(null);
	const {fire: fireGlobal} = useEventBus();
	const {fire, on, off} = useReportEventBus();
	const [diagramState, setDiagramState] = useState<DiagramState>({
		reportId: report.reportId,
		loadState: DiagramLoadState.FALSE
	});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		if (report.reportId !== diagramState.reportId) {
			// reset state and drop data when report switched
			setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.FALSE});
			return;
		}

		// deal with load state change
		if (shouldLoadData(diagramState.loadState)) {
			if (!isReportDefValid(report, ChartHelper[report.chart.type]?.getDef(), report.simulating)) {
				setDiagramState({
					reportId: report.reportId,
					loadState: DiagramLoadState.DEF_BROKEN,
					dataset: {data: []}
				});
			} else if (report.simulating) {
				window.setTimeout(() => {
					const dataset = {data: report.simulateData ?? []};
					fire(ReportEventTypes.DATA_LOADED, report, dataset);
					setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.TRUE, dataset});
					// delay 500 milliseconds
				}, 500);
			} else if (diagramState.loadState === DiagramLoadState.FALSE) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchChartData(report.reportId, report.chart.type),
					(dataset: ChartDataSet) => {
						fire(ReportEventTypes.DATA_LOADED, report, dataset);
						setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.TRUE, dataset});
					}, () => {
						const dataset = {data: []};
						fire(ReportEventTypes.DATA_LOADED, report, dataset);
						setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.TRUE, dataset});
					});
			} else if (diagramState.loadState === DiagramLoadState.RELOAD) {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await fetchChartDataTemporary(report),
					(dataset: ChartDataSet) => {
						fire(ReportEventTypes.DATA_LOADED, report, dataset);
						setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.TRUE, dataset});
					}, () => {
						const dataset = {data: []};
						fire(ReportEventTypes.DATA_LOADED, report, dataset);
						setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.TRUE, dataset});
					});
			}
		}

		const onDoReloadDataByClient = (editReport: Report) => {
			if (report !== editReport) {
				return;
			}
			setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.RELOAD});
		};
		const onDoReloadDataOnEditing = (editReport: Report) => {
			if (report !== editReport || !editing) {
				return;
			}
			setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.RELOAD});
		};
		const onDoRefresh = (refreshReport: Report) => {
			// eslint-disable-next-line
			if (refreshReport.reportId != report.reportId) {
				return;
			}
			// force reload data
			setDiagramState({reportId: report.reportId, loadState: DiagramLoadState.FALSE});
		};
		on(ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, onDoReloadDataByClient);
		on(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onDoReloadDataOnEditing);
		on(ReportEventTypes.DO_REFRESH, onDoRefresh);
		return () => {
			off(ReportEventTypes.DO_RELOAD_DATA_BY_CLIENT, onDoReloadDataByClient);
			off(ReportEventTypes.DO_RELOAD_DATA_ON_EDITING, onDoReloadDataOnEditing);
			off(ReportEventTypes.DO_REFRESH, onDoRefresh);
		};
	}, [fireGlobal, on, off, fire, forceUpdate, report, diagramState.reportId, diagramState.loadState, editing]);
	useEffect(() => {
		const onAskData = (aReport: Report, onLoaded: (dataset: ChartDataSet) => void) => {
			if (report !== aReport) {
				return;
			}

			if (diagramState.loadState === DiagramLoadState.TRUE) {
				onLoaded(diagramState.dataset!);
			} else {
				onLoaded({data: []});
			}
		};
		on(ReportEventTypes.ASK_DATA, onAskData);
		return () => {
			off(ReportEventTypes.ASK_DATA, onAskData);
		};
	}, [on, off, diagramState.dataset, diagramState.loadState, report]);

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
		{diagramState.loadState === DiagramLoadState.TRUE
			? <Diagram report={report} dataset={diagramState.dataset!} thumbnail={thumbnail}/>
			: (diagramState.loadState === DiagramLoadState.DEF_BROKEN
				? <DiagramBroken>
					{Lang.CHART.DEFINITION_BROKEN}
				</DiagramBroken>
				: <DiagramLoading>
					<FontAwesomeIcon icon={ICON_LOADING} spin={true}/>
				</DiagramLoading>)}
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