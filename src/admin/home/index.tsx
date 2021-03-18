import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ConsoleEventBusProvider } from '../../console/console-event-bus';
import { DashboardBody } from '../../console/dashboard/body';
import { DashboardEventBusProvider } from '../../console/dashboard/dashboard-event-bus';
import { Router } from '../../routes/types';
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
	const history = useHistory();
	const [ state, setState ] = useState<HomeState>({ initialized: false });
	useEffect(() => {
		(async () => {
			try {
				const { dashboard, reports } = await fetchAdminDashboard();
				if (dashboard == null) {
					history.push(Router.ADMIN_TOPICS);
				} else {
					setState({ initialized: true, dashboard, reports });
				}
			} catch (e) {
				console.error(e);
				history.push(Router.ADMIN_TOPICS);
			}
		})();
	}, [ history ]);

	if (!state.initialized) {
		return <AdminLoading label="Loading..."/>;
	}

	return <ConsoleEventBusProvider>
		<SimulateConsole reports={state.reports!}/>
		<AdminDashboard dashboard={state.dashboard!}/>
	</ConsoleEventBusProvider>;
};

export default AdminHomeIndex;