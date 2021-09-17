import {isAdmin} from '@/services/data/account';
import {saveLastSnapshot} from '@/services/data/account/last-snapshot';
import {Dashboard} from '@/services/data/tuples/dashboard-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_AS_ADMIN_HOME} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';

export const HeaderSetAdminHomeButton = (props: { dashboard: Dashboard }) => {
	const {dashboard} = props;

	const {fire} = useEventBus();

	if (!isAdmin()) {
		return null;
	}

	const onSetClicked = async () => {
		await saveLastSnapshot({adminDashboardId: dashboard.dashboardId});
		fire(EventTypes.SHOW_ALERT, <AlertLabel>Done.</AlertLabel>);
	};

	return <PageHeaderButton tooltip={Lang.CONSOLE.DASHBOARD.SET_AS_ADMIN_HOME} onClick={onSetClicked}>
		<FontAwesomeIcon icon={ICON_AS_ADMIN_HOME}/>
	</PageHeaderButton>;
};