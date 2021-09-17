import {toDashboard} from '@/routes/utils';
import {saveDashboard} from '@/services/data/tuples/dashboard';
import {ICON_DASHBOARD} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {createDashboard} from '../../utils/tuples';

export const HeaderCreateDashboardButton = () => {
	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useConsoleEventBus();

	const onCreateDashboardClicked = async () => {
		const dashboard = createDashboard();

		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveDashboard(dashboard),
			() => {
				fire(ConsoleEventTypes.DASHBOARD_CREATED, dashboard);
				history.push(toDashboard(dashboard.dashboardId));
			});
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.ADD_DASHBOARD} onClick={onCreateDashboardClicked}>
		<FontAwesomeIcon icon={ICON_DASHBOARD}/>
	</PageHeaderButton>;
};