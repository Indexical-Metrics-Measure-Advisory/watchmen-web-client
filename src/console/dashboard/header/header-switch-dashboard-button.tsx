import {toDashboard} from '@/routes/utils';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_SWITCH} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';

const ShareDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;
const DashboardDropdown = styled(Dropdown)`
	margin-top : calc(var(--margin) / 4);
`;

const DashboardSwitch = (props: { dashboards: Array<Dashboard>, switchTo: (dashboard: Dashboard) => void }) => {
	const {dashboards, switchTo} = props;

	const {fire} = useEventBus();
	const [selection, setSelection] = useState(dashboards[0]);

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
			label: dashboard.name,
			key: dashboard.dashboardId
		};
	});

	return <>
		<ShareDialogBody>
			<DialogLabel>{Lang.CONSOLE.DASHBOARD.SWITCH_DIALOG_LABEL}</DialogLabel>
			<DashboardDropdown value={selection} options={options} onChange={onChange}/>
		</ShareDialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
		</DialogFooter>
	</>;
};

export const HeaderSwitchDashboardButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();

	const onSwitchTo = (dashboard: Dashboard) => {
		history.push(toDashboard(dashboard.dashboardId));
	};
	const onSwitchDashboardClicked = () => {
		fire(ConsoleEventTypes.ASK_DASHBOARDS, (dashboards: Array<Dashboard>) => {
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
		});
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.SWITCH_DASHBOARD} onClick={onSwitchDashboardClicked}>
		<FontAwesomeIcon icon={ICON_SWITCH}/>
	</PageHeaderButton>;
};