import {BucketId} from './bucket-types';
import {FactorId} from './factor-types';
import {IndicatorAggregateArithmetic, IndicatorId} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type NavigationId = string;

export interface NavigationIndicator {
	indicatorId: IndicatorId;
	factorId?: FactorId;
	bucketId?: BucketId;

	aggregateArithmetics?: IndicatorAggregateArithmetic;
}

export interface Navigation extends Tuple {
	navigationId: NavigationId;
	name: string;
	description?: string;
	indicators: Array<NavigationIndicator>;
	tenantId?: TenantId;
}
