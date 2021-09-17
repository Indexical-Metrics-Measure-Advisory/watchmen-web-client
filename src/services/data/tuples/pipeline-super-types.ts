import {ParameterJoint} from './factor-calculator-types';

export interface Conditional {
	conditional: boolean;
	on?: ParameterJoint;
}
