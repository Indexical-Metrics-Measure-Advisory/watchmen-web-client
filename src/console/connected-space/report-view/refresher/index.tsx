import {Report} from '@/services/data/tuples/report-types';
import {useReportEventBus} from '@/widgets/report/report-event-bus';
import {ReportEventTypes} from '@/widgets/report/report-event-bus-types';
import React, {Fragment, useEffect} from 'react';
import {useReportViewEventBus} from '../report-view-event-bus';
import {ReportViewEventTypes} from '../report-view-event-bus-types';

/**
 * @deprecated never used now
 */
export const ReportRefresher = (props: { report: Report }) => {
	const {report} = props;

	const {on, off} = useReportViewEventBus();
	const {fire: fireReport} = useReportEventBus();
	useEffect(() => {
		const refreshReports = (aReport: Report) => {
			// eslint-disable-next-line
			if (aReport.reportId != report.reportId) {
				return;
			}
			// refresh all reports
			fireReport(ReportEventTypes.DO_REFRESH, report);
		};
		on(ReportViewEventTypes.REFRESH_REPORTS, refreshReports);
		return () => {
			off(ReportViewEventTypes.REFRESH_REPORTS, refreshReports);
		};
	}, [on, off, fireReport, report]);

	return <Fragment/>;
};