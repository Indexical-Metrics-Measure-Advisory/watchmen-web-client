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
	aggregateArithmetics: IndicatorAggregateArithmetic;
	formula?: string;
	criteria: Array<NavigationIndicatorCriteria>;
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
