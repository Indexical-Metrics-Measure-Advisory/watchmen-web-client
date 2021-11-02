import {saveFavorite} from '@/services/data/console/favorite';
import {Favorite} from '@/services/data/console/favorite-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_FAVORITE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';

const FavoriteIcon = styled(FontAwesomeIcon).attrs<{ 'data-favorite': boolean }>(({'data-favorite': favorite}) => {
	return {
		style: {color: favorite ? 'var(--warn-color)' : (void 0)}
	};
})`
	transition : color 300ms ease-in-out;
`;

export const HeaderFavoriteButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useConsoleEventBus();
	const [favorite, setFavorite] = useState(false);
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_FAVORITE, ({dashboardIds}: Favorite) => {
			// eslint-disable-next-line
			const found = dashboardIds.find(dashboardId => dashboardId == dashboard.dashboardId);
			if (found) {
				setFavorite(true);
			} else if (!found) {
				setFavorite(false);
			}
		});
	}, [fire, dashboard]);
	useEffect(() => {
		const onDashboardAddedIntoFavorite = (addedDashboardId: string) => {
			// eslint-disable-next-line
			if (addedDashboardId == dashboard.dashboardId) {
				setFavorite(true);
			}
		};
		const onDashboardRemovedFromFavorite = (removedDashboardId: string) => {
			// eslint-disable-next-line
			if (removedDashboardId == dashboard.dashboardId) {
				setFavorite(false);
			}
		};

		on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
		on(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		};
	}, [on, off, dashboard]);

	const onAddIntoFavoriteClicked = () => {
		fire(ConsoleEventTypes.ASK_FAVORITE, (favorite: Favorite) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveFavorite({
					...favorite,
					dashboardIds: Array.from(new Set([...favorite.dashboardIds, dashboard.dashboardId]))
				}),
				() => fire(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, dashboard.dashboardId));
		});
	};
	const onRemoveFromFavoriteClicked = () => {
		fire(ConsoleEventTypes.ASK_FAVORITE, (favorite: Favorite) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveFavorite({
					...favorite,
					// eslint-disable-next-line
					dashboardIds: favorite.dashboardIds.filter(dashboardId => dashboardId != dashboard.dashboardId)
				}),
				() => fire(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboard.dashboardId));
		});
	};

	return <PageHeaderButton
		tooltip={favorite ? Lang.CONSOLE.DASHBOARD.REMOVE_FROM_FAVORITE : Lang.CONSOLE.DASHBOARD.ADD_INTO_FAVORITE}
		onClick={favorite ? onRemoveFromFavoriteClicked : onAddIntoFavoriteClicked}>
		<FavoriteIcon icon={ICON_FAVORITE} data-favorite={favorite}/>
	</PageHeaderButton>;
};