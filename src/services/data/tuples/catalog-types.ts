import {TenantId} from './tenant-types';
import {TopicId} from './topic-types';
import {Tuple} from './tuple-types';
import {UserId} from './user-types';

export type CatalogId = string;

export interface Catalog extends Tuple {
	catalogId: CatalogId;
	name: string;
	topicIds?: Array<TopicId>;
	techOwnerId?: UserId;
	bizOwnerId?: UserId;
	tags?: Array<string>;
	description?: string;
	tenantId?: TenantId;
}
