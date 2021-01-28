import { MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_CONNECTED_SPACE, ICON_DASHBOARD } from '../../basic-widgets/constants';
import { isConnectedSpaceOpened, isDashboardOpened, toConnectedSpace, toDashboard } from '../../routes/utils';
import { saveFavorite } from '../../services/console/favorite';
import { ConsoleSettings } from '../../services/console/settings-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes, FavoriteState } from '../console-event-bus-types';
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
	const { once, on, off, fire } = useConsoleEventBus();
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
		const onDashboardRemovedFromFavorite = (dashboardId: string) => {
			// when event was fired by myself, dashboard already removed
			// eslint-disable-next-line
			const exists = data.dashboardIds.some(id => id == dashboardId);
			if (exists) {
				setData(data => {
					// eslint-disable-next-line
					return { ...data, dashboardIds: data.dashboardIds.filter(id => id != dashboardId) };
				});
			}
		};
		const onConnectedSpaceRemovedFromFavorite = (connectedSpaceId: string) => {
			// when event was fired by myself, connected space already removed
			// eslint-disable-next-line
			const exists = data.connectedSpaceIds.some(id => id == connectedSpaceId);
			if (exists) {
				setData(data => {
					return {
						...data,
						// eslint-disable-next-line
						connectedSpaceIds: data.connectedSpaceIds.filter(id => id != connectedSpaceId)
					};
				});
			}
		};
		on(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
		on(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.SETTINGS_LOADED, onSettingsLoaded);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		};
	}, [ on, off, data.dashboardIds, data.connectedSpaceIds ]);

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
	const onItemRemoveClicked = (id: string, type: 'dashboard' | 'connected-space') => (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		let dashboardIds = data.dashboardIds;
		let connectedSpaceIds = data.connectedSpaceIds;
		if (type === 'dashboard') {
			// eslint-disable-next-line
			dashboardIds = dashboardIds.filter(dashboardId => dashboardId != id);
			setData({ ...data, dashboardIds });
			fire(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, id);
		} else if (type === 'connected-space') {
			// eslint-disable-next-line
			connectedSpaceIds = connectedSpaceIds.filter(connectedSpaceId => connectedSpaceId != id);
			setData({ ...data, connectedSpaceIds });
			fire(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, id);
		}
		once(ConsoleEventTypes.REPLY_FAVORITE_STATE, async (state: FavoriteState) => {
			await saveFavorite({
				pin: state === FavoriteState.PIN,
				connectedSpaceIds: connectedSpaceIds || [],
				dashboardIds: dashboardIds || []
			});
		}).fire(ConsoleEventTypes.ASK_FAVORITE_STATE);
	};

	console.log(data.dashboardIds, data.connectedSpaceIds);
	const items = buildFavoriteItems(data);

	return { items, onItemClicked, onItemRemoveClicked, data };
};