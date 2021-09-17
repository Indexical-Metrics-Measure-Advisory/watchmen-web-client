import {SubjectDataSetFilter, SubjectDataSetFilterJoint} from '@/services/data/tuples/subject-types';

export enum FilterEventTypes {
	JOINT_TYPE_CHANGED = 'joint-type-changed',
	FILTER_ADDED = 'expression-added',
	FILTER_REMOVED = 'expression-removed',

	// when filter is expression, any content change
	// when filter is joint, any change on sub filters
	CONTENT_CHANGED = 'expression-content-changed'
}

export interface FilterEventBus {
	fire(type: FilterEventTypes.JOINT_TYPE_CHANGED, joint: SubjectDataSetFilterJoint): this;
	on(type: FilterEventTypes.JOINT_TYPE_CHANGED, listener: (joint: SubjectDataSetFilterJoint) => void): this;
	off(type: FilterEventTypes.JOINT_TYPE_CHANGED, listener: (joint: SubjectDataSetFilterJoint) => void): this;

	fire(type: FilterEventTypes.FILTER_ADDED, filter: SubjectDataSetFilter): this;
	on(type: FilterEventTypes.FILTER_ADDED, listener: (filter: SubjectDataSetFilter) => void): this;
	off(type: FilterEventTypes.FILTER_ADDED, listener: (filter: SubjectDataSetFilter) => void): this;

	fire(type: FilterEventTypes.FILTER_REMOVED, filter: SubjectDataSetFilter): this;
	on(type: FilterEventTypes.FILTER_REMOVED, listener: (filter: SubjectDataSetFilter) => void): this;
	off(type: FilterEventTypes.FILTER_REMOVED, listener: (filter: SubjectDataSetFilter) => void): this;

	fire(type: FilterEventTypes.CONTENT_CHANGED, filter: SubjectDataSetFilter): this;
	on(type: FilterEventTypes.CONTENT_CHANGED, listener: (filter: SubjectDataSetFilter) => void): this;
	off(type: FilterEventTypes.CONTENT_CHANGED, listener: (filter: SubjectDataSetFilter) => void): this;
}