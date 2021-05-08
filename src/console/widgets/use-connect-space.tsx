import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {AlertLabel} from '../../alert/widgets';
import {Button} from '../../basic-widgets/button';
import {Dropdown} from '../../basic-widgets/dropdown';
import {ButtonInk, DropdownOption} from '../../basic-widgets/types';
import {DialogBody, DialogFooter, DialogLabel} from '../../dialog/widgets';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {Lang} from '../../langs';
import {toConnectedSpace} from '../../routes/utils';
import {AvailableSpaceInConsole} from '../../services/console/settings-types';
import {saveConnectedSpace} from '../../services/tuples/connected-space';
import {ConnectedSpace} from '../../services/tuples/connected-space-types';
import {Space} from '../../services/tuples/space-types';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {createConnectedSpace} from '../utils/tuples';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const AvailableSpaceDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

const AvailableSpacesSelector = (props: { spaces: Array<AvailableSpaceInConsole>, switchTo: (connectedSpace: ConnectedSpace) => void }) => {
    const {spaces, switchTo} = props;

    const {fire} = useEventBus();
    const [selection, setSelection] = useState(spaces[0]);

    const onChange = (option: DropdownOption) => {
        setSelection(option.value as Space);
    };
    const onConfirmClicked = async () => {
        fire(EventTypes.HIDE_DIALOG);
        const connectedSpace = createConnectedSpace(selection.spaceId);
        fire(EventTypes.INVOKE_REMOTE_REQUEST,
            async () => await saveConnectedSpace(connectedSpace),
            () => switchTo(connectedSpace));
    };
    const onCancelClicked = () => {
        fire(EventTypes.HIDE_DIALOG);
    };

    const options = spaces.map(space => {
        return {
            value: space,
            label: (option: DropdownOption) => ({
                node: (option.value as AvailableSpaceInConsole).name,
                label: (option.value as AvailableSpaceInConsole).name
            }),
            key: (option: DropdownOption) => (option.value as AvailableSpaceInConsole).spaceId
        };
    });

    return <>
        <ShareDialogBody>
            <DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.CREATE_DIALOG_LABEL}</DialogLabel>
            <AvailableSpaceDropdown value={selection} options={options} onChange={onChange}/>
        </ShareDialogBody>
        <DialogFooter>
            <Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
            <Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
        </DialogFooter>
    </>;
};

export const useConnectSpace = () => {
    const history = useHistory();
    const {fire: fireGlobal} = useEventBus();
    const {once, fire} = useConsoleEventBus();

    const onSwitchTo = (connectedSpace: ConnectedSpace) => {
        fire(ConsoleEventTypes.CONNECTED_SPACE_CREATED, connectedSpace);
        history.push(toConnectedSpace(connectedSpace.connectId));
    };
    return () => {
        once(ConsoleEventTypes.REPLY_AVAILABLE_SPACES, (spaces: Array<AvailableSpaceInConsole>) => {
            // eslint-disable-next-line
            const candidates = spaces.sort((d1, d2) => {
                return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
            });
            if (candidates.length === 0) {
                // no other
                fireGlobal(EventTypes.SHOW_ALERT,
                    <AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.NO_MORE_SPACE}</AlertLabel>);
            } else {
                fireGlobal(EventTypes.SHOW_DIALOG,
                    <AvailableSpacesSelector spaces={candidates} switchTo={onSwitchTo}/>);
            }
        }).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
    };
};
