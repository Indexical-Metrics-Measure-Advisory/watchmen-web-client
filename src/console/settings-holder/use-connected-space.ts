import { Dispatch, SetStateAction, useEffect } from 'react';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { HoldSettings } from './types';

export const useConnectedSpace = (options: {
	setHoldSettings: Dispatch<SetStateAction<HoldSettings>>
}) => {
	const { setHoldSettings } = options;
	const { on, off, fire } = useConsoleEventBus();
	useEffect(() => {
		const onConnectedSpaceCreated = (connectedSpace: ConnectedSpace) => {
			// refresh is unnecessary
			setHoldSettings(holdSettings => ({
				...holdSettings,
				connectedSpaces: [ ...holdSettings.connectedSpaces, connectedSpace ]
			}));
		};
		const onConnectedSpaceRemoved = (connectedSpace: ConnectedSpace) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				connectedSpaces: holdSettings.connectedSpaces.filter(exists => exists !== connectedSpace),
				favorite: {
					...holdSettings.favorite,
					// eslint-disable-next-line
					connectedSpaceIds: holdSettings.favorite.connectedSpaceIds.filter(id => id != connectedSpace.connectId)
				}
			}));
		};
		const onConnectedSpaceRemovedFromFavorite = (connectedSpaceId: string) => {
			setHoldSettings(holdSettings => ({
				...holdSettings,
				favorite: {
					...holdSettings.favorite,
					// eslint-disable-next-line
					connectedSpaceIds: holdSettings.favorite.connectedSpaceIds.filter(id => id != connectedSpaceId)
				}
			}));
		};

		on(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_CREATED, onConnectedSpaceCreated);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, onConnectedSpaceRemovedFromFavorite);
		};
	}, [ on, off, fire, setHoldSettings ]);
};