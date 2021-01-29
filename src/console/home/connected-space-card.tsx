import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_CONNECTED_SPACE } from '../../basic-widgets/constants';
import { ConnectedSpace } from '../../services/tuples/connected-space-types';
import { ConnectedSpaceCardContainer, ConnectedSpaceLastVisit, ConnectedSpaceName } from './widgets';

export const ConnectedSpaceCard = (props: {
	connectedSpace: ConnectedSpace;
}) => {
	const { connectedSpace } = props;

	return <ConnectedSpaceCardContainer>
		<FontAwesomeIcon icon={ICON_CONNECTED_SPACE}/>
		<ConnectedSpaceLastVisit>{connectedSpace.lastVisitTime}</ConnectedSpaceLastVisit>
		<ConnectedSpaceName>{connectedSpace.name}</ConnectedSpaceName>
	</ConnectedSpaceCardContainer>;
};