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
	/** leave empty when no aggregation arithmetic applied */
	aggregateArithmetics?: IndicatorAggregateArithmetic;
	criteria: Array<NavigationIndicatorCriteria>;
}

export interface Navigation extends Tuple {
	navigationId: NavigationId;
	name: string;
	description?: string;
	indicators: Array<NavigationIndicator>;
	tenantId?: TenantId;
}
