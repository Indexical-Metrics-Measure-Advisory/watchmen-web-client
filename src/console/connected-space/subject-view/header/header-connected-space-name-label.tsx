import React from 'react';
import {ConnectedSpace} from '@/services/tuples/connected-space-types';
import {ConnectedSpaceNameLabel} from './widgets';

export const HeaderConnectedSpaceNameLabel = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <ConnectedSpaceNameLabel>@ {connectedSpace.name}</ConnectedSpaceNameLabel>;
};
