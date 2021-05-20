import {
	ComputedParameter,
	ConstantParameter,
	Parameter,
	ParameterComputeType,
	TopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-types';
import {InternalUnitRuntimeContext, PipelineRuntimeContext} from '../types';
import {
	isComputedParameter,
	isConstantParameter,
	isTopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-utils';
import {
	castParameterValueType,
	checkShouldBe,
	checkSubParameters,
	computeConstantByStatement,
	getValueFromSourceData,
	readTopicFactorParameter
} from './parameter-kits';
import {ParameterShouldBe} from './types';
import dayjs from 'dayjs';
import {computeJoint} from './condition-compute';
import {DataRow} from '../../../simulator-event-bus-types';

const HALF_YEAR_FIRST: number = 1;
const HALF_YEAR_SECOND: number = 2;

const QUARTER_FIRST: number = 1;
const QUARTER_SECOND: number = 2;
const QUARTER_THIRD: number = 3;
const QUARTER_FOURTH: number = 4;

/**
 * if there is alternative trigger data passed,
 * which means data can be retrieved from another topic besides the topic which triggered this pipeline.
 *
 * note, the passed alternative trigger data must be same as the topic which is declared in this topic factor parameter.
 * program will not check this.
 *
 * @param options
 */
export const computeTopicFactor = (options: {
	parameter: TopicFactorParameter,
	pipelineContext: PipelineRuntimeContext,
	shouldBe: ParameterShouldBe,
	/** data which can bed used to find **/
	alternativeTriggerData: DataRow | null
}): any => {
	const {parameter, pipelineContext, shouldBe, alternativeTriggerData} = options;

	const {topic, factor} = readTopicFactorParameter({
		parameter,
		topics: pipelineContext.allTopics,
		validOrThrow: (topicId) => {
			// eslint-disable-next-line
			if (!alternativeTriggerData && topicId != pipelineContext.pipeline.topicId) {
				throw new Error(`Topic of parameter[${parameter}] must be source topic of pipeline.`);
			}
		}
	});

	let sourceData = pipelineContext.triggerData;
	// eslint-disable-next-line
	if (topic.topicId != pipelineContext.pipeline.topicId && alternativeTriggerData) {
		sourceData = alternativeTriggerData;
	}

	const value = getValueFromSourceData(factor, sourceData);
	return castParameterValueType({value, shouldBe, parameter});
};
const computeConstant = (options: {
	parameter: ConstantParameter,
	shouldBe: ParameterShouldBe,
	getValue: (propertyName: string) => any
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

const computeComputedToNumbers = (options: {
	parameters: Array<Parameter>,
	pipelineContext: PipelineRuntimeContext,
	internalUnitContext?: InternalUnitRuntimeContext,
	alternativeTriggerData: DataRow | null
}): Array<number | null> => {
	const {parameters, pipelineContext, internalUnitContext, alternativeTriggerData} = options;
	return parameters.map(sub => computeParameter({
		parameter: sub,
		pipelineContext,
		internalUnitContext,
		shouldBe: ParameterShouldBe.NUMBER,
		alternativeTriggerData
	}));
};
const computeComputed = (options: {
	parameter: ComputedParameter,
	pipelineContext: PipelineRuntimeContext,
	shouldBe: ParameterShouldBe
	internalUnitContext?: InternalUnitRuntimeContext,
	alternativeTriggerData: DataRow | null
}): any => {
	const {parameter, shouldBe, pipelineContext, internalUnitContext, alternativeTriggerData} = options;
	checkSubParameters(parameter);
	checkShouldBe(parameter, shouldBe);

	const parameters = parameter.parameters;

	let value: any;
	switch (parameter.type) {
		case ParameterComputeType.NONE:
			throw new Error(`Operator of parameter[${parameter}] cannot be none.`);
		case ParameterComputeType.ADD:
			value = computeComputedToNumbers({parameters, pipelineContext, internalUnitContext, alternativeTriggerData})
				.reduce((x, y) => (x ?? 0) + (y ?? 0));
			break;
		case ParameterComputeType.SUBTRACT:
			value = computeComputedToNumbers({parameters, pipelineContext, internalUnitContext, alternativeTriggerData})
				.filter(x => x != null)
				.reduce((x, y) => (x as number) - (y as number));
			break;
		case ParameterComputeType.MULTIPLY:
			value = computeComputedToNumbers({parameters, pipelineContext, internalUnitContext, alternativeTriggerData})
				.reduce((x, y) => (x ?? 1) * (y ?? 1));
			break;
		case ParameterComputeType.DIVIDE:
			value = computeComputedToNumbers({parameters, pipelineContext, internalUnitContext, alternativeTriggerData})
				.filter(x => x != null)
				.reduce((x, y) => (x as number) - (y as number));
			break;
		case ParameterComputeType.MODULUS:
			const v0 = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.NUMBER,
				internalUnitContext,
				alternativeTriggerData
			});
			const v1 = computeParameter({
				parameter: parameters[1],
				pipelineContext,
				shouldBe: ParameterShouldBe.NUMBER,
				internalUnitContext,
				alternativeTriggerData
			});
			value = v0 % v1;
			break;
		case ParameterComputeType.YEAR_OF: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			value = date ? dayjs(date).year() : null;
			break;
		}
		case ParameterComputeType.HALF_YEAR_OF: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			if (date == null) {
				value = null;
			} else {
				const month = dayjs(date).month();
				value = month < 6 ? HALF_YEAR_FIRST : HALF_YEAR_SECOND;
			}
			break;
		}
		case ParameterComputeType.QUARTER_OF: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			if (date == null) {
				value = null;
			} else {
				const month = dayjs(date).month();
				switch (true) {
					case month < 3:
						value = QUARTER_FIRST;
						break;
					case month < 6:
						value = QUARTER_SECOND;
						break;
					case month < 9:
						value = QUARTER_THIRD;
						break;
					default:
						value = QUARTER_FOURTH;
						break;
				}
			}
			break;
		}
		case ParameterComputeType.MONTH_OF: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			value = date ? (dayjs(date).month() + 1) : null;
			break;
		}
		case ParameterComputeType.WEEK_OF_YEAR: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			// week starts from sunday
			if (date == null) {
				value = null;
			} else {
				const firstDayOfYear = dayjs(date).startOf('year');
				const firstDayWeekday = firstDayOfYear.day() + 1;
				const firstWeekDays = (8 - firstDayWeekday) % 7;
				const thisDay = dayjs(date);
				const daysDiff = thisDay.diff(firstDayOfYear, 'day', false);
				if (daysDiff < firstWeekDays) {
					// this is first week, maybe not a whole week
					value = 0;
				} else {
					value = Math.ceil((daysDiff - firstWeekDays + 1) / 7);
				}
			}
			break;
		}
		case ParameterComputeType.WEEK_OF_MONTH: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			// week starts from sunday
			if (date == null) {
				value = null;
			} else {
				const firstDayOfMonth = dayjs(date).startOf('month');
				const firstDayWeekday = firstDayOfMonth.day() + 1;
				const firstWeekDays = (8 - firstDayWeekday) % 7;
				const thisDay = dayjs(date);
				const daysDiff = thisDay.diff(firstDayOfMonth, 'day', false);
				if (daysDiff < firstWeekDays) {
					// this is first week, maybe not a whole week
					value = 0;
				} else {
					value = Math.ceil((daysDiff - firstWeekDays + 1) / 7);
				}
			}
			break;
		}
		case ParameterComputeType.DAY_OF_MONTH: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			value = date ? dayjs(date).date() : null;
			break;
		}
		case ParameterComputeType.DAY_OF_WEEK: {
			const date = computeParameter({
				parameter: parameters[0],
				pipelineContext,
				shouldBe: ParameterShouldBe.DATE,
				internalUnitContext,
				alternativeTriggerData
			});
			value = date ? (dayjs(date).day() + 1) : null;
			break;
		}
		case ParameterComputeType.CASE_THEN:
			const route = parameters
				.filter(parameter => parameter.conditional && parameter.on != null)
				.find(parameter => {
					return computeJoint({
						joint: parameter.on!,
						pipelineContext,
						internalUnitContext,
						alternativeTriggerData
					});
				});
			if (route != null) {
				return computeParameter({
					parameter: route,
					pipelineContext,
					shouldBe,
					internalUnitContext,
					alternativeTriggerData
				});
			}

			const defaultRoute = parameters.find(parameter => parameter.on == null);
			if (defaultRoute) {
				value = computeParameter({
					parameter: defaultRoute,
					pipelineContext,
					shouldBe,
					internalUnitContext,
					alternativeTriggerData
				});
			} else {
				value = null;
			}
			break;
	}

	return castParameterValueType({value, shouldBe, parameter});
};

