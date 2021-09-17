import {ParameterCondition, ParameterExpression, ParameterJoint} from './factor-calculator-types';
import {TopicHolder, Tuple, UserGroupHolder} from './tuple-types';

/** filter */
export interface SpaceFilter extends ParameterCondition {
}

export interface SpaceFilterJoint extends SpaceFilter, ParameterJoint {
	filters: Array<SpaceFilter>;
}

export interface SpaceFilterExpression extends SpaceFilter, ParameterExpression {
}

export interface Space extends Tuple, TopicHolder, UserGroupHolder {
	spaceId: string;
	name: string;
	description?: string;
	tenantId?: string;
	filters?: SpaceFilterJoint;
}
