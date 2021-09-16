import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {Subject} from '@/services/tuples/subject-types';
import {Report} from '@/services/tuples/report-types';
import {ReportDataSetEventBusProvider} from '../dataset-tab/report-dataset-event-bus';
import React from 'react';
import {ReportFilterContainer} from './widgets';
import {NoFilter} from './no-filter';
import {Filters} from './filters';

export const FilterTab = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report, active: boolean }) => {
	const {connectedSpace, subject, report, active} = props;

	if (!active) {
		return null;
	}

	return <ReportDataSetEventBusProvider>
		<ReportFilterContainer>
			<Filters connectedSpace={connectedSpace} subject={subject} report={report}/>
			<NoFilter report={report}/>
		</ReportFilterContainer>
	</ReportDataSetEventBusProvider>;
};