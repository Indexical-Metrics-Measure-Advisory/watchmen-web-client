import React from 'react';
import {ReportEventBusProvider} from '../../../report/report-event-bus';
import {ConnectedSpace} from '../../../services/tuples/connected-space-types';
import {Subject} from '../../../services/tuples/subject-types';
import {ReportWorkbench} from './report-workbench';
import {Report} from '../../../services/tuples/report-types';
import {ReportHeader} from './header';
import {ReportViewEventBusProvider} from './report-view-event-bus';
import {ReportRefresher} from './refresher';

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
			<ReportRefresher report={report}/>
		</ReportEventBusProvider>
	</ReportViewEventBusProvider>;
};