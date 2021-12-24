import {TopicId} from '@/services/data/tuples/topic-types';
import {UserId} from '@/services/data/tuples/user-types';

export interface CatalogCriteria {
	name?: string;
	topicId?: TopicId;
	techOwnerId?: UserId;
	bizOwnerId?: UserId;
}