import {Indicator} from '@/services/data/tuples/indicator-types';
import {NavigationIndicator} from '@/services/data/tuples/navigation-types';

export interface NavigationBlockPosition {
	top: number;
	left: number;
}

export interface NavigationBlockSize {
	width: number;
	height: number;
}

export interface NavigationBlockRect extends NavigationBlockPosition, NavigationBlockSize {
}

export const INDICATOR_UNCLASSIFIED = '&unclassified';

export interface IndicatorCategoryContent {
	name: string;
	indicators: Array<Indicator>;
}

// level 1 & 2
export interface HierarchicalIndicatorCategoryContent extends IndicatorCategoryContent {
	categories: Array<IndicatorCategoryContent>;
}

export interface IndicatorNodeContent {
	id: string;
	nav: NavigationIndicator;
	indicator?: Indicator;
}

export interface CurveRect {
	top: number;
	width: number;
	height: number;
	startX: number;
	startY: number;
	endX: number;
	endY: number;
}