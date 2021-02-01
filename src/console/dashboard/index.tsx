import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../alert/widgets';
import { VerticalMarginOneUnit } from '../../basic-widgets/margin';
import { FullWidthPage } from '../../basic-widgets/page';
import { PageHeaderHolder } from '../../basic-widgets/page-header';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useForceUpdate } from '../../basic-widgets/utils';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { Router } from '../../routes/types';
import { toDashboard } from '../../routes/utils';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';
import { HeaderButtons } from './header-buttons';

const DashboardName = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const forceUpdate = useForceUpdate();

	const onNameChange = (name: string) => {
		dashboard.name = name;
		// TODO fire save dashboard
		forceUpdate();
	};

	return <PageTitleEditor title={dashboard.name} onChange={onNameChange}/>;
};
const ConsoleDashboardIndex = () => {
	const { dashboardId } = useParams<{ dashboardId: string }>();

	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once, on, off } = useConsoleEventBus();
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
	useEffect(() => {
		const onDashboardRemoved = (dashboard: Dashboard) => {
			// eslint-disable-next-line
			if (dashboard.dashboardId != dashboardId) {
				return;
			}

			once(ConsoleEventTypes.REPLY_DASHBOARDS, (dashboards: Array<Dashboard>) => {
				// eslint-disable-next-line
				const dashboard = dashboards.sort((d1, d2) => {
					return d1.name.toLowerCase().localeCompare(d2.name.toLowerCase());
					// eslint-disable-next-line
				}).find(dashboard => dashboard.dashboardId != dashboardId);
				if (dashboard) {
					// switch to another one
					history.replace(toDashboard(dashboard.dashboardId));
				} else {
					// no dashboard, to home
					history.replace(Router.CONSOLE_HOME);
				}
			}).fire(ConsoleEventTypes.ASK_DASHBOARDS);
		};
		on(ConsoleEventTypes.DASHBOARD_REMOVED, onDashboardRemoved);
		return () => {
			off(ConsoleEventTypes.DASHBOARD_REMOVED, onDashboardRemoved);
		};
	}, [ once, on, off, history, dashboardId ]);

	if (!dashboard) {
		return null;
	}

	return <FullWidthPage>
		<PageHeaderHolder>
			<DashboardName dashboard={dashboard}/>
			<HeaderButtons dashboard={dashboard}/>
		</PageHeaderHolder>
		<VerticalMarginOneUnit/>
	</FullWidthPage>;
};

export default ConsoleDashboardIndex;