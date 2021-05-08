import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {AlertLabel} from '../../alert/widgets';
import {FullWidthPage} from '../../basic-widgets/page';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {Lang} from '../../langs';
import {Router} from '../../routes/types';
import {toDashboard} from '../../routes/utils';
import {Dashboard} from '../../services/tuples/dashboard-types';
import {useConsoleEventBus} from '../console-event-bus';
import {ConsoleEventTypes} from '../console-event-bus-types';
import {DashboardBody} from './body';
import {DashboardEventBusProvider} from './dashboard-event-bus';
import {DashboardHeader} from './header';

const ConsoleDashboardIndex = () => {
    const {dashboardId} = useParams<{ dashboardId: string }>();

    const history = useHistory();
    const {once: onceGlobal} = useEventBus();
    const {once, on, off} = useConsoleEventBus();
    const [dashboard, setDashboard] = useState<Dashboard | null>(null);
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
    }, [once, onceGlobal, history, dashboardId]);
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
    }, [once, on, off, history, dashboardId]);

    // eslint-disable-next-line
    if (!dashboard || dashboard.dashboardId != dashboardId) {
        return null;
    }

    return <DashboardEventBusProvider>
        <FullWidthPage>
            <DashboardHeader dashboard={dashboard}/>
            {/*<VerticalMarginOneUnit/>*/}
            <DashboardBody dashboard={dashboard}/>
        </FullWidthPage>
    </DashboardEventBusProvider>;
};

export default ConsoleDashboardIndex;