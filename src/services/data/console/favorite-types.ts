import {ConnectedSpaceId} from '../tuples/connected-space-types';
import {DashboardId} from '../tuples/dashboard-types';

export interface Favorite {
	connectedSpaceIds: Array<ConnectedSpaceId>;
	dashboardIds: Array<DashboardId>;
}