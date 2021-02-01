import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../alert/widgets';
import { VerticalMarginOneUnit } from '../../basic-widgets/margin';
import { FullWidthPage } from '../../basic-widgets/page';
import { PageHeaderHolder } from '../../basic-widgets/page-header';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../basic-widgets/utils';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { Router } from '../../routes/types';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { HeaderButtons } from './header-buttons';

const ConnectedSpaceName = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const forceUpdate = useForceUpdate();

	const onNameChange = (name: string) => {
		connectedSpace.name = name;
		// TODO fire save connected space
		forceUpdate();
	};

	return <PageTitleEditor title={connectedSpace.name} onChange={onNameChange}/>;
};
const ConsoleConnectedSpaceIndex = () => {
	const { connectId } = useParams<{ connectId: string }>();

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once } = useConsoleEventBus();
	const [ connectedSpace, setConnectedSpace ] = useState<ConnectedSpace | null>(null);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			// eslint-disable-next-line
			const connectedSpace = connectedSpaces.find(connectedSpace => connectedSpace.connectId == connectId);
			if (connectedSpace) {
				setConnectedSpace(connectedSpace);
			} else {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					history.replace(Router.CONSOLE);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.ERROR.CONNECTED_SPACE_NOT_FOUND}</AlertLabel>);
			}
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	}, [ once, onceGlobal, history, connectId ]);

	if (!connectedSpace) {
		return null;
	}

	return <FullWidthPage>
		<PageHeaderHolder>
			<ConnectedSpaceName connectedSpace={connectedSpace}/>
			<HeaderButtons connectedSpace={connectedSpace}/>
		</PageHeaderHolder>
		<VerticalMarginOneUnit/>
	</FullWidthPage>;
};

export default ConsoleConnectedSpaceIndex;