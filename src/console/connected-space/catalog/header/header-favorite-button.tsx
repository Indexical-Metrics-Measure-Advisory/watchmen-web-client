import {saveFavorite} from '@/services/data/console/favorite';
import {Favorite} from '@/services/data/console/favorite-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {ICON_FAVORITE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {useConsoleEventBus} from '../../../console-event-bus';
import {ConsoleEventTypes} from '../../../console-event-bus-types';

const FavoriteIcon = styled(FontAwesomeIcon).attrs<{ 'data-favorite': boolean }>(({'data-favorite': favorite}) => {
	return {
		style: {color: favorite ? 'var(--warn-color)' : (void 0)}
	};
})`
	transition : color 300ms ease-in-out;
`;

export const HeaderFavoriteButton = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;
	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useConsoleEventBus();
	const [favorite, setFavorite] = useState(false);
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_FAVORITE, ({connectedSpaceIds}: Favorite) => {
			// eslint-disable-next-line
			const found = connectedSpaceIds.find(connectedSpaceId => connectedSpaceId == connectedSpace.connectId);
			if (found) {
				setFavorite(true);
			} else if (!found) {
				setFavorite(false);
			}
		});
	}, [fire, connectedSpace]);
	useEffect(() => {
		const onConnectedSpaceAddedIntoFavorite = (addedConnectedSpaceId: string) => {
			// eslint-disable-next-line
			if (addedConnectedSpaceId == connectedSpace.connectId) {
				setFavorite(true);
			}
		};
		const onConnectedSpaceRemovedFromFavorite = (removedConnectedSpaceId: string) => {
			// eslint-disable-next-line
			if (removedConnectedSpaceId == connectedSpace.connectId) {
				setFavorite(false);
			}
		};

		on(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		};
	}, [on, off, connectedSpace]);

	const onAddIntoFavoriteClicked = () => {
		fire(ConsoleEventTypes.ASK_FAVORITE, (favorite: Favorite) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveFavorite({
					...favorite,
					connectedSpaceIds: Array.from(new Set([...favorite.connectedSpaceIds, connectedSpace.connectId]))
				}),
				() => fire(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, connectedSpace.connectId));
		});
	};
	const onRemoveFromFavoriteClicked = () => {
		fire(ConsoleEventTypes.ASK_FAVORITE, (favorite: Favorite) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await saveFavorite({
					...favorite,
					// eslint-disable-next-line
					connectedSpaceIds: favorite.connectedSpaceIds.filter(connectedSpaceId => connectedSpaceId != connectedSpace.connectId)
				}),
				() => fire(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, connectedSpace.connectId));
		});
	};

	return <PageHeaderButton
		tooltip={favorite ? Lang.CONSOLE.CONNECTED_SPACE.REMOVE_FROM_FAVORITE : Lang.CONSOLE.CONNECTED_SPACE.ADD_INTO_FAVORITE}
		onClick={favorite ? onRemoveFromFavoriteClicked : onAddIntoFavoriteClicked}>
		<FavoriteIcon icon={ICON_FAVORITE} data-favorite={favorite}/>
	</PageHeaderButton>;
};