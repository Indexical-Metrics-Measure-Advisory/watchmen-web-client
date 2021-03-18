import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { AlertLabel } from '../../../alert/widgets';
import { ICON_AS_ADMIN_HOME } from '../../../basic-widgets/constants';
import { PageHeaderButton } from '../../../basic-widgets/page-header-buttons';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { Lang } from '../../../langs';
import { isAdmin } from '../../../services/account';
import { saveLastSnapshot } from '../../../services/console/last-snapshot';
import { Dashboard } from '../../../services/tuples/dashboard-types';

export const HeaderSetAdminHomeButton = (props: { dashboard: Dashboard }) => {
	const { dashboard } = props;

	const { fire } = useEventBus();

	if (!isAdmin()) {
		return null;
	}

	const onSetClicked = async () => {
		await saveLastSnapshot({ adminDashboardId: dashboard.dashboardId });
		fire(EventTypes.SHOW_ALERT, <AlertLabel>Done.</AlertLabel>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.SET_AS_ADMIN_HOME} onClick={onSetClicked}>
		<FontAwesomeIcon icon={ICON_AS_ADMIN_HOME}/>
	</PageHeaderButton>;
};