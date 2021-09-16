import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {ICON_CONNECTED_SPACE} from '@/basic-widgets/constants';
import {toConnectedSpace} from '@/routes/utils';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {ConnectedSpaceCardContainer, ConnectedSpaceLastVisit, ConnectedSpaceName} from './widgets';

export const ConnectedSpaceCard = (props: {
	connectedSpace: ConnectedSpace;
}) => {
	const {connectedSpace} = props;

	const history = useHistory();

	const onConnectedSpaceClicked = () => {
		history.push(toConnectedSpace(connectedSpace.connectId));
	};

	return <ConnectedSpaceCardContainer onClick={onConnectedSpaceClicked}>
		<FontAwesomeIcon icon={ICON_CONNECTED_SPACE}/>
		<ConnectedSpaceLastVisit>{connectedSpace.lastVisitTime}</ConnectedSpaceLastVisit>
		<ConnectedSpaceName>{connectedSpace.name}</ConnectedSpaceName>
	</ConnectedSpaceCardContainer>;
};