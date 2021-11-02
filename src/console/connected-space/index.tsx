import {Router} from '@/routes/types';
import {toConnectedSpace} from '@/routes/utils';
import {ConnectedSpace, ConnectedSpaceId} from '@/services/data/tuples/connected-space-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {FullWidthPage} from '@/widgets/basic/page';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {ConnectedSpaceEventBusProvider} from './connected-space-event-bus';
import {PageRouter} from './page-router';

const ConsoleConnectedSpaceIndex = () => {
	const {connectId: connectedSpaceId} = useParams<{ connectId: ConnectedSpaceId }>();

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire, on, off} = useConsoleEventBus();
	const [connectedSpace, setConnectedSpace] = useState<ConnectedSpace | null>(null);
	useEffect(() => {
		fire(ConsoleEventTypes.ASK_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			// eslint-disable-next-line
			const connectedSpace = connectedSpaces.find(connectedSpace => connectedSpace.connectId == connectedSpaceId);
			if (connectedSpace) {
				setConnectedSpace(connectedSpace);
			} else {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
					{Lang.CONSOLE.ERROR.CONNECTED_SPACE_NOT_FOUND}
				</AlertLabel>, () => {
					history.replace(Router.CONSOLE);
				});
			}
		});
	}, [fire, fireGlobal, history, connectedSpaceId]);
	useEffect(() => {
		const onConnectedSpaceRemoved = (connectedSpace: ConnectedSpace) => {
			// eslint-disable-next-line
			if (connectedSpace.connectId != connectedSpaceId) {
				return;
			}

			fire(ConsoleEventTypes.ASK_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
				// eslint-disable-next-line
				const connectedSpace = connectedSpaces.sort((d1, d2) => {
					return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
					// eslint-disable-next-line
				}).find(connectedSpace => connectedSpace.connectId != connectedSpaceId);
				if (connectedSpace) {
					// switch to another one
					history.replace(toConnectedSpace(connectedSpace.connectId));
				} else {
					// no connected space, to home
					history.replace(Router.CONSOLE_HOME);
				}
			});
		};
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		};
	}, [fire, on, off, history, connectedSpaceId]);

	// eslint-disable-next-line
	if (!connectedSpace || connectedSpace.connectId != connectedSpaceId) {
		return null;
	}

	return <ConnectedSpaceEventBusProvider>
		<FullWidthPage>
			<PageRouter connectedSpace={connectedSpace}/>
		</FullWidthPage>
	</ConnectedSpaceEventBusProvider>;
};

export default ConsoleConnectedSpaceIndex;