import {fetchEnum} from '@/services/data/tuples/enum';
import {Enum} from '@/services/data/tuples/enum-types';
import {useEffect, useState} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {HoldSettings} from './types';

type EnumerationPromises = { [key in string]: Promise<Enum> };

export const useReplier = (options: { holdSettings: HoldSettings }) => {
	const {holdSettings} = options;

	const {on, off, fire} = useConsoleEventBus();
	const [enumPromises, setEnumPromises] = useState<EnumerationPromises>({});

	useEffect(() => {
		const onAskSettingsLoaded = () => {
			fire(ConsoleEventTypes.REPLY_SETTINGS_LOADED, holdSettings.initialized);
		};
		const onAskLastSnapshot = () => {
			fire(ConsoleEventTypes.REPLY_LAST_SNAPSHOT, holdSettings.lastSnapshot);
		};
		const onAskFavorite = () => {
			fire(ConsoleEventTypes.REPLY_FAVORITE, holdSettings.favorite);
		};
		const onAskConnectedSpaces = () => {
			fire(ConsoleEventTypes.REPLY_CONNECTED_SPACES, holdSettings.connectedSpaces);
		};
		const onAskConnectedSpaceGraphics = () => {
			fire(ConsoleEventTypes.REPLY_CONNECTED_SPACE_GRAPHICS, holdSettings.connectedSpaceGraphics);
		};
		const onAskDashboards = () => {
			fire(ConsoleEventTypes.REPLY_DASHBOARDS, holdSettings.dashboards);
		};
		const onAskAvailableSpaces = () => {
			fire(ConsoleEventTypes.REPLY_AVAILABLE_SPACES, holdSettings.availableSpaces);
		};
		const onAskAvailableTopics = () => {
			fire(ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, holdSettings.availableTopics);
		};
		const onAskEnum = (enumId: string, ticket: string) => {
			// eslint-disable-next-line
			const enumeration = holdSettings.enums.find(e => e.enumId == enumId);
			if (enumeration != null) {
				fire(ConsoleEventTypes.REPLY_ENUM, ticket, enumeration);
				return;
			}
			const promise = enumPromises[`${enumId}`];
			if (promise != null) {
				// use the existed promise to fetch enumeration data
				promise.then(enumeration => {
					fire(ConsoleEventTypes.REPLY_ENUM, ticket, enumeration);
				}).catch(() => {
					fire(ConsoleEventTypes.REPLY_ENUM, ticket);
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
							fire(ConsoleEventTypes.REPLY_ENUM, ticket, enumeration);
						} catch {
							fire(ConsoleEventTypes.REPLY_ENUM, ticket);
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