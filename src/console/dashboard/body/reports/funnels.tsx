import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {Report} from '@/services/data/tuples/report-types';
import React from 'react';
import {ReportsFunnels} from '../reports-funnels';

export const Funnels = (props: {
	connectedSpaces: Array<ConnectedSpace>;
	dashboard: Dashboard;
	reports: Array<Report>;
	transient: boolean;
}) => {
	const {connectedSpaces, dashboard, reports, transient} = props;

	return <ReportsFunnels connectedSpaces={connectedSpaces} dashboard={dashboard} reports={reports}
	                       transient={transient}/>;
};