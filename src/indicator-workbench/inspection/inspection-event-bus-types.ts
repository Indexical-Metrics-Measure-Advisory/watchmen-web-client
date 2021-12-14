import {BucketId} from '@/services/data/tuples/bucket-types';
import {Enum, EnumId} from '@/services/data/tuples/enum-types';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {Inspection, InspectionId} from '@/services/data/tuples/inspection-types';
import {QueryBucket, QueryByBucketMethod} from '@/services/data/tuples/query-bucket-types';
import {EnumForIndicator, QueryIndicator, TopicForIndicator} from '@/services/data/tuples/query-indicator-types';
import {QueryInspection} from '@/services/data/tuples/query-inspection-types';
import {RowOfAny} from '@/services/data/types';
import {Columns} from './types';

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
	ASK_ENUM = 'ask-enum',

	INSPECTION_PICKED = 'inspection-picked',
	INDICATOR_PICKED = 'indicator-picked',

	AGGREGATE_ARITHMETIC_CHANGED = 'aggregate_arithmetic_changed',

	BUCKET_ON_CHANGED = 'bucket-on-changed',

	TIME_RANGE_ON_CHANGED = 'time-range-on-changed',
	TIME_RANGE_VALUES_CHANGED = 'time-range-values-changed',

	TIME_MEASURE_CHANGED = 'time-measure-changed',

	REFRESH_DATA = 'refresh-data',
	DATA_LOADED = 'data-loaded',
	DISPLAY_DATA_READY = 'display-data-ready',

	SAVE_INSPECTION = 'save-inspection',
	INSPECTION_SAVED = 'inspection-saved',

	CLEAR_INSPECTION = 'clear-inspection',
	INSPECTION_CLEARED = 'inspection-cleared',

	SET_DATA_GRID_VISIBILITY = 'set-data-grid-visibility',
	SET_CHARTS_VISIBILITY = 'set-charts-visibility'
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

	fire(type: InspectionEventTypes.ASK_ENUM, enumId: EnumId, onData: (enumeration?: Enum) => void): this;
	on(type: InspectionEventTypes.ASK_ENUM, listener: (enumId: EnumId, onData: (enumeration?: Enum) => void) => void): this;
	off(type: InspectionEventTypes.ASK_ENUM, listener: (enumId: EnumId, onData: (enumeration?: Enum) => void) => void): this;

	fire(type: InspectionEventTypes.INSPECTION_PICKED, inspection: Inspection, indicator?: IndicatorForInspection): this;
	on(type: InspectionEventTypes.INSPECTION_PICKED, listener: (inspection: Inspection, indicator?: IndicatorForInspection) => void): this;
	off(type: InspectionEventTypes.INSPECTION_PICKED, listener: (inspection: Inspection, indicator?: IndicatorForInspection) => void): this;

	fire(type: InspectionEventTypes.INDICATOR_PICKED, indicator: IndicatorForInspection): this;
	on(type: InspectionEventTypes.INDICATOR_PICKED, listener: (indicator: IndicatorForInspection) => void): this;
	off(type: InspectionEventTypes.INDICATOR_PICKED, listener: (indicator: IndicatorForInspection) => void): this;

	fire(type: InspectionEventTypes.AGGREGATE_ARITHMETIC_CHANGED, inspection: Inspection): this;
	on(type: InspectionEventTypes.AGGREGATE_ARITHMETIC_CHANGED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.AGGREGATE_ARITHMETIC_CHANGED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.BUCKET_ON_CHANGED, inspection: Inspection): this;
	on(type: InspectionEventTypes.BUCKET_ON_CHANGED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.BUCKET_ON_CHANGED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.TIME_RANGE_ON_CHANGED, inspection: Inspection): this;
	on(type: InspectionEventTypes.TIME_RANGE_ON_CHANGED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.TIME_RANGE_ON_CHANGED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, inspection: Inspection): this;
	on(type: InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.TIME_RANGE_VALUES_CHANGED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.TIME_MEASURE_CHANGED, inspection: Inspection): this;
	on(type: InspectionEventTypes.TIME_MEASURE_CHANGED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.TIME_MEASURE_CHANGED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.REFRESH_DATA, inspection: Inspection): this;
	on(type: InspectionEventTypes.REFRESH_DATA, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.REFRESH_DATA, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.DATA_LOADED, inspection: Inspection, data: Array<RowOfAny>): this;
	on(type: InspectionEventTypes.DATA_LOADED, listener: (inspection: Inspection, data: Array<RowOfAny>) => void): this;
	off(type: InspectionEventTypes.DATA_LOADED, listener: (inspection: Inspection, data: Array<RowOfAny>) => void): this;

	fire(type: InspectionEventTypes.DISPLAY_DATA_READY, inspection: Inspection, data: Array<RowOfAny>, buckets: Array<QueryBucket>, columns: Columns): this;
	on(type: InspectionEventTypes.DISPLAY_DATA_READY, listener: (inspection: Inspection, data: Array<RowOfAny>, buckets: Array<QueryBucket>, columns: Columns) => void): this;
	off(type: InspectionEventTypes.DISPLAY_DATA_READY, listener: (inspection: Inspection, data: Array<RowOfAny>, buckets: Array<QueryBucket>, columns: Columns) => void): this;

	fire(type: InspectionEventTypes.SAVE_INSPECTION, inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void): this;
	on(type: InspectionEventTypes.SAVE_INSPECTION, listener: (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => void): this;
	off(type: InspectionEventTypes.SAVE_INSPECTION, listener: (inspection: Inspection, onSaved: (inspection: Inspection, saved: boolean) => void) => void): this;

	fire(type: InspectionEventTypes.INSPECTION_SAVED, inspection: Inspection): this;
	on(type: InspectionEventTypes.INSPECTION_SAVED, listener: (inspection: Inspection) => void): this;
	off(type: InspectionEventTypes.INSPECTION_SAVED, listener: (inspection: Inspection) => void): this;

	fire(type: InspectionEventTypes.CLEAR_INSPECTION): this;
	on(type: InspectionEventTypes.CLEAR_INSPECTION, listener: () => void): this;
	off(type: InspectionEventTypes.CLEAR_INSPECTION, listener: () => void): this;

	fire(type: InspectionEventTypes.INSPECTION_CLEARED): this;
	on(type: InspectionEventTypes.INSPECTION_CLEARED, listener: () => void): this;
	off(type: InspectionEventTypes.INSPECTION_CLEARED, listener: () => void): this;

	fire(type: InspectionEventTypes.SET_DATA_GRID_VISIBILITY, inspection: Inspection, visible: boolean): this;
	on(type: InspectionEventTypes.SET_DATA_GRID_VISIBILITY, listener: (inspection: Inspection, visible: boolean) => void): this;
	off(type: InspectionEventTypes.SET_DATA_GRID_VISIBILITY, listener: (inspection: Inspection, visible: boolean) => void): this;

	fire(type: InspectionEventTypes.SET_CHARTS_VISIBILITY, inspection: Inspection, visible: boolean): this;
	on(type: InspectionEventTypes.SET_CHARTS_VISIBILITY, listener: (inspection: Inspection, visible: boolean) => void): this;
	off(type: InspectionEventTypes.SET_CHARTS_VISIBILITY, listener: (inspection: Inspection, visible: boolean) => void): this;
}