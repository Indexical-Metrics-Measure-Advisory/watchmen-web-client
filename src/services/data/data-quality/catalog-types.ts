import {TopicId} from '../tuples/topic-types';
import {UserId} from '../tuples/user-types';

export interface CatalogCriteria {
	name?: string;
	topicId?: TopicId;
	techOwnerId?: UserId;
	bizOwnerId?: UserId;
}