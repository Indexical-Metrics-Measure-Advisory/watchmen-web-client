import { Parameter } from './factor-calculator-types';
import { Tuple } from './tuple-types';

/** column */
export interface SubjectDataSetColumn {
	parameter: Parameter;
	alias?: string;
}

/** filter */
export interface SubjectDataSetFilter {
}

export enum FilterJointType {
	AND = 'and',
	OR = 'or',
}

export interface SubjectDataSetFilterJoint extends SubjectDataSetFilter {
	jointType: FilterJointType;
	filters: Array<SubjectDataSetFilter>;
}

export enum FilterExpressionOperator {
	EMPTY = 'empty',
	NOT_EMPTY = 'not-empty',
	EQUALS = 'equals',
	NOT_EQUALS = 'not-equals',
	LESS = 'less',
	LESS_EQUALS = 'less-equals',
	MORE = 'more',
	MORE_EQUALS = 'more-equals',
	IN = 'in',
	NOT_IN = 'not-in',
}

export interface SubjectDataSetFilterExpression extends SubjectDataSetFilter {
	left: Parameter;
	operator: FilterExpressionOperator;
	right: Parameter;
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
	filters: Array<SubjectDataSetFilterJoint>;
	columns: Array<SubjectDataSetColumn>;
	joins: Array<SubjectDataSetJoin>;
}

export interface Subject extends Tuple {
	subjectId: string;
	name: string;
	dataset: SubjectDataSet;
	lastVisitTime: string;
	// graphics?: Array<SubjectChart>;
}
