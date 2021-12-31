import {Bucket} from '@/services/data/tuples/bucket-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Topic} from '@/services/data/tuples/topic-types';

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

export interface IndicatorCriteriaDefData {
	loaded: boolean;
	topic?: Topic;
	valueBuckets: Array<Bucket>;
	measureBuckets: Array<Bucket>;
}

export interface IndicatorValues {
	loaded: boolean;
	failed: boolean;
	current?: number;
	previous?: number;
}

export interface CalculatedIndicatorValues {
	/** loaded or not */
	loaded: boolean;
	/** failed on load or not */
	loadFailed: boolean;
	/** calculated or not */
	calculated: boolean;
	/** failed on calculation or not */
	calculateFailed: boolean;
	/** failure reason on calculation */
	calculateFailureReason?: string;
	current?: { value: number, formatted: string };
	previous?: { value: number, formatted: string };
	ratio?: { value: number, formatted: string };
	score?: { value: number, formatted: string };
	shouldComputeScore: boolean;
}

export interface NavigationIndicatorCalculatedValues {
	indicator: NavigationIndicator;
	values: CalculatedIndicatorValues;
}

export type AllCalculatedIndicatorValuesData = Array<NavigationIndicatorCalculatedValues>;

export interface AllCalculatedIndicatorValues {
	data: AllCalculatedIndicatorValuesData;
	calculated: boolean;
	failed: boolean;
	failureReason?: string;
	score?: { value: number, formatted: string };
	shouldComputeScore: boolean;
}

export type AllIndicatedValuesCalculationResult = Pick<AllCalculatedIndicatorValues, 'failed' | 'failureReason' | 'shouldComputeScore' | 'score'>;