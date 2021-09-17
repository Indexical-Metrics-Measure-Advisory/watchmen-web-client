import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {ReportDataSetEventBusProvider} from '../dataset-tab/report-dataset-event-bus';
import {Filters} from './filters';
import {NoFilter} from './no-filter';
import {ReportFilterContainer} from './widgets';

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