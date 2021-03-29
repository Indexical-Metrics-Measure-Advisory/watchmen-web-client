import { Parameter, ParameterCondition, ParameterExpression, ParameterJoint } from './factor-calculator-types';
import { Report } from './report-types';
import { Tuple } from './tuple-types';

/** column */
export interface SubjectDataSetColumn {
	columnId: string;
	parameter: Parameter;
	alias?: string;
}

/** filter */
export interface SubjectDataSetFilter extends ParameterCondition {
}

export interface SubjectDataSetFilterJoint extends SubjectDataSetFilter, ParameterJoint {
	filters: Array<SubjectDataSetFilter>;
}

export interface SubjectDataSetFilterExpression extends SubjectDataSetFilter, ParameterExpression {
}

/** topic join */
export enum TopicJoinType {
	LEFT = 'left',
	RIGHT = 'right',
	INNER = 'inner',
}

export interface SubjectDataSetJoin {
	topicId: string;
	factorId: string;
	secondaryTopicId: string;
	secondaryFactorId: string;
	type: TopicJoinType;
}

export interface SubjectDataSet {
	filters: SubjectDataSetFilterJoint;
	columns: Array<SubjectDataSetColumn>;
	joins: Array<SubjectDataSetJoin>;
}

export interface Subject extends Tuple {
	subjectId: string;
	name: string;
	autoRefreshInterval?: number;
	reports?: Array<Report>;
	dataset: SubjectDataSet;
	lastVisitTime: string;
}
