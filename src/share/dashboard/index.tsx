import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardBody } from '../../console/dashboard/body';
import { DashboardEventBusProvider } from '../../console/dashboard/dashboard-event-bus';
import { Lang } from '../../langs';
import { fetchSharedDashboard } from '../../services/share/dashboard';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { Report } from '../../services/tuples/report-types';
import { ShareNothing } from '../share-nothing';

interface ShareDashboardState {
	initialized: boolean;
	dashboard?: Dashboard;
	reports?: Array<Report>;
}

const ShareDashboard = (props: { dashboard: Dashboard, reports: Array<Report> }) => {
	const { dashboard } = props;

	return <DashboardEventBusProvider>
		<DashboardBody dashboard={dashboard}/>
	</DashboardEventBusProvider>;
};

const ShareDashboardIndex = () => {
	const { dashboardId } = useParams<{ dashboardId: string }>();

	const [ state, setState ] = useState<ShareDashboardState>({ initialized: false });
	useEffect(() => {
		(async () => {
			try {
				const { dashboard, reports } = await fetchSharedDashboard(dashboardId);
				setState({ initialized: true, dashboard, reports });
			} catch (e) {
				console.error(e);
				setState({ initialized: true });
			}
		})();
	}, [ dashboardId ]);

	if (!state.initialized) {
		return <ShareNothing label={Lang.CONSOLE.LOADING}/>;
	}

	if (state.initialized && state.dashboard == null) {
		return <ShareNothing label={Lang.CONSOLE.ERROR.DASHBOARD_NOT_FOUND}/>;
	}

	return <ShareDashboard dashboard={state.dashboard!} reports={state.reports!}/>;
};

export default ShareDashboardIndex;