import {
	SubjectDataSetFilter,
	SubjectDataSetFilterExpression,
	SubjectDataSetFilterJoint
} from '../../../../../services/tuples/subject-types';

export enum FilterEventTypes {
	JOINT_TYPE_CHANGED = 'joint-type-changed',
	FILTER_ADDED = 'expression-added',
	FILTER_REMOVED = 'expression-removed',
	EXPRESSION_CONTENT_CHANGED = 'expression-content-changed'
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

	fire(type: FilterEventTypes.EXPRESSION_CONTENT_CHANGED, expression: SubjectDataSetFilterExpression): this;
	on(type: FilterEventTypes.EXPRESSION_CONTENT_CHANGED, listener: (expression: SubjectDataSetFilterExpression) => void): this;
	off(type: FilterEventTypes.EXPRESSION_CONTENT_CHANGED, listener: (expression: SubjectDataSetFilterExpression) => void): this;
}