export enum ParameterType {
	ANY = 'pt-any',
	NUMBER = 'pt-number',
	TEXT = 'pt-text',
	DATE = 'pt-date',
	TIME = 'pt-time',
	DATETIME = 'pt-datetime',
	BOOLEAN = 'pt-boolean',
	ENUM = 'pt-enum',
	ARRAY = 'pt-array'
}

export enum ParameterFrom {
	TOPIC = 'topic',
	CONSTANT = 'constant',
	COMPUTED = 'computed'
}

export interface Parameter {
	from: ParameterFrom;
}

export enum ParameterComputeType {
	NONE = 'none',
	ADD = 'add',
	SUBTRACT = 'subtract',
	MULTIPLY = 'multiply',
	DIVIDE = 'divide',
	MODULUS = 'modulus',
	YEAR_OF = 'year-of',
	HALF_YEAR_OF = 'half-year-of',
	QUARTER_OF = 'quarter-of',
	MONTH_OF = 'month-of',
	WEEK_OF_YEAR = 'week-of-year',
	WEEK_OF_MONTH = 'week-of-month',
	DAY_OF_MONTH = 'day-of-month',
	DAY_OF_WEEK = 'weekdays'
}

export interface TopicFactorParameter extends Parameter {
	from: ParameterFrom.TOPIC;
	topicId: string;
	factorId: string;
}

export interface ConstantParameter extends Parameter {
	from: ParameterFrom.CONSTANT;
	value: string;
}

export interface Computed {
	type: ParameterComputeType;
	parameters: Array<Parameter>;
}

export interface ComputedParameter extends Computed, Parameter {
	from: ParameterFrom.COMPUTED;
}

export enum ParameterExpressionOperator {
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

export interface ParameterCondition {
}

export interface ParameterExpression extends ParameterCondition {
	left: Parameter;
	operator: ParameterExpressionOperator;
	right: Parameter;
}

export enum ParameterJointType {
	AND = 'and',
	OR = 'or',
}

export interface ParameterJoint extends ParameterCondition {
	jointType: ParameterJointType;
	filters: Array<ParameterCondition>;
}
