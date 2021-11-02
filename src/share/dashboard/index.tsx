import NoDataImage from '@/assets/dashboard-no-data.svg';
import {ConsoleEventBusProvider} from '@/console/console-event-bus';
import {DashboardBody} from '@/console/dashboard/body';
import {DashboardEventBusProvider} from '@/console/dashboard/dashboard-event-bus';
import {fetchSharedDashboard} from '@/services/data/share/dashboard';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard, DashboardId} from '@/services/data/tuples/dashboard-types';
import {Token} from '@/services/data/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {ShareNothing} from '../share-nothing';
import {SimulateConsole} from './simulate-console';
import {NoData, ShareDashboardContainer} from './widgets';

interface ShareDashboardState {
	initialized: boolean;
	dashboardId?: DashboardId;
	dashboard?: Dashboard;
	connectedSpaces?: Array<ConnectedSpace>;
}

const ShareDashboard = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	return <DashboardEventBusProvider>
		<ShareDashboardContainer>
			<DashboardBody dashboard={dashboard} removable={false} transient={true}/>
		</ShareDashboardContainer>
	</DashboardEventBusProvider>;
};

const ShareDashboardIndex = () => {
	const {dashboardId, token} = useParams<{ dashboardId: DashboardId, token: Token }>();
	const [state, setState] = useState<ShareDashboardState>({initialized: false});
	useEffect(() => {
		(async () => {
			try {
				const {dashboard, connectedSpaces} = await fetchSharedDashboard(dashboardId, token);
				setState({initialized: true, dashboardId, dashboard, connectedSpaces});
			} catch (e: any) {
				console.error(e);
				setState({initialized: true, dashboardId});
			}
		})();
	}, [dashboardId, token]);

	// eslint-disable-next-line
	if (!state.initialized || (state.initialized && state.dashboardId != dashboardId)) {
		return <ShareNothing label={Lang.CONSOLE.LOADING}/>;
	}

	if (state.initialized && (state.dashboard == null || state.connectedSpaces == null || state.connectedSpaces.length === 0)) {
		return <ShareNothing label={Lang.CONSOLE.ERROR.DASHBOARD_NOT_FOUND} spin={false}>
			<NoData background={NoDataImage}/>
		</ShareNothing>;
	}

	return <ConsoleEventBusProvider>
		<SimulateConsole connectedSpaces={state.connectedSpaces!}/>
		<ShareDashboard dashboard={state.dashboard!}/>
	</ConsoleEventBusProvider>;
};

export default ShareDashboardIndex;