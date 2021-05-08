import React from 'react';
import {CatalogBody} from './body';
import {CatalogEventBusProvider} from './catalog-event-bus';
import {CatalogHeader} from './header';

export const PipelinesCatalog = () => {
	return <CatalogEventBusProvider>
		<CatalogHeader/>
		<CatalogBody/>
	</CatalogEventBusProvider>;
};