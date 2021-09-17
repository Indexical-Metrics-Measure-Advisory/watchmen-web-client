import {ReportFilter, ReportFilterJoint} from '@/services/data/tuples/report-types';

export enum FilterEventTypes {
	JOINT_TYPE_CHANGED = 'joint-type-changed',
	FILTER_ADDED = 'expression-added',
	FILTER_REMOVED = 'expression-removed',

	// when filter is expression, any content change
	// when filter is joint, any change on sub filters
	CONTENT_CHANGED = 'expression-content-changed'
}

export interface FilterEventBus {
	fire(type: FilterEventTypes.JOINT_TYPE_CHANGED, joint: ReportFilterJoint): this;
	on(type: FilterEventTypes.JOINT_TYPE_CHANGED, listener: (joint: ReportFilterJoint) => void): this;
	off(type: FilterEventTypes.JOINT_TYPE_CHANGED, listener: (joint: ReportFilterJoint) => void): this;

	fire(type: FilterEventTypes.FILTER_ADDED, filter: ReportFilter): this;
	on(type: FilterEventTypes.FILTER_ADDED, listener: (filter: ReportFilter) => void): this;
	off(type: FilterEventTypes.FILTER_ADDED, listener: (filter: ReportFilter) => void): this;

	fire(type: FilterEventTypes.FILTER_REMOVED, filter: ReportFilter): this;
	on(type: FilterEventTypes.FILTER_REMOVED, listener: (filter: ReportFilter) => void): this;
	off(type: FilterEventTypes.FILTER_REMOVED, listener: (filter: ReportFilter) => void): this;

	fire(type: FilterEventTypes.CONTENT_CHANGED, filter: ReportFilter): this;
	on(type: FilterEventTypes.CONTENT_CHANGED, listener: (filter: ReportFilter) => void): this;
	off(type: FilterEventTypes.CONTENT_CHANGED, listener: (filter: ReportFilter) => void): this;
}