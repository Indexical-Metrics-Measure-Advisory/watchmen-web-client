import {BucketId} from './bucket-types';
import {FactorId} from './factor-types';
import {IndicatorAggregateArithmetic, IndicatorId} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type NavigationId = string;

export interface NavigationIndicatorCriteria {
	factorId?: FactorId;
}

/** fill when use predefined bucket */
export interface NavigationIndicatorCriteriaOnBucket extends NavigationIndicatorCriteria {
	bucketId?: BucketId;
	bucketSegmentName?: string;
}

export enum NavigationIndicatorCriteriaOperator {
	EQUALS = 'equals',
	NOT_EQUALS = 'not-equals',
	LESS = 'less',
	LESS_EQUALS = 'less-equals',
	MORE = 'more',
	MORE_EQUALS = 'more-equals',
}

export interface NavigationIndicatorCriteriaOnExpression extends NavigationIndicatorCriteria {
	operator?: NavigationIndicatorCriteriaOperator;
	value?: string;
}

export interface NavigationIndicator {
	indicatorId: IndicatorId;
	name: string;
	/** use sum when no aggregation arithmetic applied */
	aggregateArithmetic: IndicatorAggregateArithmetic;
	/** to compute score */
	formula?: string;
	/**
	 * if there is a score computed, should be included in final score or not.
	 * default true
	 */
	includeInFinalScore?: boolean;
	criteria: Array<NavigationIndicatorCriteria>;
	/**
	 * used to call by other indicators,
	 * create variable name when it is added into navigation,
	 * and will not be changed in anytime
	 */
	variableName?: string;
}

export const MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID = '-1';

/**
 * for manual compute indicator,
 * 1. indicatorId fixed as {@link MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID},
 * 2. aggregateArithmetics fixed as {@link IndicatorAggregateArithmetic#MAX}, will be ignored anyway in runtime
 * 3. criteria fixed as zero length array, will be ignored anyway in runtime
 */
export interface ManualComputeNavigationIndicator extends NavigationIndicator {
	indicatorId: typeof MANUAL_COMPUTE_NAVIGATION_INDICATOR_ID;
	aggregateArithmetic: IndicatorAggregateArithmetic.MAX;
	criteria: [];
}

export enum NavigationTimeRangeType {
	YEAR = 'year',
	MONTH = 'month'
}

export interface Navigation extends Tuple {
	navigationId: NavigationId;
	name: string;
	description?: string;
	timeRangeType: NavigationTimeRangeType;
	timeRangeYear: string;
	timeRangeMonth?: string;
	compareWithPreviousTimeRange: boolean;
	indicators: Array<NavigationIndicator>;
	tenantId?: TenantId;
}
