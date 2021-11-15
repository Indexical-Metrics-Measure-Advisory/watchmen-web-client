import {TuplePage} from '@/services/data/query/tuple-page';
import {ChartType, PredefinedChartColorSeries} from '@/services/data/tuples/chart-types';
import {QueryReport} from '@/services/data/tuples/query-report-types';
import {listReports} from '@/services/data/tuples/report';
import {Report} from '@/services/data/tuples/report-types';
import {QueryTuple} from '@/services/data/tuples/tuple-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {getCurrentTime} from '@/services/data/utils';
import {TUPLE_SEARCH_PAGE_SIZE} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {TupleWorkbench} from '@/widgets/tuple-workbench';
import {TupleEventBusProvider, useTupleEventBus} from '@/widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes} from '@/widgets/tuple-workbench/tuple-event-bus-types';
import React, {useEffect} from 'react';
import ReportBackground from '../../assets/report-background.svg';
import {renderCard} from './card';
import {renderEditor} from './editor';

const createReport = (): Report => {
	return {
		reportId: generateUuid(),
		name: '',
		indicators: [],
		dimensions: [],
		rect: {x: 0, y: 0, width: 0, height: 0},
		chart: {type: ChartType.BAR, settings: {colorSeries: PredefinedChartColorSeries.REGULAR}},
		lastVisitTime: getCurrentTime(),
		createTime: getCurrentTime(),
		lastModified: getCurrentTime()
	};
};

const getKeyOfReport = (report: QueryReport) => report.reportId;

const AdminReports = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useTupleEventBus();
	useEffect(() => {
		const onDoCreateReport = () => {
			fire(TupleEventTypes.TUPLE_CREATED, createReport());
		};
		const onDoEditReport = async (queryReport: QueryReport) => {
			const {reportId, name, description} = queryReport;
			const report: Report = {
				...createReport(),
				reportId, name, description
			};
			fire(TupleEventTypes.TUPLE_LOADED, report);
		};
		const onDoSearchReport = async (searchText: string, pageNumber: number) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await listReports({search: searchText, pageNumber, pageSize: TUPLE_SEARCH_PAGE_SIZE}),
				(page: TuplePage<QueryTuple>) => fire(TupleEventTypes.TUPLE_SEARCHED, page, searchText));
		};
		on(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateReport);
		on(TupleEventTypes.DO_EDIT_TUPLE, onDoEditReport);
		on(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchReport);
		return () => {
			off(TupleEventTypes.DO_CREATE_TUPLE, onDoCreateReport);
			off(TupleEventTypes.DO_EDIT_TUPLE, onDoEditReport);
			off(TupleEventTypes.DO_SEARCH_TUPLE, onDoSearchReport);
		};
	}, [on, off, fire, fireGlobal]);

	return <TupleWorkbench title="Reports"
	                       canCreate={true}
	                       searchPlaceholder="Search by report name, topic name, description, etc."
	                       tupleLabel="Report" tupleImage={ReportBackground} canEdit={false} renderEditor={renderEditor}
	                       renderCard={renderCard} getKeyOfTuple={getKeyOfReport}
	/>;
};
const AdminReportsIndex = () => {
	return <TupleEventBusProvider>
		<AdminReports/>
	</TupleEventBusProvider>;
};

export default AdminReportsIndex;