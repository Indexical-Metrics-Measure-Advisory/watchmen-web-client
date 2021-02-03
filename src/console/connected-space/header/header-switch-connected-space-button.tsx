import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { AlertLabel } from '../../../alert/widgets';
import { Button } from '../../../basic-widgets/button';
import { ICON_SWITCH } from '../../../basic-widgets/constants';
import { Dropdown } from '../../../basic-widgets/dropdown';
import { PageHeaderButton } from '../../../basic-widgets/page-header-buttons';
import { ButtonInk, DropdownOption } from '../../../basic-widgets/types';
import { DialogBody, DialogFooter, DialogLabel } from '../../../dialog/widgets';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { Lang } from '../../../langs';
import { toConnectedSpace } from '../../../routes/utils';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const ConnectedSpaceDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

const ConnectedSpaceSwitch = (props: { connectedSpaces: Array<ConnectedSpace>, switchTo: (connectedSpace: ConnectedSpace) => void }) => {
	const { connectedSpaces, switchTo } = props;

	const { fire } = useEventBus();
	const [ selection, setSelection ] = useState(connectedSpaces[0]);

	const onChange = (option: DropdownOption) => {
		setSelection(option.value as ConnectedSpace);
	};
	const onConfirmClicked = () => {
		switchTo(selection);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = connectedSpaces.map(connectedSpace => {
		return {
			value: connectedSpace,
			label: (option: DropdownOption) => (option.value as ConnectedSpace).name,
			key: (option: DropdownOption) => (option.value as ConnectedSpace).connectId
		};
	});

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.SWITCH_DIALOG_LABEL}</DialogLabel>
			<ConnectedSpaceDropdown value={selection} options={options} onChange={onChange}/>
		</ShareDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderSwitchConnectedSpaceButton = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const history = useHistory();
	const { fire: fireGlobal } = useEventBus();
	const { once } = useConsoleEventBus();

	const onSwitchTo = (connectedSpace: ConnectedSpace) => {
		history.push(toConnectedSpace(connectedSpace.connectId));
	};
	const onSwitchConnectedSpaceClicked = () => {
		once(ConsoleEventTypes.REPLY_CONNECTED_SPACES, (connectedSpaces: Array<ConnectedSpace>) => {
			// eslint-disable-next-line
			const candidates = connectedSpaces.sort((d1, d2) => {
				return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
			}).filter(exists => exists !== connectedSpace);
			if (candidates.length === 0) {
				// no other
				fireGlobal(EventTypes.SHOW_ALERT,
					<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.NO_MORE_CONNECTED_SPACE}</AlertLabel>);
			} else {
				fireGlobal(EventTypes.SHOW_DIALOG,
					<ConnectedSpaceSwitch connectedSpaces={candidates} switchTo={onSwitchTo}/>);
			}
		}).fire(ConsoleEventTypes.ASK_CONNECTED_SPACES);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.CONNECTED_SPACE.SWITCH_CONNECTED_SPACE}
	                         onClick={onSwitchConnectedSpaceClicked}>
		<FontAwesomeIcon icon={ICON_SWITCH}/>
	</PageHeaderButton>;
};