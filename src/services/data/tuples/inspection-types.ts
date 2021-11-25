import {IndicatorId} from './indicator-types';
import {TenantId} from './tenant-types';
import {Tuple} from './tuple-types';

export type InspectionId = string;

export interface Inspection extends Tuple {
	inspectionId: InspectionId;
	name: string;
	indicatorId: IndicatorId;
	tenantId?: TenantId;
}