import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React, {Fragment, useEffect} from 'react';
import {DataLoading} from './data-loading';
import {ReportDataGrid} from './grid';
import {NoColumn} from './no-column';
import {ReportDataSetEventBusProvider, useReportDataSetEventBus} from './report-dataset-event-bus';
import {ReportDataSetEventTypes} from './report-dataset-event-bus-types';
import {ReportDataSetContainer} from './widgets';

const DataInitializer = (props: { report: Report }) => {
	const {report} = props;

	const {fire} = useReportDataSetEventBus();
	useEffect(() => {
		fire(ReportDataSetEventTypes.ASK_LOAD_DATA, report);
		// eslint-disable-next-line
	}, []);

	return <Fragment/>;
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