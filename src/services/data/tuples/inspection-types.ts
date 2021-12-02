import {BucketId} from './bucket-types';
import {FactorId} from './factor-types';
import {IndicatorAggregateArithmetic, IndicatorId, MeasureMethod} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type InspectionId = string;

export enum InspectMeasureOn {
	VALUE = 'value',
	OTHER = 'other'
}

export interface Inspection extends Tuple {
	inspectionId: InspectionId;
	name: string;
	indicatorId: IndicatorId;
	/** indicator value aggregate arithmetic */
	aggregateArithmetics?: Array<IndicatorAggregateArithmetic>;
	/** measure on indicator value or other factor */
	measureOn?: InspectMeasureOn;
	/** if measure on factor, factor id must be given */
	measureOnFactorId?: FactorId;
	/** bucket for any measure on type, or no bucket also allowed if measure on factor rather than indicator value */
	measureOnBucketId?: BucketId;
	/** time factor which used to filter data */
	timeFactorId?: FactorId;
	/**
	 * time measure on factor.
	 */
	timeMeasure?: MeasureMethod;
	tenantId?: TenantId;
}