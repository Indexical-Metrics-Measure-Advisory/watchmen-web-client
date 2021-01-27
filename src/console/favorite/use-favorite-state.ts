import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_CONNECTED_SPACE, ICON_DASHBOARD } from '../../basic-widgets/constants';
import { isConnectedSpaceOpened, isDashboardOpened, toConnectedSpace, toDashboard } from '../../routes/utils';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { RenderItem, StateData } from './types';

const buildFavoriteItems = (data: StateData) => {
	return [
		...data.connectedSpaceIds.map(connectedSpaceId => {
			// eslint-disable-next-line
			const connectedSpace = data.connectedSpaces.find(space => space.connectId == connectedSpaceId);
			if (connectedSpace) {
				return {
					id: connectedSpace.connectId,
					name: connectedSpace.name,
					icon: ICON_CONNECTED_SPACE,
					type: 'connected-space'
				};
			} else {
				return null;
			}
		}).filter(x => !!x) as Array<RenderItem>,
		...data.dashboardIds.map(dashboardId => {
			// eslint-disable-next-line
			const dashboard = data.dashboards.find(dashboard => dashboard.dashboardId == dashboardId);
			if (dashboard) {
				return { id: dashboard.dashboardId, name: dashboard.name, icon: ICON_DASHBOARD, type: 'dashboard' };
			} else {
				return null;
			}
		}).filter(x => !!x) as Array<RenderItem>
	].sort((i1, i2) => i1.name.toLowerCase().localeCompare(i2.name.toLowerCase()));
};

export const useFavoriteState = () => {
	const history = useHistory();
	const { on, off, fire } = useConsoleEventBus();
	const [ data, setData ] = useState<StateData>({
		connectedSpaces: [],
		dashboards: [],
		connectedSpaceIds: [],
		dashboardIds: []
	});
	useEffect(() => {
		const onSettingsLoaded = (({ connectedSpaces, dashboards, favorite }: ConsoleSettings) => {
			const { connectedSpaceIds, dashboardIds } = favorite;
			setData({ connectedSpaces, dashboards, connectedSpaceIds, dashboardIds });
		});
		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		};
	}, [ on, off ]);

	const onItemClicked = (id: string, type: 'dashboard' | 'connected-space') => () => {
		if (type === 'dashboard') {
			if (!isDashboardOpened(id)) {
				history.push(toDashboard(id));
			}
		} else if (type === 'connected-space') {
			if (!isConnectedSpaceOpened(id)) {
				history.push(toConnectedSpace(id));
			}
		}
		fire(ConsoleEventTypes.HIDE_FAVORITE);
	};

	const items = buildFavoriteItems(data);

	return { items, onItemClicked, data };
};