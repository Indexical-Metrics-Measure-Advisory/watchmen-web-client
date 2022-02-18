import {Parameter, VariablePredefineFunctions} from '@/services/data/tuples/factor-calculator-types';
import {isDateDiffConstant} from '@/services/data/tuples/factor-calculator-utils';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {
	isExistsAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadTopicAction,
	isWriteFactorAction,
	isWriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {TopicId} from '@/services/data/tuples/topic-types';

/**
 * source write target
 */
export const computeWriteFlowTopicIds = (pipeline: Pipeline): Array<{ source: TopicId, target: TopicId }> => {
	const sourceTopicId = pipeline.topicId;

	return pipeline.stages.map(stage => {
		return stage.units.map(unit => {
			return unit.do.map(action => {
				if (!isWriteTopicAction(action)) {
					return null;
				}

				const {topicId} = action;
				return topicId;
			}).filter(x => !!x) as Array<TopicId>;
		}).flat();
	}).flat().map(targetTopicId => {
		return {source: sourceTopicId, target: targetTopicId};
	});
};

const tryToComputeToVariable = (statement: string, variables: { [key in string]: TopicId }): TopicId | null => {
	const dot = statement.indexOf('.');
	if (dot === -1) {
		return variables[statement];
	} else {
		return variables[statement.substring(0, dot)];
	}
};
const computeParameterFrom = (parameter: Parameter, variables: { [key in string]: TopicId }): Array<TopicId> => {
	if (isTopicFactorParameter(parameter)) {
		// ignored
		return [];
	} else if (isConstantParameter(parameter)) {
		const segments = (parameter.value || '').match(/([^{]*({[^}]+})?)/g);
		if (segments == null) {
			return [];
		}
		return segments.filter(x => !!x).map(segment => {
			if (segment.startsWith('{') && segment.endsWith('}')) {
				const name = segment.substring(1, segment.length - 1).trim();
				if (name === VariablePredefineFunctions.NEXT_SEQ) {
					return null;
				} else if (name.startsWith(VariablePredefineFunctions.FROM_PREVIOUS_TRIGGER_DATA)) {
					return null;
				}
				const dateDiff = isDateDiffConstant(name);
				if (dateDiff.is) {
					const params = dateDiff.parsed?.params;
					return (params || []).map(param => tryToComputeToVariable(param, variables));
				} else {
					return tryToComputeToVariable(name, variables);
				}
			} else {
				return null;
			}
		}).filter(x => !!x).flat().filter(x => !!x) as Array<TopicId>;
	} else if (isComputedParameter(parameter)) {
		return (parameter.parameters || []).map(sub => {
			return computeParameterFrom(sub, variables);
		}).flat();
	} else {
		return [];
	}
};
/**
 * source read target
 */
export const computeReadFlowTopicIds = (pipelines: Array<Pipeline>): Array<{ source: TopicId, target: TopicId }> => {
	return pipelines.map(pipeline => {
		const variables: { [key in string]: TopicId } = {};
		return pipeline.stages.map(stage => {
			return stage.units.map(unit => {
				return unit.do.map(action => {
					if (isInsertRowAction(action) || isMergeRowAction(action)) {
						const targetTopicId = action.topicId;
						const mapping = action.mapping;
						return (mapping || []).map(({source}) => {
							return computeParameterFrom(source, variables).map(sourceTopicId => {
								return {source: sourceTopicId, target: targetTopicId};
							});
						}).flat();
					} else if (isWriteFactorAction(action)) {
						const targetTopicId = action.topicId;
						return computeParameterFrom(action.source, variables).map(sourceTopicId => {
							return {source: sourceTopicId, target: targetTopicId};
						});
					} else if (isReadTopicAction(action) && !isExistsAction(action)) {
						variables[action.variableName] = action.topicId;
						return null;
					} else {
						return null;
					}
				}).filter(x => !!x).flat() as Array<{ source: TopicId, target: TopicId }>;
			}).flat();
		}).flat();
	}).flat();
};