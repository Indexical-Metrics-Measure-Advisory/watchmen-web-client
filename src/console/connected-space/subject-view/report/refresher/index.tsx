import React, { useEffect } from 'react';
import { useReportEventBus } from '../../../../../report/report-event-bus';
import { ReportEventTypes } from '../../../../../report/report-event-bus-types';
import { Subject } from '../../../../../services/tuples/subject-types';
import { useSubjectEventBus } from '../../subject-event-bus';
import { SubjectEventTypes } from '../../subject-event-bus-types';

export const ReportRefresher = (props: { subject: Subject }) => {
	const { subject } = props;

	const { on, off } = useSubjectEventBus();
	const { fire: fireReport } = useReportEventBus();
	useEffect(() => {
		const refreshReports = (aSubject: Subject) => {
			// eslint-disable-next-line
			if (subject.subjectId != aSubject.subjectId) {
				return;
			}
			// refresh all reports
			(subject.reports || []).forEach(report => fireReport(ReportEventTypes.DO_REFRESH, report));
		};
		on(SubjectEventTypes.REFRESH_REPORTS, refreshReports);
		return () => {
			off(SubjectEventTypes.REFRESH_REPORTS, refreshReports);
		};
	}, [ on, off, fireReport, subject.subjectId, subject.reports ]);

	return <></>;
};