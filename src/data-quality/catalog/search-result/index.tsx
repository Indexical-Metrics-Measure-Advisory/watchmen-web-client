import {fetchCatalogs} from '@/services/data/tuples/catalog';
import {Catalog} from '@/services/data/tuples/catalog-types';
import {CatalogCriteria} from '@/services/data/tuples/query-catalog-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {
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
	const [state, setState] = useState<Array<Catalog>>([]);
	useEffect(() => {
		const onSearch = async (criteria: CatalogCriteria) => {
			fire(CatalogEventTypes.ASK_CATALOG_CHANGED, (changed) => {
				if (changed) {
					fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
						'Data is changed, are you sure to discard them and load another?',
						() => {
							fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
								async () => await fetchCatalogs(criteria),
								(data: Array<Catalog>) => setState(data));
							fireGlobal(EventTypes.HIDE_DIALOG);
						},
						() => fireGlobal(EventTypes.HIDE_DIALOG));
				} else {
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await fetchCatalogs(criteria),
						(data: Array<Catalog>) => setState(data));
				}
			});
		};
		on(CatalogEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(CatalogEventTypes.DO_SEARCH, onSearch);
		};
	}, [fire, on, off, fireGlobal]);

	return <SearchResultContainer>
		<SearchResultTargetLabel>
			<span>Catalogs</span>
		</SearchResultTargetLabel>
		<SearchResultHeader>
			<SearchResultHeaderSeqCell>#</SearchResultHeaderSeqCell>
			<SearchResultHeaderCell>Name</SearchResultHeaderCell>
			<SearchResultHeaderCell>Topic Count</SearchResultHeaderCell>
			<SearchResultHeaderCell>Technical Owner</SearchResultHeaderCell>
			<SearchResultHeaderCell>Business Owner</SearchResultHeaderCell>
		</SearchResultHeader>
		<SearchResultBody>
			{/*<TopicRules topic={state.topic!} rules={state.rules}/>*/}
		</SearchResultBody>
	</SearchResultContainer>;
};