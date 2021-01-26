import { TopicHolder, Tuple, UserGroupHolder } from './tuple-types';

export interface Space extends Tuple, TopicHolder, UserGroupHolder {
	spaceId: string;
	name: string;
	description?: string;
}
