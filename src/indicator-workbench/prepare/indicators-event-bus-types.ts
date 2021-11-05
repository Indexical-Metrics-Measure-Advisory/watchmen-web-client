import {Indicator, IndicatorId, TopicForIndicator} from '@/services/data/tuples/indicator-types';
import {PrepareStep} from './types';

export interface IndicatorsData {
	indicator?: Indicator;
	topic?: TopicForIndicator;
}

export enum IndicatorsEventTypes {
	SWITCH_STEP = 'switch-step',

	CREATE_INDICATOR = 'create-indicator',
	PICK_INDICATOR = 'pick-indicator',
	PICK_TOPIC = 'pick-topic',

	INDICATOR_SAVED = 'indicator-saved'
}

export interface IndicatorsEventBus {
	fire(type: IndicatorsEventTypes.SWITCH_STEP, step: PrepareStep, data?: IndicatorsData): this;
	on(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: PrepareStep, data?: IndicatorsData) => void): this;
	off(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: PrepareStep, data?: IndicatorsData) => void): this;

	fire(type: IndicatorsEventTypes.CREATE_INDICATOR, onCreated: (indicator: Indicator) => void): this;
	on(type: IndicatorsEventTypes.CREATE_INDICATOR, listener: (onCreated: (indicator: Indicator) => void) => void): this;
	off(type: IndicatorsEventTypes.CREATE_INDICATOR, listener: (onCreated: (indicator: Indicator) => void) => void): this;

	fire(type: IndicatorsEventTypes.PICK_INDICATOR, indicatorId: IndicatorId, onData: (data: IndicatorsData) => void): this;
	on(type: IndicatorsEventTypes.PICK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (data: IndicatorsData) => void) => void): this;
	off(type: IndicatorsEventTypes.PICK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (data: IndicatorsData) => void) => void): this;

	fire(type: IndicatorsEventTypes.PICK_TOPIC, data: IndicatorsData, onData: (data: IndicatorsData) => void): this;
	on(type: IndicatorsEventTypes.PICK_TOPIC, listener: (data: IndicatorsData, onData: (data: IndicatorsData) => void) => void): this;
	off(type: IndicatorsEventTypes.PICK_TOPIC, listener: (data: IndicatorsData, onData: (data: IndicatorsData) => void) => void): this;

	fire(type: IndicatorsEventTypes.INDICATOR_SAVED, indicator: Indicator): this;
	on(type: IndicatorsEventTypes.INDICATOR_SAVED, listener: (indicator: Indicator) => void): this;
	off(type: IndicatorsEventTypes.INDICATOR_SAVED, listener: (indicator: Indicator) => void): this;

}