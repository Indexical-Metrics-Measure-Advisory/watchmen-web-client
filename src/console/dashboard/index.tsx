import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../alert/widgets';
import { VerticalMarginOneUnit } from '../../basic-widgets/margin';
import { FullWidthPage } from '../../basic-widgets/page';
import { PageHeaderHolder } from '../../basic-widgets/page-header';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { Router } from '../../routes/types';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { HeaderButtons } from './header-buttons';

const ConsoleDashboardIndex = () => {
	const { dashboardId } = useParams<{ dashboardId: string }>();

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once } = useConsoleEventBus();
	const [ dashboard, setDashboard ] = useState<Dashboard | null>(null);
	useEffect(() => {
		once(ConsoleEventTypes.REPLY_DASHBOARDS, (dashboards: Array<Dashboard>) => {
			// eslint-disable-next-line
			const dashboard = dashboards.find(dashboard => dashboard.dashboardId == dashboardId);
			if (dashboard) {
				setDashboard(dashboard);
			} else {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					history.replace(Router.CONSOLE);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.ERROR.DASHBOARD_NOT_FOUND}</AlertLabel>);
			}
		}).fire(ConsoleEventTypes.ASK_DASHBOARDS);
	}, [ once, onceGlobal, history, dashboardId ]);

	if (!dashboard) {
		return null;
	}

	const onNameChange = (name: string) => {
		dashboard.name = name || dashboard.name;
	}

	return <FullWidthPage>
		<PageHeaderHolder>
			<PageTitleEditor title={dashboard.name} onComplete={onNameChange}/>
			<HeaderButtons/>
		</PageHeaderHolder>
		<VerticalMarginOneUnit/>
	</FullWidthPage>;
};

export default ConsoleDashboardIndex;