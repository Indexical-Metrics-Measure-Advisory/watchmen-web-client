import {Factor, FactorType} from './factor-types';
import {Topic} from './topic-types';

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

export interface TopicFactorParameter extends Parameter {
	kind: ParameterKind.TOPIC;
	topicId: string;
	factorId: string;
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

export enum VariablePredefineFunctions {
	NEXT_SEQ = '&nextSeq',
	COUNT = '&count',
	LENGTH = '&length',
	FROM_PREVIOUS_TRIGGER_DATA = '&old'
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