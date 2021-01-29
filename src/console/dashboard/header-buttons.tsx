import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_CHART, ICON_DASHBOARD, ICON_SHARE, ICON_SWITCH, ICON_THROW_AWAY } from '../../basic-widgets/constants';
import { PageHeaderButton, PageHeaderButtons } from '../../basic-widgets/page-header-buttons';
import { useLanguage } from '../../langs';
import { toDashboard } from '../../routes/utils';
import { saveDashboard } from '../../services/tuples/dashboard';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { createDashboard } from '../utils/tuples';

export const HeaderButtons = () => {
	const history = useHistory();
	const language = useLanguage();
	const { fire } = useConsoleEventBus();

	const onCreateDashboardClicked = async () => {
		const dashboard = createDashboard();
		await saveDashboard(dashboard);
		fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
		history.push(toDashboard(dashboard.dashboardId));
	};

	return <PageHeaderButtons>
		<PageHeaderButton data-title={language.PLAIN.SHARE}>
			<FontAwesomeIcon icon={ICON_SHARE}/>
		</PageHeaderButton>
		<PageHeaderButton data-title={language.PLAIN.ADD_REPORT}>
			<FontAwesomeIcon icon={ICON_CHART}/>
		</PageHeaderButton>
		<PageHeaderButton data-title={language.PLAIN.ADD_DASHBOARD} onClick={onCreateDashboardClicked}>
			<FontAwesomeIcon icon={ICON_DASHBOARD}/>
		</PageHeaderButton>
		<PageHeaderButton data-title={language.PLAIN.SWITCH_DASHBOARD}>
			<FontAwesomeIcon icon={ICON_SWITCH}/>
		</PageHeaderButton>
		<PageHeaderButton data-title={language.PLAIN.DELETE_ME}>
			<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
		</PageHeaderButton>
	</PageHeaderButtons>;
};