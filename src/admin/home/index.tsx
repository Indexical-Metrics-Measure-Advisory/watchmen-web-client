import {ConsoleEventBusProvider} from '@/console/console-event-bus';
import {DashboardBody} from '@/console/dashboard/body';
import {DashboardEventBusProvider} from '@/console/dashboard/dashboard-event-bus';
import {fetchAdminDashboard} from '@/services/data/admin/home';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import React, {useEffect, useState} from 'react';
import {AdminLoading} from './admin-loading';
import {SimulateConsole} from './simulate-console';
import {AdminDashboardContainer} from './widgets';

interface HomeState {
	initialized: boolean;
	dashboard?: Dashboard;
	connectedSpaces?: Array<ConnectedSpace>;
}

const AdminDashboard = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	return <DashboardEventBusProvider>
		<AdminDashboardContainer>
			<DashboardBody dashboard={dashboard} removable={false} transient={true}/>
		</AdminDashboardContainer>
	</DashboardEventBusProvider>;
};

const AdminHomeIndex = () => {
	const [state, setState] = useState<HomeState>({initialized: false});
	useEffect(() => {
		(async () => {
			try {
				const {dashboard, connectedSpaces} = await fetchAdminDashboard();
				setState({initialized: true, dashboard, connectedSpaces});
			} catch (e: any) {
				console.error(e);
				setState({initialized: true});
			}
		})();
	}, []);

	if (!state.initialized) {
		return <AdminLoading label="Loading..."/>;
	}

	if (state.initialized && (state.dashboard == null || state.connectedSpaces == null || state.connectedSpaces.length === 0)) {
		return <AdminLoading label="No dashboard defined, pick a dashboard from your spaces first."/>;
	}

	return <ConsoleEventBusProvider>
		<SimulateConsole connectedSpaces={state.connectedSpaces!}/>
		<AdminDashboard dashboard={state.dashboard!}/>
	</ConsoleEventBusProvider>;
};

export default AdminHomeIndex;