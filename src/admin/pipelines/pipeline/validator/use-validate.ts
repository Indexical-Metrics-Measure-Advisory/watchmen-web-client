import {
	isAlarmAction,
	isCopyToMemoryAction,
	isExistsAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadFactorAction,
	isReadFactorsAction,
	isReadRowsAction,
	isReadTopicAction,
	isWriteFactorAction
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {
	AnyFactorType,
	DeclaredVariables,
	Parameter,
	ParameterCondition,
	ParameterExpressionOperator,
	TopicFactorParameter
} from '../../../../services/tuples/factor-calculator-types';
import {
	buildVariable,
	isJointValid4Pipeline,
	isParameterValid4Pipeline
} from '../../../../services/tuples/pipeline-validation-utils';
import {
	FindBy,
	PipelineStageUnitAction
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isComputedParameter,
	isConstantParameter,
	isExpressionParameter,
	isJointParameter,
	isTopicFactorParameter
} from '../../../../services/tuples/parameter-utils';

export interface Validation {
	pass: boolean;
	message?: string;
}

const isConditionCanBeComputedInMemory = (condition: ParameterCondition, topic: Topic): boolean => {
	if (isJointParameter(condition)) {
		return condition.filters.every(condition => isConditionCanBeComputedInMemory(condition, topic));
	} else if (isExpressionParameter(condition)) {
		const {left, right} = condition;
		if (left && !isParameterCanBeComputedInMemory(left, topic)) {
			return false;
		}
		return !right || isParameterCanBeComputedInMemory(right, topic);
	} else {
		// never occurs
		return true;
	}
};
const isParameterCanBeComputedInMemory = (parameter: Parameter, topic: Topic): boolean => {
	if (isConstantParameter(parameter)) {
		return true;
	} else if (isComputedParameter(parameter)) {
		return parameter.parameters.every(sub => {
			let can = isParameterCanBeComputedInMemory(sub, topic);
			if (!can) {
				return false;
			}
			if (sub.on) {
				return sub.on.filters.every(condition => isConditionCanBeComputedInMemory(condition, topic));
			} else {
				return true;
			}
		});
	} else if (isTopicFactorParameter(parameter)) {
		// eslint-disable-next-line
		return parameter.topicId != topic.topicId;
	} else {
		return true;
	}
};

const countIndex = (one: TopicFactorParameter, another: Parameter, topic: Topic, usedIndexGroups: { [key in string]: Array<string> }) => {
	if (isParameterCanBeComputedInMemory(another, topic)) {
		// eslint-disable-next-line
		const factor = topic.factors.find(factor => factor.factorId == one.factorId);
		if (factor?.indexGroup) {
			let group = usedIndexGroups[factor.indexGroup];
			if (!group) {
				usedIndexGroups[factor.indexGroup] = [factor.factorId];
			} else {
				group.push(factor.factorId);
			}
		}
	}
};
// assume action already pass validation
const isIndexUsed = (action: FindBy, topic: Topic): boolean => {
	const {by} = action;

	const unique = !isReadFactorsAction(action) && !isReadRowsAction(action) && !isExistsAction(action);

	const definedIndexes: { [key in string]: Array<string> } = topic.factors.reduce((indexes, factor) => {
		if (factor.indexGroup) {
			const group = indexes[factor.indexGroup];
			if (!group) {
				indexes[factor.indexGroup] = [factor.factorId];
			} else {
				group.push(factor.factorId);
			}
		}
		return indexes;
	}, {} as { [key in string]: Array<string> });
	const usedIndexGroups: { [key in string]: Array<string> } = {};
	by.filters.forEach(condition => {
		if (!isExpressionParameter(condition)) {
			return;
		}

		if (condition.operator !== ParameterExpressionOperator.EQUALS) {
			return;
		}

		const {left, right} = condition;
		// eslint-disable-next-line
		if (isTopicFactorParameter(left) && left.topicId == topic.topicId) {
			countIndex(left, right, topic, usedIndexGroups);
			// eslint-disable-next-line
		} else if (isTopicFactorParameter(right) && right.topicId == topic.topicId) {
			countIndex(right, left, topic, usedIndexGroups);
		}
	});

	if (Object.keys(usedIndexGroups).length === 0) {
		return false;
	}

	const usefulIndexGroups = unique ? Object.keys(usedIndexGroups).filter(indexGroup => {
		return indexGroup.startsWith('u-');
	}) : Object.keys(usedIndexGroups);

	// compare useful with defined
	return usefulIndexGroups.some(indexGroup => {
		const used = [...new Set(usedIndexGroups[indexGroup] || [])];
		const defined = definedIndexes[indexGroup];
		return used.length === defined.length;
	});
};

export const useValidate = () => {
	return async (pipeline: Pipeline, topics: Array<Topic>): Promise<Validation> => {
		return new Promise<Validation>((resolve) => {
			const {name, type, topicId, conditional, on, stages} = pipeline;
			if (!name || name.trim().length === 0) {
				pipeline.validated = false;
				resolve({pass: false, message: 'Pipeline name is not given yet.'});
				return;
			}

			// noinspection JSIncompatibleTypesComparison
			if (type == null) {
				pipeline.validated = false;
				resolve({pass: false, message: 'Pipeline trigger type is not given yet.'});
				return;
			}

			// eslint-disable-next-line
			const triggerTopic = topics.find(topic => topic.topicId == topicId);
			if (!triggerTopic) {
				pipeline.validated = false;
				resolve({pass: false, message: 'Pipeline source topic is mismatched.'});
				return;
			}

			const variables: DeclaredVariables = [];
			const misIndexed: Array<string> = [];

			if (conditional) {
				if (!on || on.filters.length === 0) {
					pipeline.validated = false;
					resolve({pass: false, message: 'Pipeline prerequisite is not given yet.'});
					return;
				}
				if (!isJointValid4Pipeline({joint: on, allTopics: [triggerTopic], triggerTopic, variables})) {
					pipeline.validated = false;
					resolve({pass: false, message: 'Pipeline prerequisite is incorrect.'});
					return;
				}
			}

			/**
			 * try to build variable and push into given variables.
			 * return true when successful, return false when cannot find the correct type or build failure
			 */
			const tryToBuildVariable = (options: {
				action: PipelineStageUnitAction;
				variables: DeclaredVariables;
				topics: Array<Topic>;
				triggerTopic: Topic;
			}): boolean => {
				const {action, variables, topics, triggerTopic} = options;

				const variable = buildVariable({action, variables, topics, triggerTopic});
				if (variable) {
					if (variable.types.every(type => type.type === AnyFactorType.ERROR)) {
						// detect error type
						return false;
					} else {
						const newVariables = variables.filter(v => v.name !== variable.name);
						variables.length = 0;
						variables.push(variable, ...newVariables);
						return true;
					}
				} else {
					return false;
				}
			};

			let failureReason = '';
			const pass = !stages.some((stage, stageIndex) => {
				// return true when fail on validation
				const {conditional, on, units} = stage;
				if (conditional) {
					if (!on || on.filters.length === 0) {
						failureReason = `Stage[#${stageIndex + 1}] prerequisite is not given yet.`;
						return true;
					}
					if (!isJointValid4Pipeline({joint: on, allTopics: [triggerTopic], triggerTopic, variables})) {
						failureReason = `Stage[#${stageIndex + 1}] prerequisite is incorrect.`;
						return true;
					}
				}

				return units.some((unit, unitIndex) => {
					// return true when fail on validation
					const {loopVariableName, conditional, on, do: actions} = unit;
					if (loopVariableName && loopVariableName.trim().length !== 0) {
						if (variables.every(variable => variable.name !== loopVariableName.trim())) {
							failureReason = `Unit[#${stageIndex + 1}.${unitIndex + 1}] loop variable name is incorrect.`;
							return true;
						}
					}

					if (conditional) {
						if (!on || on.filters.length === 0) {
							failureReason = `Unit[#${stageIndex + 1}.${unitIndex + 1}] prerequisite is not given yet.`;
							return true;
						}
						if (!isJointValid4Pipeline({joint: on, allTopics: [triggerTopic], triggerTopic, variables})) {
							failureReason = `Unit[#${stageIndex + 1}.${unitIndex + 1}] prerequisite is incorrect.`;
							return true;
						}
					}
					return actions.some((action, actionIndex) => {
						// return true when fail on validation
						if (isAlarmAction(action)) {
							const {severity, on, conditional} = action;
							if (!severity) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] severity is not given yet.`;
								return true;
							}
							if (conditional) {
								if (!on || on.filters.length === 0) {
									failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] prerequisite is not given yet.`;
									return true;
								}
								if (!isJointValid4Pipeline({
									joint: on,
									allTopics: [triggerTopic],
									triggerTopic,
									variables
								})) {
									failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] prerequisite is incorrect.`;
									return true;
								}
							}
							// pass
							return false;
						} else if (isCopyToMemoryAction(action)) {
							const {variableName, source} = action;
							if (!variableName || variableName.trim().length === 0) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] variable name is not given yet.`;
								return true;
							}
							if (!source) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] source is not given yet.`;
								return true;
							}
							if (!isParameterValid4Pipeline({
								parameter: source,
								allTopics: topics,
								triggerTopic,
								variables,
								expectedTypes: [AnyFactorType.ANY],
								array: false
							})) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] source is incorrect.`;
								return true;
							}

							// pass validate
							const built = tryToBuildVariable({action, variables, topics, triggerTopic});
							if (!built) {
								// cannot build variable, return true as failed.
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] source is incorrect.`;
								return true;
							}
							return false;
						} else if (isReadTopicAction(action)) {
							const {topicId, variableName, by} = action;
							if (!variableName || variableName.trim().length === 0) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] variable name is not given yet.`;
								return true;
							}
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] source topic is incorrect.`;
								return true;
							}
							if (isReadFactorAction(action) || isReadFactorsAction(action)) {
								const {factorId} = action;
								// eslint-disable-next-line
								const factor = topic.factors.find(factor => factor.factorId == factorId);
								if (!factor) {
									failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] source factor is incorrect.`;
									return true;
								}
							}
							if (!by || by.filters.length === 0) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] read by is not given yet.`;
								return true;
							}
							if (!isJointValid4Pipeline({
								joint: by,
								allTopics: [topic, triggerTopic],
								triggerTopic,
								variables
							})) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] read by is incorrect.`;
								return true;
							}

							const built = tryToBuildVariable({action, variables, topics, triggerTopic});
							if (!built) {
								// cannot build variable, return true as failed.
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] topic or factor is incorrect.`;
								return true;
							}
							if (!isIndexUsed(action, topic)) {
								misIndexed.push(`#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}`);
							}
							// pass all validation
							return false;
						} else if (isInsertRowAction(action) || isMergeRowAction(action)) {
							const {topicId, mapping} = action;
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] target topic is incorrect.`;
								return true;
							}
							if (!mapping || mapping.length === 0) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] mapping doesn't be defined yet.`;
								return true;
							}
							const fail = mapping.some(({factorId, source}) => {
								// eslint-disable-next-line
								const factor = topic.factors.find(factor => factor.factorId == factorId);
								return !factor || !isParameterValid4Pipeline({
									parameter: source,
									allTopics: topics,
									triggerTopic,
									variables,
									expectedTypes: [factor.type],
									array: false
								});
							});
							if (fail) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] mapping has incorrect definition.`;
								return true;
							}
							if (isMergeRowAction(action)) {
								const {by} = action;
								if (!by || by.filters.length === 0) {
									failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] merge by is not given yet.`;
									return true;
								}
								if (!isJointValid4Pipeline({
									joint: by,
									allTopics: [topic, triggerTopic],
									triggerTopic,
									variables
								})) {
									failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] merge by is incorrect.`;
									return true;
								}

								if (!isIndexUsed(action, topic)) {
									misIndexed.push(`#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}`);
								}
							}
							// pass validation
							return false;
						} else if (isWriteFactorAction(action)) {
							const {topicId, factorId, by} = action;
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] target topic is incorrect.`;
								return true;
							}
							// eslint-disable-next-line
							const factor = topic.factors.find(factor => factor.factorId == factorId);
							if (!factor) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] source factor is incorrect.`;
								return true;
							}
							if (!by || by.filters.length === 0) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] merge by is not given yet.`;
								return true;
							}
							if (!isJointValid4Pipeline({
								joint: by,
								allTopics: [topic, triggerTopic],
								triggerTopic,
								variables
							})) {
								failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] merge by is incorrect.`;
								return true;
							}
							if (!isIndexUsed(action, topic)) {
								misIndexed.push(`#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}`);
							}
							// pass
							return false;
						} else {
							failureReason = `Action[#${stageIndex + 1}.${unitIndex + 1}.${actionIndex + 1}] action type is not supported yet.`;
							return true;
						}
					});
				});
			});

			if (!pass) {
				pipeline.validated = false;
				resolve({
					pass: false,
					message: failureReason || 'There is something incorrect in pipeline definition, view it in dsl panel for detail information.'
				});
				return;
			}

			pipeline.validated = true;
			if (misIndexed.length !== 0) {
				resolve({
					pass: true,
					message: `Action[${misIndexed.join(',')}] might not be indexed, try to use index when read or write data from storage.`
				});
			} else {
				resolve({pass: true});
			}
		});
	};
};