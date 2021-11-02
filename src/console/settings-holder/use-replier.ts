import {LastSnapshot} from '@/services/data/account/last-snapshot-types';
import {Favorite} from '@/services/data/console/favorite-types';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {ConnectedSpace, ConnectedSpaceGraphics} from '@/services/data/tuples/connected-space-types';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {fetchEnum} from '@/services/data/tuples/enum';
import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useEffect, useState} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {HoldSettings} from './types';

type EnumerationPromises = Record<string, Promise<Enum>>;

export const useReplier = (options: { holdSettings: HoldSettings }) => {
	const {holdSettings} = options;

	const {on, off, fire} = useConsoleEventBus();
	const [enumPromises, setEnumPromises] = useState<EnumerationPromises>({});

	useEffect(() => {
		const onAskSettingsLoaded = (onSettingsLoadedGet: (initialized: boolean) => void) => {
			onSettingsLoadedGet(holdSettings.initialized);
		};
		const onAskLastSnapshot = (onData: (lastSnapshot: LastSnapshot) => void) => {
			onData(holdSettings.lastSnapshot);
		};
		const onAskFavorite = (onData: (favorite: Favorite) => void) => {
			onData(holdSettings.favorite);
		};
		const onAskConnectedSpaces = (onData: (connectedSpaces: Array<ConnectedSpace>) => void) => {
			onData(holdSettings.connectedSpaces);
		};
		const onAskConnectedSpaceGraphics = (onData: (connectedSpaceGraphics: Array<ConnectedSpaceGraphics>) => void) => {
			onData(holdSettings.connectedSpaceGraphics);
		};
		const onAskDashboards = (onData: (dashboards: Array<Dashboard>) => void) => {
			onData(holdSettings.dashboards);
		};
		const onAskAvailableSpaces = (onData: (availableSpaces: Array<AvailableSpaceInConsole>) => void) => {
			onData(holdSettings.availableSpaces);
		};
		const onAskAvailableTopics = (onData: (availableTopics: Array<Topic>) => void) => {
			onData(holdSettings.availableTopics);
		};
		const onAskEnum = (enumId: EnumId, onData: (enumeration?: Enum) => void) => {
			// eslint-disable-next-line
			const enumeration = holdSettings.enums.find(e => e.enumId == enumId);
			if (enumeration != null) {
				onData(enumeration);
				return;
			}
			const promise = enumPromises[`${enumId}`];
			if (promise != null) {
				// use the existed promise to fetch enumeration data
				promise.then(enumeration => {
					onData(enumeration);
				}).catch(() => {
					onData();
				});
				return;
			}

			setEnumPromises(promises => {
				return {
					[`${enumId}`]: new Promise<Enum>(async resolve => {
						try {
							const enumeration = await fetchEnum(enumId);
							// push to hold settings
							holdSettings.enums.push(enumeration);
							resolve(enumeration);
							onData(enumeration);
						} catch {
							onData();
						} finally {
							// remove me from state after done
							setEnumPromises(promises => {
								return Object.keys(promises).reduce((map, key) => {
									// eslint-disable-next-line
									if (key != enumId) {
										map[key] = promises[key];
									}
									return map;
								}, {} as EnumerationPromises);
							});
						}
					}),
					...promises
				};
			});
		};

		on(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);

		on(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
		on(ConsoleEventTypes.ASK_FAVORITE, onAskFavorite);

		on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		on(ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, onAskConnectedSpaceGraphics);
		on(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
		on(ConsoleEventTypes.ASK_AVAILABLE_SPACES, onAskAvailableSpaces);
		on(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, onAskAvailableTopics);
		on(ConsoleEventTypes.ASK_ENUM, onAskEnum);
		return () => {
			off(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);

			off(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
			off(ConsoleEventTypes.ASK_FAVORITE, onAskFavorite);

			off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
			off(ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, onAskConnectedSpaceGraphics);
			off(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
			off(ConsoleEventTypes.ASK_AVAILABLE_SPACES, onAskAvailableSpaces);
			off(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, onAskAvailableTopics);
			off(ConsoleEventTypes.ASK_ENUM, onAskEnum);
		};
	}, [
		on, off, fire,
		holdSettings.initialized,
		holdSettings.lastSnapshot, holdSettings.favorite,
		holdSettings.connectedSpaces, holdSettings.connectedSpaceGraphics, holdSettings.dashboards,
		holdSettings.availableSpaces,
		holdSettings.availableTopics,
		holdSettings.enums, enumPromises
	]);
};