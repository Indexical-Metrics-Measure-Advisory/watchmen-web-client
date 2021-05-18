import {Parameter, TopicFactorParameter} from '../../../../../services/tuples/factor-calculator-types';
import {InternalUnitRuntimeContext, PipelineRuntimeContext} from '../types';
import {
	isComputedParameter,
	isConstantParameter,
	isTopicFactorParameter
} from '../../../../../services/tuples/factor-calculator-utils';
import {
	castParameterValueType,
	computeConstant,
	getValueFromSourceData,
	readTopicFactorParameter
} from './parameter-kits';
import {ParameterShouldBe} from './types';

const computeTopicFactor = (options: {
	parameter: TopicFactorParameter,
	pipelineContext: PipelineRuntimeContext,
	shouldBe: ParameterShouldBe
}): any => {
	const {parameter, pipelineContext, shouldBe} = options;

	const {factor} = readTopicFactorParameter({
		parameter,
		topics: pipelineContext.allTopics,
		validOrThrow: (topicId) => {
			// eslint-disable-next-line
			if (topicId != pipelineContext.pipeline.topicId) {
				throw new Error(`Topic of parameter[${parameter}] must be source topic of pipeline.`);
			}
		}
	});

	const value = getValueFromSourceData(factor, pipelineContext.triggerData);
	return castParameterValueType({value, shouldBe, parameter});
};
export const computeParameter = (options: {
	parameter: Parameter,
	pipelineContext: PipelineRuntimeContext,
	shouldBe?: ParameterShouldBe,
	internalUnitContext?: InternalUnitRuntimeContext
}): any => {
	const {parameter, pipelineContext, shouldBe = ParameterShouldBe.ANY, internalUnitContext = null} = options;

	if (isTopicFactorParameter(parameter)) {
		return computeTopicFactor({parameter, pipelineContext, shouldBe});
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
		// return computeComputed(parameter, shouldBe);
		// TODO
		return null;
	} else {
		throw new Error(`Unsupported parameter[${parameter}].`);
	}
};