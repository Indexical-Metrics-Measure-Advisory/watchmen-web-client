import {Factor, FactorId, FactorType} from './factor-types';
import {Topic, TopicId} from './topic-types';

export enum ParameterKind {
	TOPIC = 'topic',
	CONSTANT = 'constant',
	COMPUTED = 'computed'
}

export interface Parameter {
	kind: ParameterKind;
	conditional?: boolean;
	on?: ParameterJoint;
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
	DAY_OF_WEEK = 'day-of-week',
	CASE_THEN = 'case-then'
}

export const AvailableComputeTypes = [
	ParameterComputeType.ADD,
	ParameterComputeType.SUBTRACT,
	ParameterComputeType.MULTIPLY,
	ParameterComputeType.DIVIDE,
	ParameterComputeType.MODULUS,
	ParameterComputeType.YEAR_OF,
	ParameterComputeType.HALF_YEAR_OF,
	ParameterComputeType.QUARTER_OF,
	ParameterComputeType.MONTH_OF,
	ParameterComputeType.WEEK_OF_YEAR,
	ParameterComputeType.WEEK_OF_MONTH,
	ParameterComputeType.DAY_OF_MONTH,
	ParameterComputeType.DAY_OF_WEEK,
	ParameterComputeType.CASE_THEN
];

export interface TopicFactorParameter extends Parameter {
	kind: ParameterKind.TOPIC;
	topicId: TopicId;
	factorId: FactorId;
}

export interface ConstantParameter extends Parameter {
	kind: ParameterKind.CONSTANT;
	value: string;
}

export interface Computed {
	type: ParameterComputeType;
	parameters: Array<Parameter>;
}

export interface ComputedParameter extends Computed, Parameter {
	kind: ParameterKind.COMPUTED;
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

export enum ParameterInvalidReason {
	TOPIC_NOT_DEFINED = 'topic-not-defined',
	TOPIC_NOT_FOUND = 'topic-not-found',

	FACTOR_NOT_DEFINED = 'factor-not-defined',
	FACTOR_NOT_FOUND = 'factor-not-found',
	FACTOR_TYPE_NOT_MATCHED = 'factor-type-not-matched',

	PARAMETER_NOT_DEFINED = 'parameter-not-defined',

	COMPUTE_TYPE_NOT_DEFINED = 'compute-type-not-defined',
	COMPUTE_RETURN_TYPE_NOT_MATCHED = 'compute-return-type-not-matched',
	COMPUTE_PARAMETER_COUNT_NOT_MATCHED = 'compute-parameter-count-not-matched',
	COMPUTE_PARAMETER_HAS_NOT_DEFINED = 'compute-parameter-has-not-defined',
	COMPUTE_CASES_TOO_MANY_UNCONDITIONAL = 'compute-cases-too-many-unconditional',

	CONSTANT_TYPE_NOT_MATCHED = 'constant-type-not-matched',

	JOINT_TYPE_NOT_DEFINED = 'joint-type-not-defined',
	JOINT_FILTERS_NOT_DEFINED = 'joint-filters-not-defined',

	EXPRESSION_LEFT_NOT_DEFINED = 'expression-left-not-defined',
	EXPRESSION_OPERATOR_NOT_DEFINED = 'expression-operator-not-defined',
	EXPRESSION_RIGHT_NOT_DEFINED = 'expression-right-not-defined'
}

export const ParameterInvalidReasonsLabels: Record<ParameterInvalidReason, string> = {
	[ParameterInvalidReason.TOPIC_NOT_DEFINED]: 'topic not defined',
	[ParameterInvalidReason.TOPIC_NOT_FOUND]: 'topic not found',

	[ParameterInvalidReason.FACTOR_NOT_DEFINED]: 'factor not defined',
	[ParameterInvalidReason.FACTOR_NOT_FOUND]: 'factor not found',
	[ParameterInvalidReason.FACTOR_TYPE_NOT_MATCHED]: 'factor type doesn\'t match expected',

	[ParameterInvalidReason.PARAMETER_NOT_DEFINED]: 'parameter not defined',

	[ParameterInvalidReason.COMPUTE_TYPE_NOT_DEFINED]: 'compute type not defined',
	[ParameterInvalidReason.COMPUTE_RETURN_TYPE_NOT_MATCHED]: 'computed return type doesn\'t match expected',
	[ParameterInvalidReason.COMPUTE_PARAMETER_COUNT_NOT_MATCHED]: 'parameter count of compute not matched',
	[ParameterInvalidReason.COMPUTE_PARAMETER_HAS_NOT_DEFINED]: 'at least one parameter not defined in compute',
	[ParameterInvalidReason.COMPUTE_CASES_TOO_MANY_UNCONDITIONAL]: 'too many unconditional forks in cases',

	[ParameterInvalidReason.CONSTANT_TYPE_NOT_MATCHED]: 'constant return type doesn\'t match expected',

	[ParameterInvalidReason.JOINT_TYPE_NOT_DEFINED]: 'joint type not defined',
	[ParameterInvalidReason.JOINT_FILTERS_NOT_DEFINED]: 'no filters defined of joint',

	[ParameterInvalidReason.EXPRESSION_LEFT_NOT_DEFINED]: 'left part of expression not defined',
	[ParameterInvalidReason.EXPRESSION_OPERATOR_NOT_DEFINED]: 'expression operator not defined',
	[ParameterInvalidReason.EXPRESSION_RIGHT_NOT_DEFINED]: 'right part of expression not defined'
};

export enum VariablePredefineFunctions {
	NEXT_SEQ = '&nextSeq',
	COUNT = '&count',
	LENGTH = '&length',
	SUM = '&sum',
	FROM_PREVIOUS_TRIGGER_DATA = '&old',

	DAY_DIFF = '&dayDiff',
	MONTH_DIFF = '&monthDiff',
	YEAR_DIFF = '&yearDiff'
}

export interface ParsedVariablePredefineFunctions {
	f: VariablePredefineFunctions;
	params: Array<string>;
}

export enum AnyFactorType {
	ANY = 'any',
	// use in parse constant parameter, if variable not found, type is error
	ERROR = 'error'
}

export type ValueType = FactorType | AnyFactorType;
export type ValueTypes = Array<ValueType>;

/**
 * value type computed from parameter
 */
export interface ValueTypeOfParameter {
	/** topic is recorded when can be determined */
	topic?: Topic;
	/** factor is recorded when can be determined */
	factor?: Factor;
	/** is array or not */
	array: boolean;
	/** possible value types */
	type: ValueType;
}

export type ValueTypesOfParameter = Array<ValueTypeOfParameter>;

/**
 * there are multiple possible value type of declared variable
 */
export interface DeclaredVariable {
	name: string;
	types: ValueTypesOfParameter;
}

export type DeclaredVariables = Array<DeclaredVariable>;