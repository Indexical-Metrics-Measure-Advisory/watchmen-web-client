import {Indicator} from '@/services/data/tuples/indicator-types';
import {QueryIndicatorCategoryParams} from '@/services/data/tuples/query-indicator-types';
import {noop} from '@/services/utils';
import {useThrottler} from '@/widgets/throttler';
import {SearchItem, SearchItems, SearchText} from '../../search-text';
import {useSearchTextEventBus} from '../../search-text/search-text-event-bus';
import {SearchTextEventTypes} from '../../search-text/search-text-event-bus-types';
import {useIndicatorsEventBus} from '../indicators-event-bus';
import {IndicatorsEventTypes} from '../indicators-event-bus-types';
import {CategoryContainer, CategoryIndexLabel} from './widgets';

export const CategoryInput = (props: {
	indicator: Indicator;
	index: number;
	name: 'category1' | 'category2' | 'category3';
}) => {
	const {indicator, index, name} = props;

	const {fire} = useIndicatorsEventBus();
	const {fire: fireSearch} = useSearchTextEventBus();
	const saveQueue = useThrottler();
	const save = () => saveQueue.replace(() => {
		fire(IndicatorsEventTypes.SAVE_INDICATOR, indicator, noop);
	}, 500);
	const searchNoX = (prop: 'category1' | 'category2' | 'category3') => async (text: string): Promise<SearchItems<SearchItem>> => {
		indicator[prop] = text.toLowerCase();
		save();
		return new Promise<SearchItems<SearchItem>>(resolve => {
			fire(IndicatorsEventTypes.ASK_INDICATOR_CATEGORY,
				indicator,
				(() => {
					switch (prop) {
						case 'category1':
							return [];
						case 'category2':
							return [indicator.category1].map(x => x ?? '');
						case 'category3':
							return [indicator.category1, indicator.category2].map(x => x ?? '');
					}
				})() as QueryIndicatorCategoryParams,
				(candidates: Array<string>) => {
					resolve((candidates || []).map(candidate => {
						return {key: candidate, text: candidate};
					}));
				}
			);
		});
	};
	const onNoXSelectionChange = (prop: 'category1' | 'category2' | 'category3') => async (item: SearchItem): Promise<string> => {
		indicator[prop] = item.key.toLowerCase();
		save();
		return new Promise(resolve => {
			fireSearch(SearchTextEventTypes.HIDE_POPUP);
			resolve(item.key);
		});
	};

	return <CategoryContainer>
		<CategoryIndexLabel>#{index}</CategoryIndexLabel>
		<SearchText initSearchText={indicator[name] ?? ''} search={searchNoX(name)}
		            onSelectionChange={onNoXSelectionChange(name)}
		            alwaysShowSearchInput={true}
		            hideButton={true}/>
	</CategoryContainer>;
};