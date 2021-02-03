import { Tuple } from './tuple-types';

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
	// for date time
	YEAR_OF = 'year-of',
	HALF_YEAR_OF = 'half-year-of',
	QUARTER_OF = 'quarter-of',
	MONTH_OF = 'month-of',
	WEEK_OF_YEAR = 'week-of-year',
	WEEK_OF_MONTH = 'week-of-month',
	WEEKDAYS = 'weekdays',
	TILL_NOW = 'till-now',
}

export interface SubjectDataSetFilterExpression extends SubjectDataSetFilter {
	topicId: string;
	factorId: string;
	operator: FilterExpressionOperator;
	value?: string;
}

export enum ColumnExpressionOperator {
	NONE = 'none',
	ADD = 'add',
	SUBTRACT = 'subtract',
	MULTIPLY = 'multiply',
	DIVIDE = 'divide',
	MODULUS = 'modulus',
}

export interface SubjectDataSetColumn {
	topicId?: string;
	factorId?: string;
	operator?: ColumnExpressionOperator;
	secondaryTopicId?: string;
	secondaryFactorId?: string;
	alias?: string;
}

export enum TopicJoinType {
	LEFT = 'left',
	RIGHT = 'right',
	INNER = 'inner',
}

export interface SubjectDataSetJoin {
	topicId?: string;
	factorId?: string;
	secondaryTopicId?: string;
	secondaryFactorId?: string;
	type: TopicJoinType;
}

export interface SubjectDataSet {
	filters: Array<SubjectDataSetFilter>;
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
