import {isConnectedSpaceOpened, isDashboardOpened, toConnectedSpace, toDashboard} from '@/routes/utils';
import {saveFavorite} from '@/services/data/console/favorite';
import {Favorite} from '@/services/data/console/favorite-types';
import {ConnectedSpace, ConnectedSpaceId} from '@/services/data/tuples/connected-space-types';
import {Dashboard, DashboardId} from '@/services/data/tuples/dashboard-types';
import {ICON_CONNECTED_SPACE, ICON_DASHBOARD} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {MouseEvent, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {RenderItem, StateData} from './types';

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
				return {id: dashboard.dashboardId, name: dashboard.name, icon: ICON_DASHBOARD, type: 'dashboard'};
			} else {
				return null;
			}
		}).filter(x => !!x) as Array<RenderItem>
	].sort((i1, i2) => i1.name.toLowerCase().localeCompare(i2.name.toLowerCase()));
};

export const useFavoriteState = () => {
	const history = useHistory();
	const {on, off, fire} = useConsoleEventBus();
	const [data, setData] = useState<StateData>({
		connectedSpaces: [],
		dashboards: [],
		connectedSpaceIds: [],
		dashboardIds: []
	});
	useEffect(() => {
		const onDashboardAddedIntoFavorite = (dashboardId: DashboardId) => {
			setData(data => {
				return {...data, dashboardIds: Array.from(new Set([...data.dashboardIds, dashboardId]))};
			});
		};
		const onDashboardRemovedFromFavorite = (dashboardId: DashboardId) => {
			setData(data => {
				// eslint-disable-next-line
				return {...data, dashboardIds: data.dashboardIds.filter(id => id != dashboardId)};
			});
		};

		on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
		on(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		};
	}, [on, off]);
	useEffect(() => {
		const onConnectedSpaceAddedIntoFavorite = (connectedSpaceId: ConnectedSpaceId) => {
			setData(data => {
				return {
					...data,
					connectedSpaceIds: Array.from(new Set([...data.connectedSpaceIds, connectedSpaceId]))
				};
			});
		};
		const onConnectedSpaceRemovedFromFavorite = (connectedSpaceId: ConnectedSpaceId) => {
			setData(data => {
				return {
					...data,
					// eslint-disable-next-line
					connectedSpaceIds: data.connectedSpaceIds.filter(id => id != connectedSpaceId)
				};
			});
		};

		on(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		};
	}, [on, off]);
	useEffect(() => {
		const onDashboardCreated = (dashboard: Dashboard) => {
			setData(data => {
				return {...data, dashboards: Array.from(new Set([...data.dashboards, dashboard]))};
			});
		};
		const onDashboardRemoved = (dashboard: Dashboard) => {
			setData(data => {
				return {...data, dashboards: data.dashboards.filter(exists => exists !== dashboard)};
			});
		};
		on(ConsoleEventTypes.DASHBOARD_CREATED, onDashboardCreated);
		on(ConsoleEventTypes.DASHBOARD_REMOVED, onDashboardRemoved);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_CREATED, onDashboardCreated);
			off(ConsoleEventTypes.DASHBOARD_REMOVED, onDashboardRemoved);
		};
	}, [on, off]);
	useEffect(() => {
		const onConnectedSpaceCreated = (connectedSpace: ConnectedSpace) => {
			setData(data => {
				return {...data, connectedSpaces: Array.from(new Set([...data.connectedSpaces, connectedSpace]))};
			});
		};
		const onConnectedSpaceRemoved = (connectedSpace: ConnectedSpace) => {
			setData(data => {
				return {
					...data,
					connectedSpaces: data.connectedSpaces.filter(exists => exists !== connectedSpace)
				};
			});
		};
		on(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		};
	}, [on, off]);
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_FAVORITE, ({dashboardIds, connectedSpaceIds}: Favorite) => {
			fire(ConsoleEventTypes.ASK_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
				fire(ConsoleEventTypes.ASK_DASHBOARDS, (dashboards: Array<Dashboard>) => {
					setData({connectedSpaces, dashboards, connectedSpaceIds, dashboardIds});
				});
			});
		});
	}, [fire]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onDashboardRenamed = (dashboard: Dashboard) => {
			// eslint-disable-next-line
			if (data.dashboardIds.some(dashboardId => dashboardId == dashboard.dashboardId)) {
				forceUpdate();
			}
		};
		const onConnectedSpaceRenamed = (connectedSpace: ConnectedSpace) => {
			// eslint-disable-next-line
			if (data.connectedSpaceIds.some(connectedSpaceId => connectedSpaceId == connectedSpace.connectId)) {
				forceUpdate();
			}
		};
		on(ConsoleEventTypes.DASHBOARD_RENAMED, onDashboardRenamed);
		on(ConsoleEventTypes.CONNECTED_SPACE_RENAMED, onConnectedSpaceRenamed);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_RENAMED, onDashboardRenamed);
			off(ConsoleEventTypes.CONNECTED_SPACE_RENAMED, onConnectedSpaceRenamed);
		};
	}, [on, off, data.dashboardIds, data.connectedSpaceIds, forceUpdate]);

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
		try {
			await saveFavorite({
				connectedSpaceIds: connectedSpaceIds || [],
				dashboardIds: dashboardIds || []
			});
		} catch (e: any) {
			// ignore
			console.info(e);
		}
	};

	const items = buildFavoriteItems(data);

	return {items, onItemClicked, onItemRemoveClicked, data};
};