import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_DASHBOARD } from '../../basic-widgets/constants';
import { PageHeaderButton } from '../../basic-widgets/page-header-buttons';
import { Lang } from '../../langs';
import { toDashboard } from '../../routes/utils';
import { saveDashboard } from '../../services/tuples/dashboard';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { createDashboard } from '../utils/tuples';

export const HeaderCreateDashboardButton = () => {
	const history = useHistory();
	const { fire } = useConsoleEventBus();

	const onCreateDashboardClicked = async () => {
		const dashboard = createDashboard();
		await saveDashboard(dashboard);
		fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
		history.push(toDashboard(dashboard.dashboardId));
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_DASHBOARD} onClick={onCreateDashboardClicked}>
		<FontAwesomeIcon icon={ICON_DASHBOARD}/>
	</PageHeaderButton>;
};