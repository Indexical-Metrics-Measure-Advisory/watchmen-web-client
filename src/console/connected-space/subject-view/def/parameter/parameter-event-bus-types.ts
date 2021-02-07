import { Parameter } from '../../../../../services/tuples/factor-calculator-types';

export enum ParameterEventTypes {
	FROM_CHANGED = 'from-changed',

	CONSTANT_VALUE_CHANGED = 'constant-value-changed',

	TOPIC_CHANGED = 'topic-changed',
	FACTOR_CHANGED = 'factor-changed'
}

export interface ParameterEventBus {
	fire(type: ParameterEventTypes.FROM_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.FROM_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.FROM_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.CONSTANT_VALUE_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.CONSTANT_VALUE_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.TOPIC_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.TOPIC_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.TOPIC_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.FACTOR_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.FACTOR_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.FACTOR_CHANGED, listener: (parameter: Parameter) => void): this;
}