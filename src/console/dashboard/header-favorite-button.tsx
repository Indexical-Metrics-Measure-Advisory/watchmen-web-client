import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICON_FAVORITE } from '../../basic-widgets/constants';
import { PageHeaderButton } from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';
import { saveFavorite } from '../../services/console/favorite';
import { Favorite } from '../../services/console/favorite-types';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';

const FavoriteIcon = styled(FontAwesomeIcon).attrs<{ 'data-favorite': boolean }>(({ 'data-favorite': favorite }) => {
	return {
		style: { color: favorite ? 'var(--warn-color)' : (void 0) }
	};
})`
	transition : color 300ms ease-in-out;
`;

export const HeaderFavoriteButton = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;
	const { once, on, off, fire } = useConsoleEventBus();
	const [ favorite, setFavorite ] = useState(false);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_FAVORITE, ({ dashboardIds }: Favorite) => {
			// eslint-disable-next-line
			const found = dashboardIds.find(dashboardId => dashboardId == dashboard.dashboardId);
			if (found) {
				setFavorite(true);
			} else if (!found) {
				setFavorite(false);
			}
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	}, [ once, dashboard ]);
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
			on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		};
	}, [ on, off, dashboard ]);

	const onAddIntoFavoriteClicked = () => {
		once(ConsoleEventTypes.REPLY_FAVORITE, async (favorite: Favorite) => {
			await saveFavorite({
				...favorite,
				dashboardIds: Array.from(new Set([ ...favorite.dashboardIds, dashboard.dashboardId ]))
			});
			fire(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, dashboard.dashboardId);
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	};
	const onRemoveFromFavoriteClicked = () => {
		once(ConsoleEventTypes.REPLY_FAVORITE, async (favorite: Favorite) => {
			await saveFavorite({
				...favorite,
				// eslint-disable-next-line
				dashboardIds: favorite.dashboardIds.filter(dashboardId => dashboardId != dashboard.dashboardId)
			});
			fire(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboard.dashboardId);
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	};

	return <PageHeaderButton
		tooltip={favorite ? Lang.CONSOLE.DASHBOARD.REMOVE_FROM_FAVORITE : Lang.CONSOLE.DASHBOARD.ADD_INTO_FAVORITE}
		onClick={favorite ? onRemoveFromFavoriteClicked : onAddIntoFavoriteClicked}>
		<FavoriteIcon icon={ICON_FAVORITE} data-favorite={favorite}/>
	</PageHeaderButton>;
};