import {ChartDataSet} from '@/services/data/tuples/chart-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {Grid} from '@/widgets/dataset-grid';
import {DEFAULT_COLUMN_WIDTH} from '@/widgets/dataset-grid/constants';
import {GridEventBusProvider, useGridEventBus} from '@/widgets/dataset-grid/grid-event-bus';
import {GridEventTypes} from '@/widgets/dataset-grid/grid-event-bus-types';
import {ColumnSortBy} from '@/widgets/dataset-grid/types';
import {Fragment, useEffect} from 'react';
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
	const {report} = props;

	const hasColumns = report.indicators.length > 0 || report.dimensions.length > 0;

	return <Grid hasColumns={hasColumns} pageable={false}/>;
};

export const ReportDataGrid = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report }) => {
	const {connectedSpace, subject, report} = props;

	return <GridEventBusProvider>
		<SubjectDataGridDelegate connectedSpace={connectedSpace} subject={subject} report={report}/>
		<SubjectDataGridController/>
	</GridEventBusProvider>;
};