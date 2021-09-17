import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_REFRESH} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
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