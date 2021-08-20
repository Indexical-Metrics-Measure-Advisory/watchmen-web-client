import {GridEventBusProvider, useGridEventBus} from '../../../../../dataset-grid/grid-event-bus';
import {Subject} from '../../../../../services/tuples/subject-types';
import {ConnectedSpace} from '../../../../../services/tuples/connected-space-types';
import {Report} from '../../../../../services/tuples/report-types';
import {Grid} from '../../../../../dataset-grid';
import {useEffect} from 'react';
import {ReportDataSetEventTypes} from './report-dataset-event-bus-types';
import {useReportDataSetEventBus} from './report-dataset-event-bus';
import {GridEventTypes} from '../../../../../dataset-grid/grid-event-bus-types';
import {ChartDataSet} from '../../../../../services/tuples/chart-types';
import {ColumnSortBy} from '../../../../../dataset-grid/types';
import {DEFAULT_COLUMN_WIDTH} from '../../../../../dataset-grid/constants';

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

	return <></>;
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