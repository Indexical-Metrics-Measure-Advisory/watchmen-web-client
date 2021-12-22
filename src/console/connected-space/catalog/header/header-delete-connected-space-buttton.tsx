import {SAVE_TIMEOUT} from '@/services/constants';
import {deleteConnectedSpace, saveConnectedSpaceGraphics} from '@/services/data/tuples/connected-space';
import {ConnectedSpace, ConnectedSpaceGraphics} from '@/services/data/tuples/connected-space-types';
import {Button} from '@/widgets/basic/button';
import {ICON_THROW_AWAY} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {useThrottler} from '@/widgets/throttler';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import styled from 'styled-components';
import {useConsoleEventBus} from '../../../console-event-bus';
import {ConsoleEventTypes} from '../../../console-event-bus-types';

const DeleteDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const NameUrl = styled.div`
	color       : var(--info-color);
	font-weight : var(--font-bold);
	padding-top : calc(var(--margin) / 2);
	word-break  : break-all;
	line-height : var(--line-height);
`;

const ConnectedSpaceDelete = (props: { connectedSpace: ConnectedSpace, onRemoved: () => void }) => {
	const {connectedSpace, onRemoved} = props;

	const {fire} = useEventBus();

	const onDeleteClicked = async () => {
		fire(EventTypes.HIDE_DIALOG);
		onRemoved();
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DeleteDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.DELETE_DIALOG_LABEL}</DialogLabel>
			<NameUrl>{connectedSpace.name}</NameUrl>
		</DeleteDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.DANGER} onClick={onDeleteClicked}>{Lang.ACTIONS.DELETE}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderDeleteConnectedSpaceButton = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useConsoleEventBus();
	const saveQueue = useThrottler();
	useEffect(() => saveQueue.clear(true), [connectedSpace, saveQueue]);
	useEffect(() => {
		const onSpaceGraphicsChanged = (graphics: ConnectedSpaceGraphics) => {
			// eslint-disable-next-line
			if (graphics.connectId != connectedSpace.connectId) {
				return;
			}
			saveQueue.replace(() => {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => await saveConnectedSpaceGraphics(connectedSpace, graphics));
			}, SAVE_TIMEOUT);
		};
		on(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, onSpaceGraphicsChanged);
		return () => {
			off(ConsoleEventTypes.CONNECTED_SPACE_GRAPHICS_CHANGED, onSpaceGraphicsChanged);
		};
	}, [fireGlobal, on, off, connectedSpace, saveQueue]);

	const onDeleted = async () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST, async () => {
			saveQueue.clear(false);
			await deleteConnectedSpace(connectedSpace);
		}, () => {
			fire(ConsoleEventTypes.CONNECTED_SPACE_REMOVED_FROM_FAVORITE, connectedSpace.connectId);
			fire(ConsoleEventTypes.CONNECTED_SPACE_REMOVED, connectedSpace);
		});
	};
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<ConnectedSpaceDelete connectedSpace={connectedSpace} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.DELETE_ME} onClick={onDeleteClicked}>
		<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
	</PageHeaderButton>;
};