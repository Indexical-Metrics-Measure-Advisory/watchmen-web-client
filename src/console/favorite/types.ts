import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_CONNECTED_SPACE, ICON_DASHBOARD} from '@/widgets/basic/constants';

export interface StateData {
	connectedSpaces: Array<ConnectedSpace>;
	dashboards: Array<Dashboard>;
	connectedSpaceIds: Array<string>;
	dashboardIds: Array<string>;
}

export interface RenderItem {
	id: string;
	name: string;
	icon: typeof ICON_CONNECTED_SPACE | typeof ICON_DASHBOARD;
	type: 'dashboard' | 'connected-space';
}
