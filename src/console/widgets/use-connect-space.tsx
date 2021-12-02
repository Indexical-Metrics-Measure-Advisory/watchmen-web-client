import {toConnectedSpace} from '@/routes/utils';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {listTemplateConnectedSpaces, saveConnectedSpace} from '@/services/data/tuples/connected-space';
import {ConnectedSpace, ConnectedSpaceId, ConnectedSpaceTemplate} from '@/services/data/tuples/connected-space-types';
import {Space, SpaceId} from '@/services/data/tuples/space-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {CheckBox} from '@/widgets/basic/checkbox';
import {Dropdown} from '@/widgets/basic/dropdown';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {createConnectedSpace} from '../utils/tuples';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;

const AvailableTemplateTable = styled.div.attrs({'data-v-scroll': ''})`
	display               : flex;
	flex-direction        : column;
	grid-template-columns : 40px 60px 1fr auto;
	margin-top            : calc(var(--margin) / 4);
	max-height            : calc(var(--height) * 9);
	overflow-y            : auto;
`;
const AvailableTemplateTableRow = styled.div`
	display               : grid;
	grid-template-columns : 40px 60px 1fr auto;
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
	&:first-child {
		position         : sticky;
		top              : 0;
		background-color : var(--bg-color);
		z-index          : 1;
	}
	&:not(:first-child):hover {
		background-color : var(--hover-color);
	}
`;
const AvailableTemplateTableHeaderCell = styled.div`
	display       : flex;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 4);
	font-size     : 1.1em;
	font-weight   : var(--font-bold);
	border-bottom : var(--border);
	height        : var(--height);
`;
const AvailableTemplateTableCell = styled.div`
	display     : flex;
	align-items : center;
	padding     : 0 calc(var(--margin) / 4);
	height      : var(--height);
`;
const AvailableTemplatesSelector = (props: { spaceId: SpaceId, templates: Array<ConnectedSpaceTemplate>, switchTo: (connectedSpace: ConnectedSpace) => void }) => {
	const {spaceId, templates, switchTo} = props;

	const {fire} = useEventBus();
	const [selectedConnectedSpaceIds, setSelectedConnectedSpaceIds] = useState<Array<ConnectedSpaceId>>([]);

	const onTemplateSelected = (connectedSpaceId: ConnectedSpaceId) => (value: boolean) => {
		if (value) {
			setSelectedConnectedSpaceIds([...new Set([...selectedConnectedSpaceIds, connectedSpaceId])]);
		} else {
			// eslint-disable-next-line
			setSelectedConnectedSpaceIds(selectedConnectedSpaceIds.filter(id => id != connectedSpaceId));
		}
	};
	const onConfirmClicked = async () => {
		fire(EventTypes.HIDE_DIALOG);
		const connectedSpace = createConnectedSpace(spaceId);
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveConnectedSpace(connectedSpace, selectedConnectedSpaceIds),
			() => switchTo(connectedSpace));
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.CREATE_DIALOG_CHOOSE_TEMPLATE_LABEL}</DialogLabel>
			<AvailableTemplateTable>
				<AvailableTemplateTableRow>
					<AvailableTemplateTableHeaderCell/>
					<AvailableTemplateTableHeaderCell/>
					<AvailableTemplateTableHeaderCell>{Lang.CONSOLE.CONNECTED_SPACE.TEMPLATE}</AvailableTemplateTableHeaderCell>
					<AvailableTemplateTableHeaderCell>{Lang.CONSOLE.CONNECTED_SPACE.TEMPLATE_CREATE_BY}</AvailableTemplateTableHeaderCell>
				</AvailableTemplateTableRow>
				{templates.map((template, index) => {
					return <AvailableTemplateTableRow key={template.connectId}>
						<AvailableTemplateTableCell>{index + 1}</AvailableTemplateTableCell>
						<AvailableTemplateTableCell>
							<CheckBox value={selectedConnectedSpaceIds.includes(template.connectId)}
							          onChange={onTemplateSelected(template.connectId)}/>
						</AvailableTemplateTableCell>
						<AvailableTemplateTableCell>{template.name || 'Noname'}</AvailableTemplateTableCell>
						<AvailableTemplateTableCell>{template.createBy || 'Anonymous'}</AvailableTemplateTableCell>
					</AvailableTemplateTableRow>;
				})}
			</AvailableTemplateTable>
		</ShareDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

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
	const doCreateConnectedSpace = () => {
		fire(EventTypes.HIDE_DIALOG);
		const connectedSpace = createConnectedSpace(selection.spaceId);
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveConnectedSpace(connectedSpace),
			() => switchTo(connectedSpace));
	};
	const onConfirmClicked = async () => {
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await listTemplateConnectedSpaces(selection.spaceId),
			(templates: Array<ConnectedSpaceTemplate>) => {
				if (!templates || templates.length === 0) {
					doCreateConnectedSpace();
				} else {
					fire(EventTypes.SHOW_DIALOG,
						<AvailableTemplatesSelector spaceId={selection.spaceId} templates={templates}
						                            switchTo={switchTo}/>);
				}
			});
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = spaces.map(space => {
		return {
			value: space,
			label: space.name,
			key: space.spaceId
		};
	});

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.CONNECTED_SPACE.CREATE_DIALOG_LABEL}</DialogLabel>
			<AvailableSpaceDropdown value={selection} options={options} onChange={onChange}/>
		</ShareDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const useConnectSpace = () => {
	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();

	const onSwitchTo = (connectedSpace: ConnectedSpace) => {
		fire(ConsoleEventTypes.CONNECTED_SPACE_CREATED, connectedSpace);
		history.push(toConnectedSpace(connectedSpace.connectId));
	};
	return () => {
		fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES, (spaces: Array<AvailableSpaceInConsole>) => {
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
		});
	};
};
