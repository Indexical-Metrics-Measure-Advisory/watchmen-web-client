import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { ConnectedSpace } from '../../../../services/tuples/connected-space-types';
import { Subject } from '../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../subject-event-bus';
import { SubjectEventTypes } from '../subject-event-bus-types';
import { NoReport } from './no-report';
import { SubjectReport } from './report';
import { SubjectReportContainer } from './widgets';

export const SubjectReports = (props: { connectedSpace: ConnectedSpace, subject: Subject }) => {
	const { connectedSpace, subject } = props;

	const { on, off } = useSubjectEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(SubjectEventTypes.REPORT_ADDED, forceUpdate);
		return () => {
			off(SubjectEventTypes.REPORT_ADDED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	const hasReport = subject.reports && subject.reports.length !== 0;

	return <SubjectReportContainer>
		{hasReport
			? subject.reports?.map(report => {
				return <SubjectReport connectedSpace={connectedSpace} subject={subject} report={report}
				                      key={report.reportId}/>;
			})
			: <NoReport/>}
	</SubjectReportContainer>;
};