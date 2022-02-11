import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';

export enum TopicEventTypes {
	TOPIC_NAME_CHANGED = 'topic-name-changed',
	TOPIC_KIND_CHANGED = 'topic-kind-changed',
	TOPIC_TYPE_CHANGED = 'topic-type-changed',
	TOPIC_DATA_SOURCE_CHANGED = 'topic-data-source-changed',
	TOPIC_DESCRIPTION_CHANGED = 'topic-description-changed',

	FACTOR_ADDED = 'factor-added',
	FACTOR_REMOVED = 'factor-removed',
	FACTORS_IMPORTED = 'factors-imported',

	FACTOR_NAME_CHANGED = 'factor-name-changed',
	FACTOR_LABEL_CHANGED = 'factor-label-changed',
	FACTOR_TYPE_CHANGED = 'factor-type-changed',
	FACTOR_ENUM_CHANGED = 'factor-enum-changed',
	FACTOR_INDEX_GROUP_CHANGED = 'factor-index-group-changed',
	FACTOR_DEFAULT_VALUE_CHANGED = 'factor-default-value-changed',
	FACTOR_FLATTEN_CHANGED = 'factor-flatten-changed',
	FACTOR_ENCRYPT_CHANGED = 'factor-encrypt-changed',
	FACTOR_DESCRIPTION_CHANGED = 'factor-description-changed',
	FACTOR_VALUE_RULE_CHANGED = 'factor-value-rule-changed',

	FACTOR_SEARCH_TEXT_CHANGED = 'factor-search-text-changed'
}

export interface TopicEventBus {
	fire(type: TopicEventTypes.TOPIC_NAME_CHANGED, topic: Topic): this;
	on(type: TopicEventTypes.TOPIC_NAME_CHANGED, listener: (topic: Topic) => void): this;
	off(type: TopicEventTypes.TOPIC_NAME_CHANGED, listener: (topic: Topic) => void): this;

	fire(type: TopicEventTypes.TOPIC_KIND_CHANGED, topic: Topic): this;
	on(type: TopicEventTypes.TOPIC_KIND_CHANGED, listener: (topic: Topic) => void): this;
	off(type: TopicEventTypes.TOPIC_KIND_CHANGED, listener: (topic: Topic) => void): this;

	fire(type: TopicEventTypes.TOPIC_TYPE_CHANGED, topic: Topic): this;
	on(type: TopicEventTypes.TOPIC_TYPE_CHANGED, listener: (topic: Topic) => void): this;
	off(type: TopicEventTypes.TOPIC_TYPE_CHANGED, listener: (topic: Topic) => void): this;

	fire(type: TopicEventTypes.TOPIC_DATA_SOURCE_CHANGED, topic: Topic): this;
	on(type: TopicEventTypes.TOPIC_DATA_SOURCE_CHANGED, listener: (topic: Topic) => void): this;
	off(type: TopicEventTypes.TOPIC_DATA_SOURCE_CHANGED, listener: (topic: Topic) => void): this;

	fire(type: TopicEventTypes.TOPIC_DESCRIPTION_CHANGED, topic: Topic): this;
	on(type: TopicEventTypes.TOPIC_DESCRIPTION_CHANGED, listener: (topic: Topic) => void): this;
	off(type: TopicEventTypes.TOPIC_DESCRIPTION_CHANGED, listener: (topic: Topic) => void): this;

	fire(type: TopicEventTypes.FACTOR_ADDED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_ADDED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_ADDED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_REMOVED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_REMOVED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_REMOVED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTORS_IMPORTED, factors: Array<Factor>): this;
	on(type: TopicEventTypes.FACTORS_IMPORTED, listener: (factors: Array<Factor>) => void): this;
	off(type: TopicEventTypes.FACTORS_IMPORTED, listener: (factors: Array<Factor>) => void): this;

	fire(type: TopicEventTypes.FACTOR_NAME_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_NAME_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_NAME_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_LABEL_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_LABEL_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_LABEL_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_TYPE_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_TYPE_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_TYPE_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_ENUM_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_ENUM_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_ENUM_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_INDEX_GROUP_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_INDEX_GROUP_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_INDEX_GROUP_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_FLATTEN_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_FLATTEN_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_FLATTEN_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_ENCRYPT_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_ENCRYPT_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_ENCRYPT_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_DESCRIPTION_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_DESCRIPTION_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_DESCRIPTION_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_VALUE_RULE_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_VALUE_RULE_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_VALUE_RULE_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, topic: Topic, searchText: string): this;
	on(type: TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, listener: (topic: Topic, searchText: string) => void): this;
	off(type: TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED, listener: (topic: Topic, searchText: string) => void): this;
}