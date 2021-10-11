import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Report} from '@/services/data/tuples/report-types';
import {Subject} from '@/services/data/tuples/subject-types';
import {ReportEventBusProvider} from '@/widgets/report/report-event-bus';
import React from 'react';
import {ReportHeader} from './header';
import {ReportPartController} from './part-controller';
import {ReportViewEventBusProvider} from './report-view-event-bus';
import {ReportWorkbench} from './report-workbench';

export const ReportView = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	report: Report;
	editable?: boolean;
}) => {
	const {connectedSpace, subject, report, editable = true} = props;

	return <ReportViewEventBusProvider>
		<ReportEventBusProvider>
			<ReportHeader connectedSpace={connectedSpace} subject={subject} report={report}/>
			<ReportWorkbench connectedSpace={connectedSpace} subject={subject} report={report} editable={editable}/>
			{/*<ReportRefresher report={report}/>*/}
			<ReportPartController report={report}/>
		</ReportEventBusProvider>
	</ReportViewEventBusProvider>;
};