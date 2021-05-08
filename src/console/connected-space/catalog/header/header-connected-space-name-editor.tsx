import React from 'react';
import {PageTitleEditor} from '../../../../basic-widgets/page-title-editor';
import {useForceUpdate} from '../../../../basic-widgets/utils';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {useLanguage} from '../../../../langs';
import {renameConnectedSpace} from '../../../../services/tuples/connected-space';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
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
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await renameConnectedSpace(connectedSpace),
			() => {
			});
	};

	return <PageTitleEditor title={connectedSpace.name}
	                        defaultTitle={language.PLAIN.DEFAULT_CONNECTED_SPACE_NAME}
	                        onChange={onNameChange} onChangeComplete={onNameChangeComplete}/>;
};
