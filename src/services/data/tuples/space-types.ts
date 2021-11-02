import {ParameterJoint} from './factor-calculator-types';
import {TenantId} from './tenant-types';
import {TopicHolder, TopicId} from './topic-types';
import {Tuple, TupleHolder} from './tuple-types';
import {UserGroupHolder} from './user-group-types';

/** filter */
export interface SpaceFilter {
	topicId: TopicId;
	joint: ParameterJoint;
	enabled: boolean;
}

export type SpaceId = string;

export interface Space extends Tuple, TopicHolder, UserGroupHolder {
	spaceId: SpaceId;
	name: string;
	description?: string;
	tenantId?: TenantId;
	filters?: Array<SpaceFilter>;
}

export interface SpaceHolder extends TupleHolder {
	spaceIds: Array<SpaceId>;
}