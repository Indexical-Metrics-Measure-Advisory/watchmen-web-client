import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {ICON_AUTO_REFRESH} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {ButtonInk} from '../../../basic-widgets/types';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Lang} from '../../../langs';
import {Dashboard} from '../../../services/tuples/dashboard-types';
import {REPORT_AUTO_REFRESH_INTERVAL} from '../constants';
import {useDashboardEventBus} from '../dashboard-event-bus';
import {DashboardEventTypes} from '../dashboard-event-bus-types';

export const HeaderAutoRefreshButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire} = useDashboardEventBus();

	const isAutoRefresh = (dashboard.autoRefreshInterval || 0) !== 0;
	const [timer, setTimer] = useState<number | null>(() => {
		if (isAutoRefresh) {
			return window.setInterval(() => {
				fire(DashboardEventTypes.REFRESH_REPORTS, dashboard);
			}, dashboard.autoRefreshInterval!);
		} else {
			return null;
		}
	});
	const forceUpdate = useForceUpdate();

	const onAutoRefreshClicked = () => {
		if (!isAutoRefresh) {
			dashboard.autoRefreshInterval = REPORT_AUTO_REFRESH_INTERVAL;
			fire(DashboardEventTypes.REFRESH_INTERVAL_CHANGED, dashboard);
			fire(DashboardEventTypes.REFRESH_REPORTS, dashboard);
			setTimer(window.setInterval(() => {
				fire(DashboardEventTypes.REFRESH_REPORTS, dashboard);
			}, dashboard.autoRefreshInterval!));
		} else {
			delete dashboard.autoRefreshInterval;
			fire(DashboardEventTypes.REFRESH_INTERVAL_CHANGED, dashboard);
			if (timer) {
				window.clearTimeout(timer);
			}
			setTimer(null);
		}
		forceUpdate();
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.AUTO_REFRESH}
	                         ink={isAutoRefresh ? ButtonInk.PRIMARY : (void 0)}
	                         onClick={onAutoRefreshClicked}>
		<FontAwesomeIcon icon={ICON_AUTO_REFRESH}/>
	</PageHeaderButton>;
};