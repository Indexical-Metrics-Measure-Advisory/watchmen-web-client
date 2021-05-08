import {useEffect} from 'react';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {HoldSettings} from './types';

export const useReplier = (options: {
    holdSettings: HoldSettings
}) => {
    const {holdSettings} = options;
    const {on, off, fire} = useConsoleEventBus();

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

        on(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);

        on(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
        on(ConsoleEventTypes.ASK_FAVORITE, onAskFavorite);

        on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
        on(ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, onAskConnectedSpaceGraphics);
        on(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
        on(ConsoleEventTypes.ASK_AVAILABLE_SPACES, onAskAvailableSpaces);
        on(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, onAskAvailableTopics);
        return () => {
            off(ConsoleEventTypes.ASK_SETTINGS_LOADED, onAskSettingsLoaded);

            off(ConsoleEventTypes.ASK_LAST_SNAPSHOT, onAskLastSnapshot);
            off(ConsoleEventTypes.ASK_FAVORITE, onAskFavorite);

            off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
            off(ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, onAskConnectedSpaceGraphics);
            off(ConsoleEventTypes.ASK_DASHBOARDS, onAskDashboards);
            off(ConsoleEventTypes.ASK_AVAILABLE_SPACES, onAskAvailableSpaces);
            off(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, onAskAvailableTopics);
        };
    }, [
        on, off, fire,
        holdSettings.initialized,
        holdSettings.lastSnapshot, holdSettings.favorite,
        holdSettings.connectedSpaces, holdSettings.connectedSpaceGraphics, holdSettings.dashboards,
        holdSettings.availableSpaces,
        holdSettings.availableTopics
    ]);
};