import {fetchCatalogs} from '@/services/data/tuples/catalog';
import {Catalog} from '@/services/data/tuples/catalog-types';
import {CatalogCriteria} from '@/services/data/tuples/query-catalog-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {CatalogRow} from './catalog';
import {CatalogState} from './catalog-state';
import {
	NoData,
	SearchResultBody,
	SearchResultContainer,
	SearchResultHeader,
	SearchResultHeaderCell,
	SearchResultHeaderSeqCell,
	SearchResultTargetLabel
} from './widgets';

export const SearchResult = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire, on, off} = useCatalogEventBus();
	const [catalogs, setCatalogs] = useState<Array<Catalog>>([]);
	useEffect(() => {
		const onSearch = async (criteria: CatalogCriteria) => {
			const shouldAsk = await new Promise<boolean>(resolve => {
				if (catalogs.length === 0) {
					resolve(true);
				} else {
					fire(CatalogEventTypes.ASK_CATALOG_CHANGED, (changed: boolean) => {
						if (changed) {
							// some catalogs are changed
							fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
								'Data is changed, are you sure to discard them and load another?',
								() => {
									fireGlobal(EventTypes.HIDE_DIALOG);
									fire(CatalogEventTypes.CLEAR_CATALOG_STATE);
									resolve(true);
								},
								() => {
									fireGlobal(EventTypes.HIDE_DIALOG);
									resolve(false);
								});
						} else {
							// no changed catalog
							resolve(true);
						}
					});
				}
			});
			if (!shouldAsk) {
				return;
			}

			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchCatalogs(criteria),
				(data: Array<Catalog>) => setCatalogs(data));
		};
		on(CatalogEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(CatalogEventTypes.DO_SEARCH, onSearch);
		};
	}, [fire, on, off, fireGlobal, catalogs.length]);

	return <SearchResultContainer>
		<CatalogState/>
		<SearchResultTargetLabel>
			<span>Catalogs</span>
		</SearchResultTargetLabel>
		<SearchResultHeader>
			<SearchResultHeaderSeqCell>#</SearchResultHeaderSeqCell>
			<SearchResultHeaderCell>Name</SearchResultHeaderCell>
			<SearchResultHeaderCell>Topic Count</SearchResultHeaderCell>
			<SearchResultHeaderCell>Technical Owner</SearchResultHeaderCell>
			<SearchResultHeaderCell>Business Owner</SearchResultHeaderCell>
			<SearchResultHeaderCell/>
		</SearchResultHeader>
		<SearchResultBody>
			{catalogs.length === 0
				? <NoData>No catalogs found.</NoData>
				: catalogs.map((catalog, index) => {
					return <CatalogRow catalog={catalog} index={index + 1} key={catalog.catalogId}/>;
				})}
		</SearchResultBody>
	</SearchResultContainer>;
};