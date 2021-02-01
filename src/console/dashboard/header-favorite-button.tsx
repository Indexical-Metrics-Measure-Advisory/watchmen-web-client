import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ICON_FAVORITE } from '../../basic-widgets/constants';
import { PageHeaderButton } from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';
import { saveFavorite } from '../../services/console/favorite';
import { Favorite } from '../../services/console/favorite-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';

const FavoriteIcon = styled(FontAwesomeIcon).attrs<{ 'data-favorite': boolean }>(({ 'data-favorite': favorite }) => {
	return {
		style: { color: favorite ? 'var(--warn-color)' : (void 0) }
	};
})`
	transition: color 300ms ease-in-out;
`;

export const HeaderFavoriteButton = (props: { dashboardId: string }) => {
	const { dashboardId } = props;
	const { once, on, off, fire } = useConsoleEventBus();
	const [ favorite, setFavorite ] = useState(false);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_FAVORITE, ({ dashboardIds }: Favorite) => {
			// eslint-disable-next-line
			const found = dashboardIds.find(id => dashboardId == id);
			if (found) {
				setFavorite(true);
			}
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	}, [ once, dashboardId ]);
	useEffect(() => {
		const onDashboardAddedIntoFavorite = (addedDashboardId: string) => {
			// eslint-disable-next-line
			if (addedDashboardId == dashboardId) {
				setFavorite(true);
			}
		};
		const onDashboardRemovedFromFavorite = (removedDashboardId: string) => {
			// eslint-disable-next-line
			if (removedDashboardId == dashboardId) {
				setFavorite(false);
			}
		};

		on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
		on(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		return () => {
			on(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, onDashboardAddedIntoFavorite);
			off(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, onDashboardRemovedFromFavorite);
		};
	}, [ on, off, dashboardId ]);

	const onAddIntoFavoriteClicked = () => {
		once(ConsoleEventTypes.REPLY_FAVORITE, async (favorite: Favorite) => {
			await saveFavorite({
				...favorite,
				dashboardIds: Array.from(new Set([ ...favorite.dashboardIds, dashboardId ]))
			});
			fire(ConsoleEventTypes.DASHBOARD_ADDED_INTO_FAVORITE, dashboardId);
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	};
	const onRemoveFromFavoriteClicked = () => {
		once(ConsoleEventTypes.REPLY_FAVORITE, async (favorite: Favorite) => {
			await saveFavorite({
				...favorite,
				// eslint-disable-next-line
				dashboardIds: favorite.dashboardIds.filter(id => id != dashboardId)
			});
			fire(ConsoleEventTypes.DASHBOARD_REMOVED_FROM_FAVORITE, dashboardId);
		}).fire(ConsoleEventTypes.ASK_FAVORITE);
	};

	return <PageHeaderButton
		tooltip={favorite ? Lang.CONSOLE.DASHBOARD.REMOVE_FROM_FAVORITE : Lang.CONSOLE.DASHBOARD.ADD_INTO_FAVORITE}
		onClick={favorite ? onRemoveFromFavoriteClicked : onAddIntoFavoriteClicked}>
		<FavoriteIcon icon={ICON_FAVORITE} data-favorite={favorite}/>
	</PageHeaderButton>;
};