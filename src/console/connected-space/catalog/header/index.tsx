import {ConnectedSpace} from '@/services/data/tuples/connected-space-types';
import {PageHeaderHolder} from '@/widgets/basic/page-header';
import React from 'react';
import {CatalogHeaderButtons} from './catalog-header-buttons';
import {HeaderConnectedSpaceNameEditor} from './header-connected-space-name-editor';

export const CatalogHeader = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <PageHeaderHolder>
		<HeaderConnectedSpaceNameEditor connectedSpace={connectedSpace}/>
		<CatalogHeaderButtons connectedSpace={connectedSpace}/>
	</PageHeaderHolder>;

};