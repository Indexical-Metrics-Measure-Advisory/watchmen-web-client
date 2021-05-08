import React from 'react';
import {PageHeaderHolder} from '../../../../basic-widgets/page-header';
import {ConnectedSpace} from '../../../../services/tuples/connected-space-types';
import {CatalogHeaderButtons} from './catalog-header-buttons';
import {HeaderConnectedSpaceNameEditor} from './header-connected-space-name-editor';

export const CatalogHeader = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <PageHeaderHolder>
		<HeaderConnectedSpaceNameEditor connectedSpace={connectedSpace}/>
		<CatalogHeaderButtons connectedSpace={connectedSpace}/>
	</PageHeaderHolder>;

};