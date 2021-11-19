import {REPORT_AUTO_REFRESH_INTERVAL} from '@/services/constants';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {ICON_AUTO_REFRESH} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
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