import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ConsoleEventBusProvider } from '../../console/console-event-bus';
import { DashboardBody } from '../../console/dashboard/body';
import { DashboardEventBusProvider } from '../../console/dashboard/dashboard-event-bus';
import { Lang } from '../../langs';
import { fetchSharedDashboard } from '../../services/share/dashboard';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { Report } from '../../services/tuples/report-types';
import { ShareNothing } from '../share-nothing';
import { SimulateConsole } from './simulate-console';
import { ShareDashboardContainer } from './widgets';

interface ShareDashboardState {
	initialized: boolean;
	dashboardId?: string;
	dashboard?: Dashboard;
	reports?: Array<Report>;
}

const ShareDashboard = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	return <DashboardEventBusProvider>
		<ShareDashboardContainer>
			<DashboardBody dashboard={dashboard} removable={false} transient={true}/>
		</ShareDashboardContainer>
	</DashboardEventBusProvider>;
};

const ShareDashboardIndex = () => {
	const { dashboardId, token } = useParams<{ dashboardId: string, token: string }>();
	const [ state, setState ] = useState<ShareDashboardState>({ initialized: false });
	useEffect(() => {
		(async () => {
			try {
				const { dashboard, reports } = await fetchSharedDashboard(dashboardId, token);
				setState({ initialized: true, dashboardId, dashboard, reports });
			} catch (e) {
				console.error(e);
				setState({ initialized: true, dashboardId });
			}
		})();
	}, [ dashboardId, token ]);

	// eslint-disable-next-line
	if (!state.initialized || (state.initialized && state.dashboardId != dashboardId)) {
		return <ShareNothing label={Lang.CONSOLE.LOADING}/>;
	}

	if (state.initialized && state.dashboard == null) {
		return <ShareNothing label={Lang.CONSOLE.ERROR.DASHBOARD_NOT_FOUND}/>;
	}

	return <ConsoleEventBusProvider>
		<SimulateConsole reports={state.reports!}/>
		<ShareDashboard dashboard={state.dashboard!}/>
	</ConsoleEventBusProvider>;
};

export default ShareDashboardIndex;