import {BucketId} from '@/services/data/tuples/bucket-types';
import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {QueryBucket} from '@/services/data/tuples/query-bucket-types';
import {
	EnumForIndicator,
	QueryIndicatorCategoryParams,
	TopicForIndicator
} from '@/services/data/tuples/query-indicator-types';
import {IndicatorDeclarationStep} from './types';

export interface IndicatorsData {
	indicator?: Indicator;
	topic?: TopicForIndicator;
	enums?: Array<EnumForIndicator>;
}

export enum IndicatorsEventTypes {
	SWITCH_STEP = 'switch-step',

	CREATE_INDICATOR = 'create-indicator',
	PICK_INDICATOR = 'pick-indicator',
	PICK_TOPIC = 'pick-topic',

	INDICATOR_VALUE_BUCKET_PICKED = 'indicator-value-bucket-picked',
	INDICATOR_VALUE_BUCKET_UNPICKED = 'indicator-value-bucket-unpicked',

	SAVE_INDICATOR = 'save-indicator',
	INDICATOR_SAVED = 'indicator-saved',

	ASK_INDICATOR_CATEGORY = 'ask-indicator-category'
}

export interface IndicatorsEventBus {
	fire(type: IndicatorsEventTypes.SWITCH_STEP, step: IndicatorDeclarationStep, data?: IndicatorsData): this;
	on(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: IndicatorDeclarationStep, data?: IndicatorsData) => void): this;
	off(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: IndicatorDeclarationStep, data?: IndicatorsData) => void): this;

	fire(type: IndicatorsEventTypes.CREATE_INDICATOR, onCreated: (indicator: Indicator) => void): this;
	on(type: IndicatorsEventTypes.CREATE_INDICATOR, listener: (onCreated: (indicator: Indicator) => void) => void): this;
	off(type: IndicatorsEventTypes.CREATE_INDICATOR, listener: (onCreated: (indicator: Indicator) => void) => void): this;

	fire(type: IndicatorsEventTypes.PICK_INDICATOR, indicatorId: IndicatorId, onData: (data: IndicatorsData) => void): this;
	on(type: IndicatorsEventTypes.PICK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (data: IndicatorsData) => void) => void): this;
	off(type: IndicatorsEventTypes.PICK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (data: IndicatorsData) => void) => void): this;

	fire(type: IndicatorsEventTypes.PICK_TOPIC, data: IndicatorsData, onData: (data: IndicatorsData) => void): this;
	on(type: IndicatorsEventTypes.PICK_TOPIC, listener: (data: IndicatorsData, onData: (data: IndicatorsData) => void) => void): this;
	off(type: IndicatorsEventTypes.PICK_TOPIC, listener: (data: IndicatorsData, onData: (data: IndicatorsData) => void) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_PICKED, indicator: Indicator, bucket: QueryBucket): this;
	on(type: IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_PICKED, listener: (indicator: Indicator, bucket: QueryBucket) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_PICKED, listener: (indicator: Indicator, bucket: QueryBucket) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_UNPICKED, indicator: Indicator, bucketId: BucketId): this;
	on(type: IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_UNPICKED, listener: (indicator: Indicator, bucketId: BucketId) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_VALUE_BUCKET_UNPICKED, listener: (indicator: Indicator, bucketId: BucketId) => void): this;

	fire(type: IndicatorsEventTypes.SAVE_INDICATOR, indicator: Indicator, onSaved: (indicator: Indicator, saved: boolean) => void): this;
	on(type: IndicatorsEventTypes.SAVE_INDICATOR, listener: (indicator: Indicator, onSaved: (indicator: Indicator, saved: boolean) => void) => void): this;
	off(type: IndicatorsEventTypes.SAVE_INDICATOR, listener: (indicator: Indicator, onSaved: (indicator: Indicator, saved: boolean) => void) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_SAVED, indicator: Indicator): this;
	on(type: IndicatorsEventTypes.INDICATOR_SAVED, listener: (indicator: Indicator) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_SAVED, listener: (indicator: Indicator) => void): this;

	fire(type: IndicatorsEventTypes.ASK_INDICATOR_CATEGORY, indicator: Indicator, prefix: QueryIndicatorCategoryParams, onData: (candidates: Array<string>) => void): this;
	on(type: IndicatorsEventTypes.ASK_INDICATOR_CATEGORY, listener: (indicator: Indicator, prefix: QueryIndicatorCategoryParams, onData: (candidates: Array<string>) => void) => void): this;
	off(type: IndicatorsEventTypes.ASK_INDICATOR_CATEGORY, listener: (indicator: Indicator, prefix: QueryIndicatorCategoryParams, onData: (candidates: Array<string>) => void) => void): this;
}