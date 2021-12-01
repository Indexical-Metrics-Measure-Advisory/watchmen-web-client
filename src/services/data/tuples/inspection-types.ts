import {BucketId} from './bucket-types';
import {FactorId} from './factor-types';
import {IndicatorId} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type InspectionId = string;

export enum InspectValueOn {
	VALUE_COUNT = 'value-count',
	VALUE_SUM = 'value-sum',
	VALUE_AVG = 'value-avg',
	VALUE_MAX = 'value-max',
	VALUE_MIN = 'value-min'
}

export interface Inspection extends Tuple {
	inspectionId: InspectionId;
	name: string;
	indicatorId: IndicatorId;
	valueOn?: InspectValueOn;
	measureFactorId?: FactorId;
	bucket?: BucketId;
	tenantId?: TenantId;
}