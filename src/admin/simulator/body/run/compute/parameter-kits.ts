import {
	ConstantParameter,
	Parameter,
	TopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-types';
import {AllTopics} from '../types';
import {Topic} from '../../../../../services/tuples/topic-types';
import {Factor} from '../../../../../services/tuples/factor-types';
import {DataRow} from '../../../simulator-event-bus-types';
import {ConstantPredefines, ParameterShouldBe} from './types';
import dayjs from 'dayjs';

export const readTopicFactorParameter = (options: {
	parameter: TopicFactorParameter,
	topics: AllTopics,
	validOrThrow: (topicId: String) => void
}): { topic: Topic, factor: Factor } => {
	const {parameter, topics, validOrThrow} = options;

	const topicId = parameter.topicId;
	if (!topicId || topicId.trim().length === 0) {
		throw new Error(`Topic id of parameter[${parameter}] cannot be blank.`);
	}
	validOrThrow(topicId);
	const topic = topics[topicId];
	if (!topic) {
		throw new Error(`Topic[${topicId}] of parameter[${parameter}] not found.`);
	}

	const factorId = parameter.factorId;
	if (!factorId || factorId.trim().length === 0) {
		throw new Error(`Factor id of parameter[${parameter}] cannot be blank.`);
	}
	// eslint-disable-next-line
	const factor = topic.factors.find(factor => factor.factorId == factorId);
	if (!factor) {
		throw new Error(`Factor[${factorId}] of parameter[${parameter}] not found.`);
	}

	return {topic, factor};
};

export const getValueFromSourceData = (factor: Factor, sourceData: DataRow): any => {
	const name = factor.name!;
	if (!name.includes('.')) {
		return sourceData[name];
	} else {
		const parts = name.split('.');
		var source: any = sourceData;
		parts.reduce((obj, part) => {
			if (obj == null) {
				return null;
			} else if (Array.isArray(obj)) {
				return obj.map(item => {
					if (typeof item === 'object') {
						return item[part];
					} else {
						throw new Error(`Cannot retrieve data from ${source} by [${part}].`);
					}
				});
			} else if (typeof obj === 'object') {
				return obj[part];
			} else {
				throw new Error(`Cannot retrieve data from ${source} by [${part}].`);
			}
		}, source);
		return source;
	}
};

const computeToCollection = (value?: any): Array<any> => {
	switch (true) {
		case value == null:
			return [];
		case Array.isArray(value):
			return value;
		case typeof value === 'string':
			return value.split(',').map((s: string) => s.trim());
		default:
			return [value];
	}
};

const computeToNumeric = (parameter: Parameter, value?: any): number | null => {
	if (value == null) {
		return value;
	} else if (isNaN(value)) {
		throw new Error(`Cannot cast given value[${value}] to numeric, which is computed by parameter[${parameter}].`);
	} else {
		return Number(value.toString());
	}
};

const computeToDate = (parameter: Parameter, date?: any): string | null => {
	if (date == null) {
		return null;
	}

	date = date.toString().split('').map((c: string) => ' -/:.TZ'.includes(c) ? '' : c).join('');
	const casted = dayjs(date);
	if (casted.isValid()) {
		// remove time
		return casted.startOf('day').format('YYYYMMDD');
	} else {
		throw new Error(`Cannot cast given value[${date}] to date, which is computed by parameter[${parameter}].`);
	}
};

export const castParameterValueType = (options: {
	value?: any,
	shouldBe: ParameterShouldBe,
	parameter: Parameter
}) => {
	const {value, shouldBe, parameter} = options;

	switch (shouldBe) {
		case ParameterShouldBe.ANY:
			return value;
		case ParameterShouldBe.COLLECTION:
			return computeToCollection(value);
		case ParameterShouldBe.NUMBER:
			return computeToNumeric(parameter, value);
		case ParameterShouldBe.DATE:
			return computeToDate(value, parameter);
	}
};

// use timestamp(13 digits) instead, just for simulator
let currentSnowflakeId = new Date().getTime();

const computeVariable = (options: { variable: string, getFirstValue: (propertyName: string) => any, throws: () => void }): any => {
	const {variable, getFirstValue, throws} = options;
	if (variable.trim().length === 0) {
		return null;
	}

	// eslint-disable-next-line
	return variable.split('.').map(x => x.trim()).reduce((value: any, part, index) => {
		if (index === 0 && part === ConstantPredefines.NEXT_SEQ) {
			return currentSnowflakeId++;
		} else if (index === 0) {
			return getFirstValue(part);
		} else if (part === ConstantPredefines.COUNT && Array.isArray(value)) {
			return value.length;
		} else if (part === ConstantPredefines.COUNT && typeof value === 'object') {
			return Object.keys(value).length;
		} else if (part === ConstantPredefines.LENGTH && typeof value === 'string') {
			return value.length;
		} else if (typeof value === 'object') {
			return value[part];
		} else if (Array.isArray(value)) {
			// eslint-disable-next-line
			return value.map(item => {
				if (typeof item === 'object') {
					return item[part];
				} else {
					throws();
				}
			}).flat();
		} else {
			throws();
		}
	}, null as any);
};
const computeStatement = (statement: string, getFirstValue: (propertyName: string) => any, throws: () => void): any => {
	const segments = statement.match(/([^{]*({[^}]+})?)/);
	if (segments == null) {
		// no variable
		return statement;
	}
	const values = segments.map(segment => {
		const braceStartIndex = segment.indexOf('{');
		if (braceStartIndex === -1) {
			return segment;
		} else if (braceStartIndex === 0) {
			const variable = segment.substring(1, segment.length - 1).trim();
			return computeVariable({variable, getFirstValue, throws});
		} else {
			const prefix = segment.substring(0, braceStartIndex);
			const variable = segment.substring(braceStartIndex + 1, segment.length - 1).trim();
			return `${prefix}${computeVariable({variable, getFirstValue, throws}) ?? ''}`;
		}
	});

	if (values.length === 1) {
		return values[0];
	} else {
		return values.filter(x => !x).join('');
	}
};
const computeConstantByStatement = (options: {
	statement: string,
	parameter: ConstantParameter,
	shouldBe: ParameterShouldBe,
	getValue: (propertyName: string) => any
}): any => {
	const {statement, parameter, shouldBe, getValue} = options;

	const value = computeStatement(statement, getValue, () => {
		throw new Error(`Cannot retrieve value of variable[${statement}], which is defined by parameter[${parameter}].`);
	});
	return castParameterValueType({value, parameter, shouldBe});
};
export const computeConstant = (options: {
	parameter: ConstantParameter, shouldBe: ParameterShouldBe, getValue: (propertyName: string) => any
}): any => {
	const {parameter, shouldBe, getValue} = options;

	const statement = parameter.value;

	let value: any;
	if (statement == null) {
		value = null;
	} else if (statement.length === 0) {
		if (shouldBe === ParameterShouldBe.ANY) {
			value = '';
		} else {
			value = null;
		}
	} else if (statement.trim().length === 0) {
		if (shouldBe === ParameterShouldBe.ANY) {
			value = statement;
		} else {
			value = null;
		}
	} else {
		value = computeConstantByStatement({statement, parameter, shouldBe, getValue});
	}

	return castParameterValueType({value, parameter, shouldBe});
};