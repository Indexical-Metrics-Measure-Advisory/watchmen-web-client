import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DASHBOARD } from '../../basic-widgets/constants';
import { Dashboard } from '../../services/tuples/dashboard-types';
import { ConnectedSpaceCardContainer, ConnectedSpaceLastVisit, ConnectedSpaceName } from './widgets';

export const DashboardCard = (props: {
	dashboard: Dashboard;
}) => {
	const { dashboard } = props;

	return <ConnectedSpaceCardContainer>
		<FontAwesomeIcon icon={ICON_DASHBOARD}/>
		<ConnectedSpaceLastVisit>{dashboard.lastVisitTime}</ConnectedSpaceLastVisit>
		<ConnectedSpaceName>{dashboard.name}</ConnectedSpaceName>
	</ConnectedSpaceCardContainer>;
};