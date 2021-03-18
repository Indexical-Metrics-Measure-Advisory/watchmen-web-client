import React, { useEffect, useState } from 'react';
import { ConsoleEventBusProvider } from '../../console/console-event-bus';
import { DashboardBody } from '../../console/dashboard/body';
import { DashboardEventBusProvider } from '../../console/dashboard/dashboard-event-bus';
import { fetchAdminDashboard } from '../../services/admin/home';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { Report } from '../../services/tuples/report-types';
import { AdminLoading } from './admin-loading';
import { SimulateConsole } from './simulate-console';
import { AdminDashboardContainer } from './widgets';

interface HomeState {
	initialized: boolean;
	dashboard?: Dashboard;
	reports?: Array<Report>;
}

const AdminDashboard = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	return <DashboardEventBusProvider>
		<AdminDashboardContainer>
			<DashboardBody dashboard={dashboard} removable={false}/>
		</AdminDashboardContainer>
	</DashboardEventBusProvider>;
};

const AdminHomeIndex = () => {
	const [ state, setState ] = useState<HomeState>({ initialized: false });
	useEffect(() => {
		(async () => {
			try {
				const { dashboard, reports } = await fetchAdminDashboard();
				setState({ initialized: true, dashboard, reports });
			} catch (e) {
				console.error(e);
				setState({ initialized: true });
			}
		})();
	}, []);

	if (!state.initialized) {
		return <AdminLoading label="Loading..."/>;
	}

	if (state.initialized && !state.dashboard) {
		return <AdminLoading label="No dashboard defined, pick a dashboard from your spaces first."/>;
	}

	return <ConsoleEventBusProvider>
		<SimulateConsole reports={state.reports!}/>
		<AdminDashboard dashboard={state.dashboard!}/>
	</ConsoleEventBusProvider>;
};

export default AdminHomeIndex;