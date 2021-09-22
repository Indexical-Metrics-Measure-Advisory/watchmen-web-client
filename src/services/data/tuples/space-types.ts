import {ParameterJoint} from './factor-calculator-types';
import {TopicHolder, Tuple, UserGroupHolder} from './tuple-types';

/** filter */
export interface SpaceFilter {
	topicId: string;
	joint: ParameterJoint;
	enabled: boolean;
}

export interface Space extends Tuple, TopicHolder, UserGroupHolder {
	spaceId: string;
	name: string;
	description?: string;
	tenantId?: string;
	filters?: Array<SpaceFilter>;
}
