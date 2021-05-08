import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_REFRESH} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {Lang} from '../../../langs';
import {Dashboard} from '../../../services/tuples/dashboard-types';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';

export const HeaderManualRefreshButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire} = useDashboardEventBus();
	const onManualRefreshClicked = () => {
		fire(DashboardEventTypes.REFRESH_REPORTS, dashboard);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.REFRESH}
	                         onClick={onManualRefreshClicked}>
		<FontAwesomeIcon icon={ICON_REFRESH}/>
	</PageHeaderButton>;
};