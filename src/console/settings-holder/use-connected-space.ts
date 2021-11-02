import {ConnectedSpace, ConnectedSpaceGraphics, ConnectedSpaceId} from '@/services/data/tuples/connected-space-types';
import {Dispatch, SetStateAction, useEffect} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {HoldSettings} from './types';

export const useConnectedSpace = (options: {
	setHoldSettings: Dispatch<SetStateAction<HoldSettings>>
}) => {
	const {setHoldSettings} = options;
	const {on, off, fire} = useConsoleEventBus();
	useEffect(() => {
		const onConnectedSpaceCreated = (connectedSpace: ConnectedSpace) => {
			// refresh is unnecessary
			setHoldSettings(holdSettings => ({
				...holdSettings,
				connectedSpaces: [...holdSettings.connectedSpaces, connectedSpace],
				connectedSpaceGraphics: [...holdSettings.connectedSpaceGraphics, {
					connectId: connectedSpace.connectId,
					topics: [],
					subjects: [],
					reports: []
				}]
			}));
		};
		const onConnectedSpaceRemoved = (connectedSpace: ConnectedSpace) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				connectedSpaces: holdSettings.connectedSpaces.filter(exists => exists !== connectedSpace),
				// eslint-disable-next-line
				connectedSpaceGraphics: holdSettings.connectedSpaceGraphics.filter(exists => exists.connectId != connectedSpace.connectId),
				favorite: {
					...holdSettings.favorite,
					// eslint-disable-next-line
					connectedSpaceIds: holdSettings.favorite.connectedSpaceIds.filter(id => id != connectedSpace.connectId)
				}
			}));
		};
		const onConnectedSpaceAddedIntoFavorite = (connectedSpaceId: ConnectedSpaceId) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				favorite: {
					...holdSettings.favorite,
					connectedSpaceIds: Array.from(new Set<string>([...holdSettings.favorite.connectedSpaceIds, connectedSpaceId]))
				}
			}));
		};
		const onConnectedSpaceRemovedFromFavorite = (connectedSpaceId: ConnectedSpaceId) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				favorite: {
					...holdSettings.favorite,
					// eslint-disable-next-line
					connectedSpaceIds: holdSettings.favorite.connectedSpaceIds.filter(id => id != connectedSpaceId)
				}
			}));
		};
		const onConnectedSpaceGraphicsChanged = (graphics: ConnectedSpaceGraphics) => {
			setHoldSettings(holdSettings => {
				return {
					...holdSettings,
					// eslint-disable-next-line
					connectedSpaceGraphics: [...holdSettings.connectedSpaceGraphics.filter(g => g.connectId != graphics.connectId), graphics]
				};
			});
		};

		on(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		on(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);

		on(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, onConnectedSpaceGraphicsChanged);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
			off(ConsoleEventTypes.CONNECTED_SPACE_ADDED_INTO_FAVORITE, onConnectedSpaceAddedIntoFavorite);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);

			off(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, onConnectedSpaceGraphicsChanged);
		};
	}, [on, off, fire, setHoldSettings]);
};