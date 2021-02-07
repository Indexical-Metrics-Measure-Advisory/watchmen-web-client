import { Parameter } from '../../../../../services/tuples/factor-calculator-types';

export enum ParameterEventTypes {
	FROM_CHANGED = 'from-changed'
}

export interface ParameterEventBus {
	fire(type: ParameterEventTypes.FROM_CHANGED, parameter: Parameter): this;
	on(type: ParameterEventTypes.FROM_CHANGED, listener: (parameter: Parameter) => void): this;
	off(type: ParameterEventTypes.FROM_CHANGED, listener: (parameter: Parameter) => void): this;
}