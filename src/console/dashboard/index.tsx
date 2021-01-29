import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { AlertLabel } from '../../alert/widgets';
import { ICON_CHART, ICON_DASHBOARD, ICON_SHARE, ICON_SWITCH, ICON_THROW_AWAY } from '../../basic-widgets/constants';
import { VerticalMarginOneUnit } from '../../basic-widgets/margin';
import { FullWidthPage } from '../../basic-widgets/page';
import { PageHeaderHolder } from '../../basic-widgets/page-header';
import { PageHeaderButton, PageHeaderButtons } from '../../basic-widgets/page-header-buttons';
import { PageTitleEditor } from '../../basic-widgets/page-title-editor';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { Lang } from '../../langs';
import { Router } from '../../routes/types';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { useConsoleEventBus } from '../console-event-bus';
import { ConsoleEventTypes } from '../console-event-bus-types';

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
			<PageHeaderButtons>
				<PageHeaderButton data-title='Share'>
					<FontAwesomeIcon icon={ICON_SHARE}/>
				</PageHeaderButton>
				<PageHeaderButton data-title='Add Report'>
					<FontAwesomeIcon icon={ICON_CHART}/>
				</PageHeaderButton>
				<PageHeaderButton data-title='Add Dashboard'>
					<FontAwesomeIcon icon={ICON_DASHBOARD}/>
				</PageHeaderButton>
				<PageHeaderButton data-title='Switch Dashboard'>
					<FontAwesomeIcon icon={ICON_SWITCH}/>
				</PageHeaderButton>
				<PageHeaderButton data-title='Delete Me'>
					<FontAwesomeIcon icon={ICON_THROW_AWAY}/>
				</PageHeaderButton>
			</PageHeaderButtons>
		</PageHeaderHolder>
		<VerticalMarginOneUnit/>
	</FullWidthPage>;
};

export default ConsoleDashboardIndex;