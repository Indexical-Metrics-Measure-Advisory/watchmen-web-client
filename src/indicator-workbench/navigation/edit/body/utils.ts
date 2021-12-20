import {Indicator} from '@/services/data/tuples/indicator-types';
import {
	Navigation,
	NavigationIndicator,
	NavigationIndicatorCriteriaOperator
} from '@/services/data/tuples/navigation-types';
import {
	isNavigationIndicatorCriteriaOnBucket,
	isNavigationIndicatorCriteriaOnExpression
} from '@/services/data/tuples/navigation-utils';
import {Lang} from '@/widgets/langs';
import {
	CurveRect,
	HierarchicalIndicatorCategoryContent,
	INDICATOR_UNCLASSIFIED,
	IndicatorCategoryContent,
	IndicatorCriteriaDefData
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

const putCategoryIntoCategoryMap = (map: Record<string, IndicatorCategoryContent>, category: IndicatorCategoryContent, keys: [string] | [string, string]): HierarchicalIndicatorCategoryContent => {
	let key = asCategoryKey(keys);
	const name = isCategoryGiven(keys[keys.length - 1]) ? keys[keys.length - 1] : INDICATOR_UNCLASSIFIED;
	let parent = map[key] as HierarchicalIndicatorCategoryContent;
	if (parent == null) {
		parent = {name, categories: [category], indicators: []} as HierarchicalIndicatorCategoryContent;
		map[key] = parent;
	} else {
		const existing = parent.categories.find(c => c.name === category.name);
		if (existing != null) {
			// ignore, already added
		} else {
			parent.categories = [...parent.categories, category];
		}
	}
	return parent;
};

/**
 * return the level 1 category content
 */
const putIndicatorIntoCategoryMap = (map: Record<string, IndicatorCategoryContent>, indicator: Indicator, keys: [string] | [string, string] | [string, string, string]): HierarchicalIndicatorCategoryContent => {
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
		return putCategoryIntoCategoryMap(map, l2, [key1]);
	} else if (keys.length === 2) {
		const [key1] = keys;
		return putCategoryIntoCategoryMap(map, existing, [key1]);
	} else {
		return existing as HierarchicalIndicatorCategoryContent;
	}
};

const buildCategoryMap = (indicators: Array<Indicator>): Array<IndicatorCategoryContent> => {
	const map: Record<string, IndicatorCategoryContent> = {};

	return [...new Set(indicators.map(indicator => {
		const key1 = asCategoryName(indicator, 'category1');
		const key2 = asCategoryName(indicator, 'category2');
		const key3 = asCategoryName(indicator, 'category3');

		if (isCategoryGiven(key3)) {
			// key 3 exists
			return putIndicatorIntoCategoryMap(map, indicator, [key1, key2, key3]);
		} else if (isCategoryGiven(key2)) {
			// key 2 exists
			return putIndicatorIntoCategoryMap(map, indicator, [key1, key2]);
		} else if (isCategoryGiven(key1)) {
			// key 1 exists
			return putIndicatorIntoCategoryMap(map, indicator, [key1]);
		} else {
			// no key
			return putIndicatorIntoCategoryMap(map, indicator, ['']);
		}
	}))];
};

export const buildCategoryNodes = (indicators: Array<Indicator>): Array<IndicatorCategoryContent> => {
	// indicators can be used multiple times
	const categoryMap = buildCategoryMap(indicators);

	return Object.values(categoryMap).sort(({name: n1}, {name: n2}) => {
		if (n1 === INDICATOR_UNCLASSIFIED) {
			return 1;
		} else if (n2 === INDICATOR_UNCLASSIFIED) {
			return -1;
		} else {
			return n1.localeCompare(n2);
		}
	});
};

export const isCurveChanged = (curve: CurveRect, newCurve: CurveRect): boolean => {
	return curve.top !== newCurve.top || curve.width !== newCurve.width || curve.height !== newCurve.height
		|| curve.startX !== newCurve.startX || curve.startY !== newCurve.startY
		|| curve.endX !== newCurve.endX || curve.endY !== newCurve.endY;
};

export const computeCurvePath = (points: { startX: number; startY: number; endX: number; endY: number }): string => {
	const {startX, startY, endX, endY} = points;
	return `M${startX},${startY} C${endX},${startY} ${(startX)},${endY} ${endX},${endY}`;
};

export const CriteriaArithmeticLabel: Record<NavigationIndicatorCriteriaOperator, string> = {
	[NavigationIndicatorCriteriaOperator.EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.EQUALS,
	[NavigationIndicatorCriteriaOperator.NOT_EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.NOT_EQUALS,
	[NavigationIndicatorCriteriaOperator.LESS]: Lang.PARAMETER.EXPRESSION_OPERATOR.LESS,
	[NavigationIndicatorCriteriaOperator.LESS_EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.LESS_EQUALS,
	[NavigationIndicatorCriteriaOperator.MORE]: Lang.PARAMETER.EXPRESSION_OPERATOR.MORE,
	[NavigationIndicatorCriteriaOperator.MORE_EQUALS]: Lang.PARAMETER.EXPRESSION_OPERATOR.MORE_EQUALS
};

export const isReadyToCalculation = (navigation: Navigation, navigationIndicator: NavigationIndicator, defData: IndicatorCriteriaDefData): boolean => {
	if (!defData.loaded) {
		return false;
	}

	if (defData.loaded && defData.topic == null) {
		return false;
	}

	if ((navigationIndicator.criteria || []).length === 0) {
		return false;
	}

	return (navigationIndicator.criteria || []).every(criteria => {
		if (criteria.factorId == null) {
			return false;
		}
		if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
			return criteria.bucketSegmentName != null;
		} else if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
			return true;
		}

		return false;
	});
};
