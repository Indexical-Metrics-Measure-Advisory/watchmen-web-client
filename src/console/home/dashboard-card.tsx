import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { ICON_DASHBOARD } from '../../basic-widgets/constants';
import { toDashboard } from '../../routes/utils';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { ConnectedSpaceCardContainer, ConnectedSpaceLastVisit, ConnectedSpaceName } from './widgets';

export const DashboardCard = (props: {
	dashboard: Dashboard;
}) => {
	const { dashboard } = props;

	const history = useHistory();

	const onDashboardClicked = () => {
		history.push(toDashboard(dashboard.dashboardId));
	}

	return <ConnectedSpaceCardContainer onClick={onDashboardClicked}>
		<FontAwesomeIcon icon={ICON_DASHBOARD}/>
		<ConnectedSpaceLastVisit>{dashboard.lastVisitTime}</ConnectedSpaceLastVisit>
		<ConnectedSpaceName>{dashboard.name}</ConnectedSpaceName>
	</ConnectedSpaceCardContainer>;
};