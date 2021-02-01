import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from '../../basic-widgets/button';
import { Dropdown } from '../../basic-widgets/dropdown';
import { ButtonInk, DropdownOption } from '../../basic-widgets/types';
import { DialogBody, DialogFooter, DialogLabel } from '../../dialog/widgets';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { Dashboard } from '../../services/tuples/dashboard-types';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const DashboardDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

export const DashboardSwitch = (props: { dashboards: Array<Dashboard>, switchTo: (dashboard: Dashboard) => void }) => {
	const { dashboards, switchTo } = props;

	const { fire } = useEventBus();
	const [ selection, setSelection ] = useState(dashboards[0]);

	const onChange = (option: DropdownOption) => {
		setSelection(option.value as Dashboard);
	};
	const onConfirmClicked = () => {
		switchTo(selection);
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	const options = dashboards.map(dashboard => {
		return {
			value: dashboard,
			label: (option: DropdownOption) => (option.value as Dashboard).name
		};
	});

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.SWITCH_DIALOG_LABEL}</DialogLabel>
			<DashboardDropdown value={selection} options={options} onChange={onChange}/>
		</ShareDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.PRIMARY} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};