import {BucketId} from '@/services/data/tuples/bucket-types';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {Inspection, InspectionId} from '@/services/data/tuples/inspection-types';
import {QueryBucket, QueryByBucketMethod} from '@/services/data/tuples/query-bucket-types';
import {EnumForIndicator, QueryIndicator, TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';

export interface IndicatorForInspection {
	indicator: Indicator;
	topic: TopicForIndicator;
	enums: Array<EnumForIndicator>;
}

export interface AskBucketsParams {
	valueBucketIds: Array<BucketId>;
	measureMethods: Array<QueryByBucketMethod>;
}

export enum InspectionEventTypes {
	ASK_INSPECTIONS = 'ask-inspections',
	ASK_INSPECTION = 'ask-inspection',
	ASK_INDICATORS = 'ask-indicators',
	ASK_INDICATOR = 'ask-indicator',
	ASK_BUCKETS = 'ask-buckets',

	INSPECTION_PICKED = 'inspection-picked',
	INDICATOR_PICKED = 'indicator-picked',

	SAVE_INSPECTION = 'save-inspection',
	INSPECTION_SAVED = 'inspection-saved'
}

export interface InspectionEventBus {
	fire(type: InspectionEventTypes.ASK_INSPECTIONS, onData: (inspections: Array<QueryInspection>) => void): this;
	on(type: InspectionEventTypes.ASK_INSPECTIONS, listener: (onData: (inspections: Array<QueryInspection>) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INSPECTIONS, listener: (onData: (inspections: Array<QueryInspection>) => void) => void): this;

	fire(type: InspectionEventTypes.ASK_INSPECTION, inspectionId: InspectionId, onData: (inspection: Inspection) => void): this;
	on(type: InspectionEventTypes.ASK_INSPECTION, listener: (inspectionId: InspectionId, onData: (inspection: Inspection) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INSPECTION, listener: (inspectionId: InspectionId, onData: (inspection: Inspection) => void) => void): this;

	fire(type: InspectionEventTypes.ASK_INDICATORS, onData: (indicators: Array<QueryIndicator>) => void): this;
	on(type: InspectionEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<QueryIndicator>) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INDICATORS, listener: (onData: (indicators: Array<QueryIndicator>) => void) => void): this;

	fire(type: InspectionEventTypes.ASK_INDICATOR, indicatorId: IndicatorId, onData: (indicator: IndicatorForInspection) => void): this;
	on(type: InspectionEventTypes.ASK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (indicator: IndicatorForInspection) => void) => void): this;
	off(type: InspectionEventTypes.ASK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (indicator: IndicatorForInspection) => void) => void): this;

	fire(type: InspectionEventTypes.ASK_BUCKETS, params: AskBucketsParams, onData: (buckets: Array<QueryBucket>) => void): this;
	on(type: InspectionEventTypes.ASK_BUCKETS, listener: (params: AskBucketsParams, onData: (buckets: Array<QueryBucket>) => void) => void): this;
	off(type: InspectionEventTypes.ASK_BUCKETS, listener: (params: AskBucketsParams, onData: (buckets: Array<QueryBucket>) => void) => void): this;

	fire(type: InspectionEventTypes.INSPECTION_PICKED, inspection: Inspection, indicator?: IndicatorForInspection): this;
	on(type: InspectionEventTypes.INSPECTION_PICKED, listener: (inspection: Inspection, indicator?: IndicatorForInspection) => void): this;
	off(type: InspectionEventTypes.INSPECTION_PICKED, listener: (inspection: Inspection, indicator?: IndicatorForInspection) => void): this;

	fire(type: InspectionEventTypes.INDICATOR_PICKED, indicator: IndicatorForInspection): this;
	on(type: InspectionEventTypes.INDICATOR_PICKED, listener: (indicator: IndicatorForInspection) => void): this;
	off(type: InspectionEventTypes.INDICATOR_PICKED, listener: (indicator: IndicatorForInspection) => void): this;

	fire(type: InspectionEventTypes.SAVE_INSPECTION, inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void): this;
	on(type: InspectionEventTypes.SAVE_INSPECTION, listener: (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => void): this;
	off(type: InspectionEventTypes.SAVE_INSPECTION, listener: (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => void): this;

	fire(type: InspectionEventTypes.INSPECTION_SAVED, inspection: Inspection): this;
	on(type: InspectionEventTypes.INSPECTION_SAVED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.INSPECTION_SAVED, listener: (inspection: Inspection) => void): this;
}