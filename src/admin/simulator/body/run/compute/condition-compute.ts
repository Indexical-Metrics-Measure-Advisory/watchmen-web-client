import {
	ParameterCondition,
	ParameterExpression,
	ParameterExpressionOperator,
	ParameterJoint,
	ParameterJointType
} from '@/services/data/tuples/factor-calculator-types';
import {isExpressionParameter, isJointParameter} from '@/services/data/tuples/parameter-utils';
import {isXaNumber} from '@/services/utils';
import dayjs, {Dayjs} from 'dayjs';
import {DataRow} from '../../../types';
import {InternalUnitRuntimeContext, PipelineRuntimeContext} from '../types';
import {computeParameter} from './parameter-compute';

type CompareDate = (date1: Dayjs, date2: Dayjs) => boolean;

export const computeJoint = (options: {
	joint: ParameterJoint,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext?: InternalUnitRuntimeContext,
	alternativeTriggerData: DataRow | null
}): boolean => {
	const {joint, pipelineContext, internalUnitContext, alternativeTriggerData} = options;
	if (joint.jointType === ParameterJointType.OR) {
		return joint.filters.some(condition => {
			return computeCondition({condition, pipelineContext, internalUnitContext, alternativeTriggerData});
		});
	} else if (joint.jointType === ParameterJointType.AND) {
		return joint.filters.every((condition) => {
			return computeCondition({condition, pipelineContext, internalUnitContext, alternativeTriggerData});
		});
	} else {
		throw new Error(`Unsupported joint type[${joint.jointType}].`);
	}
};

const compareWhenOneDateAtLeast = (
	value1: any,
	value2: any,
	compareTillDay: CompareDate,
	compareTillSecond: CompareDate,
	mismatched: () => boolean
): boolean => {
	const str1 = value1.toString().split('').map((c: string) => ' -/:.TZ'.includes(c) ? '' : c).join('');
	const str2 = value2.toString().split('').map((c: string) => ' -/:.TZ'.includes(c) ? '' : c).join('');
	if (str1.length === 8) {
		// str1 must be a date of YYYYMMDD
		if (str2.length < 8) {
			// anyway, str2 cannot be a date
			return false;
		} else {
			const date1 = dayjs(str1);
			const date2 = dayjs(str2);
			return date1.isValid() && date2.isValid() && compareTillDay(date1, date2);
		}
	} else if (str1.length < 14) {
		// invalid date format
		return mismatched();
	} else if (str2.length === 8) {
		// str2 must be a date of YYYYMMDD
		const date1 = dayjs(str1);
		const date2 = dayjs(str2);
		return date1.isValid() && date2.isValid() && compareTillDay(date1, date2);
	} else if (str2.length < 14) {
		// invalid date format
		return mismatched();
	} else {
		const date1 = dayjs(str1);
		const date2 = dayjs(str2);
		return date1.isValid() && date2.isValid() && compareTillSecond(date1, date2);
	}
};

const eq = (value1?: any, value2?: any): boolean => {
	if (value1 == null) {
		return value2 == null;
	} else if (value2 == null) {
		return false;
		// eslint-disable-next-line
	} else if (value1 == value2) {
		return true;
		// eslint-disable-next-line
	} else if (`${value1}` == `${value2}`) {
		return true;
	} else {
		return compareWhenOneDateAtLeast(value1, value2, (date1: Dayjs, date2: Dayjs) => {
			return date1.isSame(date2, 'day');
		}, (date1: Dayjs, date2: Dayjs) => {
			return date1.isSame(date2, 'second');
		}, () => false);
	}
};

const empty = (value?: any): boolean => {
	return value == null || value.toString().trim().length === 0;
};

const less = (value1?: any, value2?: any): boolean => {
	// eslint-disable-next-line
	if (value1 == null) {
		return value2 != null;
		// eslint-disable-next-line
	} else if (value2 == null) {
		return false;
	} else if (isXaNumber(value1) && isXaNumber(value2)) {
		return Number(value1) < Number(value2);
	} else {
		// noinspection TypeScriptValidateTypes
		return compareWhenOneDateAtLeast(value1, value2, (date1: Dayjs, date2: Dayjs) => {
			return date1.isBefore(date2, 'day');
		}, (date1: Dayjs, date2: Dayjs) => {
			return date1.isBefore(date2, 'second');
		}, () => {
			throw new Error(`More or less than operator is only compatible for comparable or null values, currently are [${value1}] and [${value2}].`);
		});
	}
};

