import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { ReportEventBusProvider } from '../../../../report/report-event-bus';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';
import { ReportEditor } from './editor';
import { NoReport } from './no-report';
import { SubjectReport } from './report';
import { ReportRemover } from './report-remover';
import { SubjectReportContainer } from './widgets';

export const SubjectReports = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const { on, off } = useSubjectEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(SubjectEventTypes.REPORT_ADDED, forceUpdate);
		on(SubjectEventTypes.REPORT_REMOVED, forceUpdate);
		return () => {
			off(SubjectEventTypes.REPORT_ADDED, forceUpdate);
			off(SubjectEventTypes.REPORT_REMOVED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	const hasReport = subject.reports && subject.reports.length !== 0;

	return <ReportEventBusProvider>
		<SubjectReportContainer>
			{hasReport
				? subject.reports?.map(report => {
					return <SubjectReport connectedSpace={connectedSpace} subject={subject} report={report}
					                      key={report.reportId}/>;
				})
				: <NoReport/>}
		</SubjectReportContainer>
		<ReportEditor connectedSpace={connectedSpace} subject={subject}/>
		<ReportRemover connectedSpace={connectedSpace} subject={subject}/>
	</ReportEventBusProvider>;
};