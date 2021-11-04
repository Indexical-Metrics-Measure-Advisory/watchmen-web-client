import {Indicator, IndicatorId} from '@/services/data/tuples/indicator-types';
import {PrepareStep} from './types';

export enum IndicatorsEventTypes {
	SWITCH_STEP = 'switch-step',

	CREATE_INDICATOR = 'create-indicator',
	PICK_INDICATOR = 'pick-indicator'
}

export interface IndicatorsEventBus {
	fire(type: IndicatorsEventTypes.SWITCH_STEP, step: PrepareStep): this;
	on(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: PrepareStep) => void): this;
	off(type: IndicatorsEventTypes.SWITCH_STEP, listener: (step: PrepareStep) => void): this;

	fire(type: IndicatorsEventTypes.CREATE_INDICATOR, onCreated: (indicator: Indicator) => void): this;
	on(type: IndicatorsEventTypes.CREATE_INDICATOR, listener: (onCreated: (indicator: Indicator) => void) => void): this;
	off(type: IndicatorsEventTypes.CREATE_INDICATOR, listener: (onCreated: (indicator: Indicator) => void) => void): this;

	fire(type: IndicatorsEventTypes.PICK_INDICATOR, indicatorId: IndicatorId, onData: (indicator: Indicator) => void): this;
	on(type: IndicatorsEventTypes.PICK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (indicator: Indicator) => void) => void): this;
	off(type: IndicatorsEventTypes.PICK_INDICATOR, listener: (indicatorId: IndicatorId, onData: (indicator: Indicator) => void) => void): this;
}