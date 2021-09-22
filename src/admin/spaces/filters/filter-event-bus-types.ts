import {ParameterCondition, ParameterJoint} from '@/services/data/tuples/factor-calculator-types';

export enum FilterEventTypes {
	JOINT_TYPE_CHANGED = 'joint-type-changed',
	FILTER_ADDED = 'expression-added',
	FILTER_REMOVED = 'expression-removed',

	// when filter is expression, any content change
	// when filter is joint, any change on sub filters
	CONTENT_CHANGED = 'expression-content-changed'
}

export interface FilterEventBus {
	fire(type: FilterEventTypes.JOINT_TYPE_CHANGED, joint: ParameterJoint): this;
	on(type: FilterEventTypes.JOINT_TYPE_CHANGED, listener: (joint: ParameterJoint) => void): this;
	off(type: FilterEventTypes.JOINT_TYPE_CHANGED, listener: (joint: ParameterJoint) => void): this;

	fire(type: FilterEventTypes.FILTER_ADDED, filter: ParameterCondition): this;
	on(type: FilterEventTypes.FILTER_ADDED, listener: (filter: ParameterCondition) => void): this;
	off(type: FilterEventTypes.FILTER_ADDED, listener: (filter: ParameterCondition) => void): this;

	fire(type: FilterEventTypes.FILTER_REMOVED, filter: ParameterCondition): this;
	on(type: FilterEventTypes.FILTER_REMOVED, listener: (filter: ParameterCondition) => void): this;
	off(type: FilterEventTypes.FILTER_REMOVED, listener: (filter: ParameterCondition) => void): this;

	fire(type: FilterEventTypes.CONTENT_CHANGED, filter: ParameterCondition): this;
	on(type: FilterEventTypes.CONTENT_CHANGED, listener: (filter: ParameterCondition) => void): this;
	off(type: FilterEventTypes.CONTENT_CHANGED, listener: (filter: ParameterCondition) => void): this;
}