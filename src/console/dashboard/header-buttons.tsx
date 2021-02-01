import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { AlertLabel } from '../../alert/widgets';
import {
	ICON_DASHBOARD,
	ICON_PRINT,
	ICON_REPORT,
	ICON_SHARE,
	ICON_SWITCH,
	ICON_THROW_AWAY
} from '../../basic-widgets/constants';
import {
	PageHeaderButton,
	PageHeaderButtons,
	PageHeaderButtonSeparator
} from '../../basic-widgets/page-header-buttons';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { toDashboard } from '../../routes/utils';
import { saveDashboard } from '../../services/tuples/dashboard';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { createDashboard } from '../utils/tuples';
import { DashboardDelete } from './dashboard-delete';
import { DashboardShare } from './dashboard-share';
import { DashboardSwitch } from './dashboard-switch';

export const HeaderButtons = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const history = useHistory();
	const { fire: fireGlobal } = useEventBus();
	const { once, fire } = useConsoleEventBus();

	const onAddReportClicked = () => {
		// TODO add report into dashboard
	};
	const onCreateDashboardClicked = async () => {
		const dashboard = createDashboard();
		await saveDashboard(dashboard);
		fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
		history.push(toDashboard(dashboard.dashboardId));
	};
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
	const onShareClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG, <DashboardShare dashboard={dashboard}/>);
	};
	const onPrintClicked = () => {
		// TODO print dashboard
	};
	const onDeleted = () => fire(ConsoleEventTypes.DASHBOARD_REMOVED, dashboard);
	const onDeleteClicked = () => {
		fireGlobal(EventTypes.SHOW_DIALOG,
			<DashboardDelete dashboard={dashboard} onRemoved={onDeleted}/>);
	};

	return <PageHeaderButtons>
		<PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_REPORT} onClick={onAddReportClicked}>
			<FontAwesomeIcon icon={ICON_REPORT}/>
		</PageHeaderButton>
		<PageHeaderButtonSeparator/>
		<PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_DASHBOARD} onClick={onCreateDashboardClicked}>
			<FontAwesomeIcon icon={ICON_DASHBOARD}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.SWITCH_DASHBOARD} onClick={onSwitchDashboardClicked}>
			<FontAwesomeIcon icon={ICON_SWITCH}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.SHARE} onClick={onShareClicked}>
			<FontAwesomeIcon icon={ICON_SHARE}/>
		</PageHeaderButton>
		<PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.PRINT} onClick={onPrintClicked}>
			<FontAwesomeIcon icon={ICON_PRINT}/>
		</PageHeaderButton>
		<PageHeaderButtonSeparator/>
		<PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.DELETE_ME} onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
		</PageHeaderButton>
	</PageHeaderButtons>;
};