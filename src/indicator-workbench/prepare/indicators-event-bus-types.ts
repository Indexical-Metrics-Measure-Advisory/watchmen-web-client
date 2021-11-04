import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {PrepareStep} from './types';

export interface IndicatorsData {
	indicator?: Indicator;
	topic?: Topic;
}

export enum IndicatorsEventTypes {
	SWITCH_STEP = 'switch-step',

	CREATE_INDICATOR = 'create-indicator',
	PICK_INDICATOR = 'pick-indicator'
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
}