const more = (value1?: any, value2?: any): boolean => {
	// eslint-disable-next-line
	if (value2 == null) {
		return value1 != null;
		// eslint-disable-next-line
	} else if (value1 == null) {
		return false;
	} else if (isXaNumber(value1) && isXaNumber(value2)) {
		return Number(value1) > Number(value2);
	} else {
		// noinspection TypeScriptValidateTypes
		return compareWhenOneDateAtLeast(value1, value2, (date1: Dayjs, date2: Dayjs) => {
			return date1.isAfter(date2, 'day');
		}, (date1: Dayjs, date2: Dayjs) => {
			return date1.isAfter(date2, 'second');
		}, () => {
			throw new Error(`More or less than operator is only compatible for comparable or null values, currently are [${value1}] and [${value2}].`);
		});
	}
};

const exists = (value?: any, values?: any): boolean => {
	if (Array.isArray(values)) {
		return values.some(item => eq(value, item));
	} else if (typeof values === 'string') {
		return eq(value, values.split(',').map(x => x.trim()).filter(x => x));
	} else {
		return eq(value, values);
	}
};

const notExists = (value?: any, values?: any): boolean => {
	if (Array.isArray(values)) {
		return values.every(item => !eq(value, item));
	} else if (typeof values === 'string') {
		return eq(value, values.split(',').map(x => x.trim()).filter(x => x));
	} else {
		return !eq(value, values);
	}
};

const computeExpressionParts = (options: {
	expression: ParameterExpression,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext?: InternalUnitRuntimeContext,
	alternativeTriggerData: DataRow | null
}) => {
	const {expression, pipelineContext, internalUnitContext, alternativeTriggerData} = options;

	return {
		left: () => computeParameter({
			parameter: expression.left,
			pipelineContext,
			internalUnitContext,
			alternativeTriggerData
		}),
		right: () => {
			if (!expression.right) {
				throw new Error(`Right part of expression[${JSON.stringify(expression)}] doesn't exists.`);
			}
			return computeParameter({
				parameter: expression.right,
				pipelineContext,
				internalUnitContext,
				alternativeTriggerData
			});
		}
	};
};

export const computeExpression = (options: {
	expression: ParameterExpression,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext?: InternalUnitRuntimeContext,
	alternativeTriggerData: DataRow | null
}): boolean => {
	const {expression, pipelineContext, internalUnitContext, alternativeTriggerData} = options;

	const {left, right} = computeExpressionParts({
		expression,
		pipelineContext,
		internalUnitContext,
		alternativeTriggerData
	});
	switch (expression.operator) {
		case ParameterExpressionOperator.EQUALS:
			return eq(left(), right());
		case ParameterExpressionOperator.NOT_EQUALS :
			return !eq(left(), right());
		case ParameterExpressionOperator.EMPTY :
			return empty(left());
		case ParameterExpressionOperator.NOT_EMPTY :
			return !empty(left());
		case ParameterExpressionOperator.LESS :
			return less(left(), right());
		case ParameterExpressionOperator.LESS_EQUALS :
			return !more(left(), right());
		case ParameterExpressionOperator.MORE :
			return more(left(), right());
		case ParameterExpressionOperator.MORE_EQUALS :
			return !less(left(), right());
		case ParameterExpressionOperator.IN :
			return exists(left(), right());
		case ParameterExpressionOperator.NOT_IN :
			return notExists(left(), right());
		default:
			throw new Error(`Unsupported expression operator[${expression.operator}].`);
	}
};

export const computeCondition = (options: {
	condition: ParameterCondition,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext?: InternalUnitRuntimeContext,
	alternativeTriggerData: DataRow | null
}): boolean => {
	const {condition, pipelineContext, internalUnitContext, alternativeTriggerData} = options;
	if (isExpressionParameter(condition)) {
		return computeExpression({expression: condition, pipelineContext, internalUnitContext, alternativeTriggerData});
	} else if (isJointParameter(condition)) {
		return computeJoint({joint: condition, pipelineContext, internalUnitContext, alternativeTriggerData});
	} else {
		throw new Error(`Unsupported condition[${JSON.stringify(condition)}].`);
	}
};
