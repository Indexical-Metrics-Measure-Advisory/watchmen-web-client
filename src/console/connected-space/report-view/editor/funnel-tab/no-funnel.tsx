import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {useFunnelAddedOrRemoved} from './use-funnel-added-or-removed';
import {ReportNoFunnel} from './widgets';

export const NoFunnel = (props: { report: Report }) => {
	const {report} = props;

	useFunnelAddedOrRemoved(report);

	if ((report.funnels || []).some(funnel => funnel.enabled)) {
		return null;
	}

	return <ReportNoFunnel>{Lang.CONSOLE.CONNECTED_SPACE.REPORT_NO_FUNNEL}</ReportNoFunnel>;
};