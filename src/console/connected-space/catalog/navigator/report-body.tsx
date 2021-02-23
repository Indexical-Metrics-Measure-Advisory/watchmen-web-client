import React from 'react';
import { Report } from '../../../../services/tuples/report-types';
import { ReportBodyContainer, ReportTypeLabel } from './report-widgets';

export const ReportBody = (props: { report: Report }) => {
	const { report } = props;

	return <ReportBodyContainer>
		<ReportTypeLabel>{report.chart.type}</ReportTypeLabel>
	</ReportBodyContainer>;
};