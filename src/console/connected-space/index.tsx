import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../alert/widgets';
import { FullWidthPage } from '../../basic-widgets/page';
import { PageHeaderHolder } from '../../basic-widgets/page-header';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { Router } from '../../routes/types';
import { toConnectedSpace } from '../../routes/utils';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { BodyRouter } from './body-router';
import { ConnectedSpaceEventBusProvider } from './connected-space-event-bus';
import { HeaderButtons } from './header/header-buttons';
import { HeaderNameEditor } from './header/header-name-editor';

const ConsoleConnectedSpaceIndex = () => {
	const { connectId: connectedSpaceId } = useParams<{ connectId: string }>();

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once, on, off } = useConsoleEventBus();
	const [ connectedSpace, setConnectedSpace ] = useState<ConnectedSpace | null>(null);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			// eslint-disable-next-line
			const connectedSpace = connectedSpaces.find(connectedSpace => connectedSpace.connectId == connectedSpaceId);
			if (connectedSpace) {
				setConnectedSpace(connectedSpace);
			} else {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					history.replace(Router.CONSOLE);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.ERROR.CONNECTED_SPACE_NOT_FOUND}</AlertLabel>);
			}
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	}, [ once, onceGlobal, history, connectedSpaceId ]);
	useEffect(() => {
		const onConnectedSpaceRemoved = (connectedSpace: ConnectedSpace) => {
			// eslint-disable-next-line
			if (connectedSpace.connectId != connectedSpaceId) {
				return;
			}

			once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
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
			}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
		};
		on(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, onConnectedSpaceRemoved);
		};
	}, [ once, on, off, history, connectedSpaceId ]);

	if (!connectedSpace) {
		return null;
	}

	return <ConnectedSpaceEventBusProvider>
		<FullWidthPage>
			<PageHeaderHolder>
				<HeaderNameEditor connectedSpace={connectedSpace}/>
				<HeaderButtons connectedSpace={connectedSpace}/>
			</PageHeaderHolder>
			<BodyRouter connectedSpace={connectedSpace}/>
		</FullWidthPage>
	</ConnectedSpaceEventBusProvider>;
};

export default ConsoleConnectedSpaceIndex;