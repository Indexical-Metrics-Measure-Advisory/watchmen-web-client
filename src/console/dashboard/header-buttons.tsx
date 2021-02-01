import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
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

export const HeaderButtons = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const history = useHistory();
	const { fire: fireGlobal } = useEventBus();
	const { fire } = useConsoleEventBus();

	const onAddReportClicked = () => {
		// TODO add report into dashboard
	};
	const onCreateDashboardClicked = async () => {
		const dashboard = createDashboard();
		await saveDashboard(dashboard);
		fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
		history.push(toDashboard(dashboard.dashboardId));
	};
	const onSwitchDashboardClicked = () => {
		// TODO switch dashboard
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