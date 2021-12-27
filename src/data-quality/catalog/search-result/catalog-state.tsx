import {Catalog} from '@/services/data/tuples/catalog-types';
import {Fragment, useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';

export const CatalogState = () => {
	const {on, off} = useCatalogEventBus();
	const [catalogs] = useState<Array<Catalog>>([]);
	useEffect(() => {
		const onCatalogChanged = (catalog: Catalog) => {
			if (!catalogs.includes(catalog)) {
				catalogs.push(catalog);
			}
		};
		on(CatalogEventTypes.CATALOG_CHANGED, onCatalogChanged);
		on(CatalogEventTypes.DO_CREATE_CATALOG, onCatalogChanged);
		return () => {
			off(CatalogEventTypes.CATALOG_CHANGED, onCatalogChanged);
			off(CatalogEventTypes.DO_CREATE_CATALOG, onCatalogChanged);
		};
	}, [on, off, catalogs]);
	useEffect(() => {
		const onCatalogSaved = (catalog: Catalog) => {
			const index = catalogs.indexOf(catalog);
			if (index !== -1) {
				catalogs.splice(index, 1);
			}
		};
		on(CatalogEventTypes.CATALOG_SAVED, onCatalogSaved);
		on(CatalogEventTypes.CATALOG_DELETED, onCatalogSaved);
		return () => {
			off(CatalogEventTypes.CATALOG_SAVED, onCatalogSaved);
			off(CatalogEventTypes.CATALOG_DELETED, onCatalogSaved);
		};
	}, [on, off, catalogs]);
	useEffect(() => {
		const onClearCatalogState = () => {
			catalogs.length = 0;
		};
		on(CatalogEventTypes.CLEAR_CATALOG_STATE, onClearCatalogState);
		return () => {
			off(CatalogEventTypes.CLEAR_CATALOG_STATE, onClearCatalogState);
		};
	}, [on, off, catalogs]);
	useEffect(() => {
		const onAskCatalogChanged = (onData: (changed: boolean) => void) => {
			onData(catalogs.length !== 0);
		};
		on(CatalogEventTypes.ASK_CATALOG_CHANGED, onAskCatalogChanged);
		return () => {
			off(CatalogEventTypes.ASK_CATALOG_CHANGED, onAskCatalogChanged);
		};
	}, [on, off, catalogs]);

	return <Fragment/>;
};