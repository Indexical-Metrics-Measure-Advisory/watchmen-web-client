import {renameConnectedSpace} from '@/services/data/tuples/connected-space';
import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {PageTitleEditor} from '@/widgets/basic/page-title-editor';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useLanguage} from '@/widgets/langs';
import React from 'react';
import {useConsoleEventBus} from '../../../console-event-bus';
import {ConsoleEventTypes} from '../../../console-event-bus-types';

export const HeaderConnectedSpaceNameEditor = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const language = useLanguage();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();
	const forceUpdate = useForceUpdate();

	const onNameChange = async (name: string) => {
		connectedSpace.name = name;
		forceUpdate();
		fire(ConsoleEventTypes.CONNECTED_SPACE_RENAMED, connectedSpace);
	};
	const onNameChangeComplete = async (name: string) => {
		connectedSpace.name = name.trim() || language.PLAIN.DEFAULT_CONNECTED_SPACE_NAME;
		forceUpdate();
		fire(ConsoleEventTypes.CONNECTED_SPACE_RENAMED, connectedSpace);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => await renameConnectedSpace(connectedSpace));
	};

	return <PageTitleEditor title={connectedSpace.name}
	                        defaultTitle={language.PLAIN.DEFAULT_CONNECTED_SPACE_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
