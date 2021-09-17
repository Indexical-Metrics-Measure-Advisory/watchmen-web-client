import {Parameter} from '@/services/data/tuples/factor-calculator-types';
import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum ParameterEventTypes {
	/**
	 * any change will lead this event. no fire explicitly
	 */
	PARAM_CHANGED = 'param-changed',

	FROM_CHANGED = 'from-changed',

	CONDITION_CHANGED = 'condition-changed',

	CONSTANT_VALUE_CHANGED = 'constant-value-changed',

	TOPIC_CHANGED = 'topic-changed',
	FACTOR_CHANGED = 'factor-changed',

	COMPUTE_TYPE_CHANGED = 'compute-type-changed',
	COMPUTE_CONTENT_CHANGED = 'compute-content-changed',

	COMPUTE_PARAMETER_ADDED = 'compute-parameter-added',
	COMPUTE_PARAMETER_REMOVED = 'compute-parameter-removed'
}

export interface ParameterEventBus {
	on(type: ParameterEventTypes.PARAM_CHANGED, listener: () => void): this;
	off(type: ParameterEventTypes.PARAM_CHANGED, listener: () => void): this;

	fire(type: ParameterEventTypes.FROM_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.FROM_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.FROM_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.CONDITION_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.CONDITION_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.CONDITION_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.CONSTANT_VALUE_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.CONSTANT_VALUE_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.CONSTANT_VALUE_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.TOPIC_CHANGED, parameter: Parameter, topic: Topic): this;
	on(type: ParameterEventTypes.TOPIC_CHANGED, listener: (parameter: Parameter, topic: Topic) => void): this;
	off(type: ParameterEventTypes.TOPIC_CHANGED, listener: (parameter: Parameter, topic: Topic) => void): this;

	fire(type: ParameterEventTypes.FACTOR_CHANGED, parameter: Parameter, factor?: Factor): this;
	on(type: ParameterEventTypes.FACTOR_CHANGED, listener: (parameter: Parameter, factor?: Factor) => void): this;
	off(type: ParameterEventTypes.FACTOR_CHANGED, listener: (parameter: Parameter, factor?: Factor) => void): this;

	fire(type: ParameterEventTypes.COMPUTE_TYPE_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.COMPUTE_TYPE_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.COMPUTE_TYPE_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.COMPUTE_CONTENT_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.COMPUTE_CONTENT_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.COMPUTE_CONTENT_CHANGED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.COMPUTE_PARAMETER_ADDED, parameter: Parameter): this;
	on(type: ParameterEventTypes.COMPUTE_PARAMETER_ADDED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.COMPUTE_PARAMETER_ADDED, listener: (parameter: Parameter) => void): this;

	fire(type: ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, parameter: Parameter): this;
	on(type: ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.COMPUTE_PARAMETER_REMOVED, listener: (parameter: Parameter) => void): this;
}