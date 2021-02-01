import { MouseEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_CONNECTED_SPACE, ICON_DASHBOARD } from '../../basic-widgets/constants';
import { isConnectedSpaceOpened, isDashboardOpened, toConnectedSpace, toDashboard } from '../../routes/utils';
import { saveFavorite } from '../../services/console/favorite';
import { Favorite } from '../../services/console/favorite-types';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { Dashboard } from '../../services/tuples/dashboard-types';
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
	const { once, on, off, fire } = useConsoleEventBus();
	const [ data, setData ] = useState<StateData>({
		connectedSpaces: [],
		dashboards: [],
		connectedSpaceIds: [],
		dashboardIds: []
	});
	useEffect(() => {
		const onDashboardAddedIntoFavorite = (dashboardId: string) => {
			// eslint-disable-next-line
			const exists = data.dashboardIds.some(id => id == dashboardId);
			if (!exists) {
				setData(data => {
					return { ...data, dashboardIds: Array.from(new Set([ ...data.dashboardIds, dashboardId ])) };
				});
			}
		};
		const onDashboardRemovedFromFavorite = (dashboardId: string) => {
			// eslint-disable-next-line
			const exists = data.dashboardIds.some(id => id == dashboardId);
			if (exists) {
				setData(data => {
					return {
						...data,
						// eslint-disable-next-line
						dashboardIds: data.dashboardIds.filter(id => id != dashboardId)
					};
				});
			}
		};

		on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
		on(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		return () => {
			on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		};
	}, [ on, off, data.dashboardIds ]);

	useEffect(() => {
		const onConnectedSpaceAddedIntoFavorite = (connectedSpaceId: string) => {
			setData(data => {
				return {
					...data,
					connectedSpaceIds: Array.from(new Set([ ...data.connectedSpaceIds, connectedSpaceId ]))
				};
			});
		};
		const onConnectedSpaceRemovedFromFavorite = (connectedSpaceId: string) => {
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

		on(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		return () => {
			on(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		};
	}, [ on, off, data.connectedSpaceIds ]);

	useEffect(() => {
		once(ConsoleEventTypes.REPLY_FAVORITE, ({ dashboardIds, connectedSpaceIds }: Favorite) => {
			once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
				once(ConsoleEventTypes.REPLY_DASHBOARDS, (dashboards: Array<Dashboard>) => {
					setData({ connectedSpaces, dashboards, connectedSpaceIds, dashboardIds });
				}).fire(ConsoleEventTypes.ASK_DASHBOARDS);
			}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	}, [ once ]);

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
	const onItemRemoveClicked = (id: string, type: 'dashboard' | 'connected-space') => async (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		let dashboardIds = data.dashboardIds;
		let connectedSpaceIds = data.connectedSpaceIds;
		if (type === 'dashboard') {
			// eslint-disable-next-line
			dashboardIds = dashboardIds.filter(dashboardId => id != dashboardId);
			fire(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, id);
		} else if (type === 'connected-space') {
			// eslint-disable-next-line
			connectedSpaceIds = connectedSpaceIds.filter(connectedSpaceId => id != connectedSpaceId);
			fire(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, id);
		}
		await saveFavorite({
			connectedSpaceIds: connectedSpaceIds || [],
			dashboardIds: dashboardIds || []
		});
	};

	const items = buildFavoriteItems(data);

	return { items, onItemClicked, onItemRemoveClicked, data };
};