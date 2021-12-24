import {TopicId} from './topic-types';
import {UserId} from './user-types';

export interface CatalogCriteria {
	name?: string;
	topicId?: TopicId;
	techOwnerId?: UserId;
	bizOwnerId?: UserId;
}