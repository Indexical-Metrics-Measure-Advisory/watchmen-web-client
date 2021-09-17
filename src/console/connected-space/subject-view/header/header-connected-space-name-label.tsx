import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import React from 'react';
import {ConnectedSpaceNameLabel} from './widgets';

export const HeaderConnectedSpaceNameLabel = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <ConnectedSpaceNameLabel>@ {connectedSpace.name}</ConnectedSpaceNameLabel>;
};
