import {DataSourceId} from './data-source-types';
import {Factor} from './factor-types';
import {TenantId} from './tenant-types';
import {Tuple, TupleHolder} from './tuple-types';

export enum TopicKind {
	SYSTEM = 'system',
	BUSINESS = 'business'
}

export enum TopicType {
	RAW = 'raw',
	META = 'meta',
	DISTINCT = 'distinct',
	AGGREGATE = 'aggregate',
	TIME = 'time',
	RATIO = 'ratio'
}

export type TopicId = string;

export interface Topic extends Tuple {
	topicId: TopicId;
	name: string;
	kind: TopicKind;
	type: TopicType;
	description?: string;
	factors: Array<Factor>;
	tenantId?: TenantId;
	dataSourceId?: DataSourceId;
}

export interface TopicHolder extends TupleHolder {
	topicIds: Array<TopicId>;
}