import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {
	CategoryNodes,
	HierarchicalIndicatorCategoryContent,
	INDICATOR_UNCLASSIFIED,
	IndicatorCategoryContent
} from './types';

const asCategoryName = (indicator: Indicator, name: 'category1' | 'category2' | 'category3'): string => {
	return (indicator[name] || '').trim().toLowerCase();
};

const isCategoryGiven = (name: string): boolean => {
	return name.length !== 0;
};

const asCategoryKey = (keys: Array<string>): string => {
	return keys.join(',');
};

const putCategoryIntoCategoryMap = (map: Record<string, IndicatorCategoryContent>, category: IndicatorCategoryContent, keys: [string] | [string, string]) => {
	let key = asCategoryKey(keys);
	const name = isCategoryGiven(keys[keys.length - 1]) ? keys[keys.length - 1] : INDICATOR_UNCLASSIFIED;
	let parent = map[key] as HierarchicalIndicatorCategoryContent;
	if (parent == null) {
		parent = {name, categories: [category], indicators: []} as HierarchicalIndicatorCategoryContent;
		map[key] = parent;
	} else {
		parent.categories = [...parent.categories, category];
	}
	return parent;
};

const putIndicatorIntoCategoryMap = (map: Record<string, IndicatorCategoryContent>, indicator: Indicator, keys: [string] | [string, string] | [string, string, string]) => {
	const key = asCategoryKey(keys);
	const name = isCategoryGiven(keys[keys.length - 1]) ? keys[keys.length - 1] : INDICATOR_UNCLASSIFIED;
	let existing: IndicatorCategoryContent = map[key];
	if (existing == null) {
		if (keys.length === 3) {
			existing = {name, indicators: [indicator]} as IndicatorCategoryContent;
		} else {
			existing = {name, categories: [], indicators: [indicator]} as HierarchicalIndicatorCategoryContent;
		}
		map[key] = existing;
	} else {
		existing.indicators = [...existing.indicators, indicator];
	}
	if (keys.length === 3) {
		const [key1, key2] = keys;
		const l2 = putCategoryIntoCategoryMap(map, existing, [key1, key2]);
		putCategoryIntoCategoryMap(map, l2, [key1]);
	} else if (keys.length === 2) {
		const [key1] = keys;
		putCategoryIntoCategoryMap(map, existing, [key1]);
	}
};

const buildCategoryMap = (indicators: Array<Indicator>) => {
	const map: Record<string, IndicatorCategoryContent> = {};

	indicators.forEach(indicator => {
		const key1 = asCategoryName(indicator, 'category1');
		const key2 = asCategoryName(indicator, 'category2');
		const key3 = asCategoryName(indicator, 'category3');

		if (isCategoryGiven(key3)) {
			// key 3 exists
			putIndicatorIntoCategoryMap(map, indicator, [key1, key2, key3]);
		} else if (isCategoryGiven(key2)) {
			// key 2 exists
			putIndicatorIntoCategoryMap(map, indicator, [key1, key2]);
		} else if (isCategoryGiven(key1)) {
			// key 1 exists
			putIndicatorIntoCategoryMap(map, indicator, [key1]);
		} else {
			// no key
			putIndicatorIntoCategoryMap(map, indicator, ['']);
		}
	});
	return map;
};

export const buildCategoryNodes = (navigation: Navigation, indicators: Array<Indicator>): CategoryNodes => {
	// indicators can be used multiple times
	const categoryMap = buildCategoryMap(indicators);

	return {
		picked: (navigation.indicators || []).map(picked => {
			// eslint-disable-next-line
			return {...picked, indicator: indicators.find(indicator => indicator.indicatorId == picked.indicatorId)};
		}),
		candidates: Object.values(categoryMap).sort(({name: n1}, {name: n2}) => {
			if (n1 === INDICATOR_UNCLASSIFIED) {
				return 1;
			} else if (n2 === INDICATOR_UNCLASSIFIED) {
				return -1;
			} else {
				return n1.localeCompare(n2);
			}
		})
	};
};