export const computeParameter = (options: {
	parameter: Parameter,
	pipelineContext: PipelineRuntimeContext,
	shouldBe?: ParameterShouldBe,
	internalUnitContext?: InternalUnitRuntimeContext,
	/** data which can bed used to find in parameter **/
	alternativeTriggerData: DataRow | null
}): any => {
	const {
		parameter,
		pipelineContext,
		shouldBe = ParameterShouldBe.ANY,
		internalUnitContext,
		alternativeTriggerData
	} = options;

	if (isTopicFactorParameter(parameter)) {
		return computeTopicFactor({parameter, pipelineContext, shouldBe, alternativeTriggerData});
	} else if (isConstantParameter(parameter)) {
		return computeConstant({
			parameter, shouldBe, getValue: (propertyName) => {
				let value = pipelineContext.triggerData[propertyName];
				if (typeof value === 'undefined') {
					value = internalUnitContext?.variables[propertyName];
				}
				if (typeof value === 'undefined') {
					value = pipelineContext.variables[propertyName];
				}
				return value ?? null;
			}
		});
	} else if (isComputedParameter(parameter)) {
		return computeComputed({parameter, pipelineContext, shouldBe, internalUnitContext, alternativeTriggerData});
	} else {
		throw new Error(`Unsupported parameter[${parameter}].`);
	}
};