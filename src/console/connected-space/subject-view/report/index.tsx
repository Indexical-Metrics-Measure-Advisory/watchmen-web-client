import React from 'react';
import {ReportEventBusProvider} from '../../../../report/report-event-bus';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {Subject} from '../../../../services/tuples/subject-types';
import {ReportRemover} from './report-remover';
import {SubjectReportsSideBar, SubjectReportsWorkbench} from './widgets';
import {ReportsSelector} from './selector';

export const SubjectReports = (props: {
	connectedSpace: ConnectedSpace;
	subject: Subject;
	editable?: boolean;
	removable?: boolean;
}) => {
	const {connectedSpace, subject, editable = true, removable = true} = props;

	// const {on, off} = useSubjectEventBus();
	// const forceUpdate = useForceUpdate();
	// useEffect(() => {
	// 	on(SubjectEventTypes.REPORT_ADDED, forceUpdate);
	// 	on(SubjectEventTypes.REPORT_REMOVED, forceUpdate);
	// 	return () => {
	// 		off(SubjectEventTypes.REPORT_ADDED, forceUpdate);
	// 		off(SubjectEventTypes.REPORT_REMOVED, forceUpdate);
	// 	};
	// }, [on, off, forceUpdate]);

	return <ReportEventBusProvider>
		<SubjectReportsWorkbench>
			<SubjectReportsSideBar>
				<ReportsSelector subject={subject} editable={editable}/>
			</SubjectReportsSideBar>
		</SubjectReportsWorkbench>
		{/*<SubjectReportContainer>*/}
		{/*	{hasReport*/}
		{/*		? subject.reports?.map(report => {*/}
		{/*			return <SubjectReport connectedSpace={connectedSpace} subject={subject} report={report}*/}
		{/*			                      editable={editable} removable={removable}*/}
		{/*			                      key={report.reportId}/>;*/}
		{/*		})*/}
		{/*		: <NoReport/>}*/}
		{/*	<PagePrintSize subject={subject}/>*/}
		{/*	<ReportRefresher subject={subject}/>*/}
		{/*</SubjectReportContainer>*/}
		{/*{transient ? null : <ReportEditor connectedSpace={connectedSpace} subject={subject}/>}*/}
		{/*{transient ? null : <ReportMoveOrResizeMonitor/>}*/}
		<ReportRemover connectedSpace={connectedSpace} subject={subject}/>
	</ReportEventBusProvider>;
};