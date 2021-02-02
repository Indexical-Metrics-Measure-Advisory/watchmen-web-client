import { Factor } from '../../services/tuples/factor-types';

export enum TopicEventTypes {
	FACTOR_ADDED = 'factor-added',
	FACTOR_REMOVED = 'factor-removed',
	FACTORS_IMPORTED = 'factors-imported',

	FACTOR_NAME_CHANGED = 'factor-name-changed',
	FACTOR_LABEL_CHANGED = 'factor-label-changed',
	FACTOR_TYPE_CHANGED = 'factor-type-changed',
	FACTOR_DEFAULT_VALUE_CHANGED = 'factor-default-value-changed',
	FACTOR_DESCRIPTION_CHANGE = 'factor-type-changed',
	FACTOR_VALUE_RULE_CHANGED = 'factor-value-rule-changed'
}

export interface TopicEventBus {
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

	fire(type: TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_DEFAULT_VALUE_CHANGED, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_DESCRIPTION_CHANGE, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_DESCRIPTION_CHANGE, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_DESCRIPTION_CHANGE, listener: (factor: Factor) => void): this;

	fire(type: TopicEventTypes.FACTOR_VALUE_RULE_CHANGED, factor: Factor): this;
	on(type: TopicEventTypes.FACTOR_VALUE_RULE_CHANGED, listener: (factor: Factor) => void): this;
	off(type: TopicEventTypes.FACTOR_VALUE_RULE_CHANGED, listener: (factor: Factor) => void): this;
}