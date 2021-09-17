import {Report} from '@/services/data/tuples/report-types';
import React from 'react';
import {ReportBodyContainer, ReportTypeLabel} from './report-widgets';

export const ReportBody = (props: { report: Report }) => {
	const {report} = props;

	return <ReportBodyContainer>
		<ReportTypeLabel>{report.chart.type}</ReportTypeLabel>
	</ReportBodyContainer>;
};