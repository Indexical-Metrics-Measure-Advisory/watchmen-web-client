import {useConsoleEventBus} from '@/console/console-event-bus';
import {ConsoleEventTypes} from '@/console/console-event-bus-types';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {Fragment, useEffect} from 'react';

export const SimulateConsole = (props: { connectedSpaces: Array<ConnectedSpace> }) => {
	const {connectedSpaces} = props;

	const {on, off, fire} = useConsoleEventBus();
	useEffect(() => {
		const onAskConnectedSpaces = (onData: (connectedSpaces: Array<ConnectedSpace>) => void) => {
			onData(connectedSpaces);
		};
		on(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		return () => {
			off(ConsoleEventTypes.ASK_CONNECTED_SPACES, onAskConnectedSpaces);
		};
	}, [on, off, fire, connectedSpaces]);

	return <Fragment/>;
};