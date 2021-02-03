import React from 'react';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { CatalogContainer } from './widgets';

export const Catalog = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	return <CatalogContainer>

	</CatalogContainer>;
};