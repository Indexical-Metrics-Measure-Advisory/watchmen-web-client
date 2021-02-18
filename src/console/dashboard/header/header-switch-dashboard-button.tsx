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
import { toDashboard } from '../../../routes/utils';
import { Dashboard } from '../../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const DashboardDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

const DashboardSwitch = (props: { dashboards: Array<Dashboard>, switchTo: (dashboard: Dashboard) => void }) => {
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
			label: (option: DropdownOption) => ({
				node: (option.value as Dashboard).name,
				label: (option.value as Dashboard).name
			}),
			key: (option: DropdownOption) => (option.value as Dashboard).dashboardId
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

export const HeaderSwitchDashboardButton = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const history = useHistory();
	const { fire: fireGlobal } = useEventBus();
	const { once } = useConsoleEventBus();

	const onSwitchTo = (dashboard: Dashboard) => {
		history.push(toDashboard(dashboard.dashboardId));
	};
	const onSwitchDashboardClicked = () => {
		once(ConsoleEventTypes.REPLY_DASHBOARDS, (dashboards: Array<Dashboard>) => {
			// eslint-disable-next-line
			const candidates = dashboards.sort((d1, d2) => {
				return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
			}).filter(exists => exists !== dashboard);
			if (candidates.length === 0) {
				// no other
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.DASHBOARD.NO_MORE_DASHBOARD}</AlertLabel>);
			} else {
				fireGlobal(EventTypes.SHOW_DIALOG, <DashboardSwitch dashboards={candidates} switchTo={onSwitchTo}/>);
			}
		}).fire(ConsoleEventTypes.ASK_DASHBOARDS);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.SWITCH_DASHBOARD} onClick={onSwitchDashboardClicked}>
		<FontAwesomeIcon icon={ICON_SWITCH}/>
	</PageHeaderButton>;
};