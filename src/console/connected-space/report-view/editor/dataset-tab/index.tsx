import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';
import {Report} from '@/services/tuples/report-types';
import {ReportDataSetEventBusProvider, useReportDataSetEventBus} from './report-dataset-event-bus';
import {ReportDataSetContainer} from './widgets';
import React, {useEffect} from 'react';
import {NoColumn} from './no-column';
import {DataLoading} from './data-loading';
import {ReportDataGrid} from './grid';
import {ReportDataSetEventTypes} from './report-dataset-event-bus-types';

const DataInitializer = (props: { report: Report }) => {
	const {report} = props;

	const {fire} = useReportDataSetEventBus();
	useEffect(() => {
		fire(ReportDataSetEventTypes.ASK_LOAD_DATA, report);
		// eslint-disable-next-line
	}, []);

	return <></>;
};
export const DataSetTab = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report, active: boolean }) => {
	const {connectedSpace, subject, report, active} = props;

	if (!active) {
		return null;
	}

	return <ReportDataSetEventBusProvider>
		<ReportDataSetContainer>
			<ReportDataGrid connectedSpace={connectedSpace} subject={subject} report={report}/>
			<NoColumn report={report}/>
			<DataLoading report={report}/>
			<DataInitializer report={report}/>
		</ReportDataSetContainer>
	</ReportDataSetEventBusProvider>;
};