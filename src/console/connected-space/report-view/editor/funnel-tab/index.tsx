import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import React from 'react';
import {ReportDataSetEventBusProvider} from '../dataset-tab/report-dataset-event-bus';
import {FunnelItems} from './funnel-items';
import {NoFunnel} from './no-funnel';
import {ReportFunnelContainer} from './widgets';

export const FunnelTab = (props: { connectedSpace: ConnectedSpace, subject: Subject, report: Report, active: boolean }) => {
	const {connectedSpace, subject, report, active} = props;

	if (!active) {
		return null;
	}

	return <ReportDataSetEventBusProvider>
		<ReportFunnelContainer>
			<FunnelItems connectedSpace={connectedSpace} subject={subject} report={report}/>
			<NoFunnel report={report}/>
		</ReportFunnelContainer>
	</ReportDataSetEventBusProvider>;
};