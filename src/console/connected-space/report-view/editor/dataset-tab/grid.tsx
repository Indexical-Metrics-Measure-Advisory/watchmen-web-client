import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Grid} from '@/widgets/dataset-grid';
import {DEFAULT_COLUMN_WIDTH} from '@/widgets/dataset-grid/constants';
import {GridEventBusProvider, useGridEventBus} from '@/widgets/dataset-grid/grid-event-bus';
import {GridEventTypes} from '@/widgets/dataset-grid/grid-event-bus-types';
import {ColumnSortBy, DataPage} from '@/widgets/dataset-grid/types';
import {Fragment, useEffect} from 'react';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useReportDataSetEventBus} from './report-dataset-event-bus';
import {ReportDataSetEventTypes} from './report-dataset-event-bus-types';

const SubjectDataGridController = () => {
	const {fire: fireGrid} = useGridEventBus();
	const {on, off} = useReportDataSetEventBus();
	useEffect(() => {
		const onDataLoaded = (report: Report, dataset: ChartDataSet) => {
			const data = dataset.data || [];
			fireGrid(GridEventTypes.DATA_LOADED, {
					data,
					itemCount: data.length,
					pageNumber: 1,
					pageSize: data.length,
					pageCount: 1

				}, {
					fixed: [],
					data: [
						...(report.indicators || []).map(indicator => {
							return {
								name: indicator.name,
								sort: ColumnSortBy.NONE,
								fixed: false,
								width: DEFAULT_COLUMN_WIDTH
							};
						}), ...(report.dimensions || []).map(dimension => {
							return {
								name: dimension.name,
								sort: ColumnSortBy.NONE,
								fixed: false,
								width: DEFAULT_COLUMN_WIDTH
							};
						})].map((column, columnIndex) => {
						return {...column, name: column.name || `Column ${columnIndex + 1}`, index: columnIndex};
					})
				}
			);
		};

		on(ReportDataSetEventTypes.DATA_LOADED, onDataLoaded);
		return () => {
			off(ReportDataSetEventTypes.DATA_LOADED, onDataLoaded);
		};
	}, [on, off, fireGrid]);

	return <Fragment/>;
};

const SubjectDataGridDelegate = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, report} = props;

	const {fire: fireReport} = useReportEditEventBus();
	const {on, off} = useGridEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onSimulatorSwitched = (on: boolean) => {
			report.simulating = on;
			forceUpdate();
			// fire event to editor
			fireReport(ReportEditEventTypes.SIMULATOR_SWITCHED, report, on);
		};
		const onSimulateDataUploaded = (page: DataPage) => {
			report.simulateData = page.data;
			// fire event to editor
			fireReport(ReportEditEventTypes.SIMULATE_DATA_UPLOADED, report, report.simulateData);
		};
		on(GridEventTypes.SIMULATOR_SWITCHED, onSimulatorSwitched);
		on(GridEventTypes.SIMULATE_DATA_UPLOADED, onSimulateDataUploaded);
		return () => {
			off(GridEventTypes.SIMULATOR_SWITCHED, onSimulatorSwitched);
			off(GridEventTypes.SIMULATE_DATA_UPLOADED, onSimulateDataUploaded);
		};
	}, [forceUpdate, fireReport, on, off, report]);

	const hasColumns = report.indicators.length > 0 || report.dimensions.length > 0;

	return <Grid hasColumns={hasColumns} simulateEnabled={connectedSpace.isTemplate} simulating={report.simulating}
	             pageable={false}/>;
};

export const ReportDataGrid = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	return <GridEventBusProvider>
		<SubjectDataGridDelegate connectedSpace={connectedSpace} subject={subject} report={report}/>
		<SubjectDataGridController/>
	</GridEventBusProvider>;
};