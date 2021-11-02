import {Dashboard, DashboardId} from '@/services/data/tuples/dashboard-types';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {HoldSettings} from './types';

export const useDashboard = (options: {
	setHoldSettings: Dispatch<SetStateAction<HoldSettings>>
}) => {
	const {setHoldSettings} = options;
	const {on, off, fire} = useConsoleEventBus();
	useEffect(() => {
		const onDashboardCreated = (dashboard: Dashboard) => {
			// refresh is unnecessary
			setHoldSettings(holdSettings => ({
				...holdSettings,
				dashboards: [...holdSettings.dashboards, dashboard]
			}));
		};
		const onDashboardRemoved = (dashboard: Dashboard) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				dashboards: holdSettings.dashboards.filter(exists => exists !== dashboard),
				favorite: {
					...holdSettings.favorite,
					// eslint-disable-next-line
					dashboardIds: holdSettings.favorite.dashboardIds.filter(id => id != dashboard.dashboardId)
				}
			}));
		};
		const onDashboardAddedIntoFavorite = (dashboardId: DashboardId) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				favorite: {
					...holdSettings.favorite,
					dashboardIds: Array.from(new Set<string>([...holdSettings.favorite.dashboardIds, dashboardId]))
				}
			}));
		};
		const onDashboardRemovedFromFavorite = (dashboardId: DashboardId) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				favorite: {
					...holdSettings.favorite,
					// eslint-disable-next-line
					dashboardIds: holdSettings.favorite.dashboardIds.filter(id => id != dashboardId)
				}
			}));
		};

		on(ConsoleEventTypes.DASHBOARD_CREATED, onDashboardCreated);
		on(ConsoleEventTypes.DASHBOARD_REMOVED, onDashboardRemoved);
		on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
		on(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_CREATED, onDashboardCreated);
			off(ConsoleEventTypes.DASHBOARD_REMOVED, onDashboardRemoved);
			off(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		};
	}, [on, off, fire, setHoldSettings]);
};
