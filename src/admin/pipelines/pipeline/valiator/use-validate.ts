import {
	isAlarmAction,
	isCopyToMemoryAction,
	isInsertRowAction,
	isMergeRowAction,
	isReadFactorAction,
	isReadFactorsAction,
	isReadTopicAction,
	isWriteFactorAction
} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {AnyFactorType, DeclaredVariables} from '../../../../services/tuples/factor-calculator-types';
import {
	buildVariable,
	isJointValid4Pipeline,
	isParameterValid4Pipeline
} from '../../../../services/tuples/pipeline-validation-utils';
import {PipelineStageUnitAction} from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';

export const useValidate = () => {
	return async (pipeline: Pipeline, topics: Array<Topic>): Promise<string | true> => {
		return new Promise<string | true>((resolve) => {
			const {name, type, topicId, conditional, on, stages} = pipeline;
			if (!name || name.trim().length === 0) {
				pipeline.validated = false;
				resolve('Pipeline name is not given yet.');
				return;
			}

			// noinspection JSIncompatibleTypesComparison
			if (type == null) {
				pipeline.validated = false;
				resolve('Pipeline trigger type is not given yet.');
				return;
			}

			// eslint-disable-next-line
			const triggerTopic = topics.find(topic => topic.topicId == topicId);
			if (!triggerTopic) {
				pipeline.validated = false;
				resolve('Pipeline source topic is mismatched.');
				return;
			}

			const variables: DeclaredVariables = [];

			if (conditional) {
				if (!on) {
					pipeline.validated = false;
					resolve('Pipeline prerequisite is not given yet.');
					return;
				}
				if (!isJointValid4Pipeline({joint: on, allTopics: [triggerTopic], triggerTopic, variables})) {
					pipeline.validated = false;
					resolve('Pipeline prerequisite is incorrect.');
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
						variables.push(variable);
						return true;
					}
				} else {
					return false;
				}
			};

			const pass = !stages.some(stage => {
				// return true when fail on validation
				const {conditional, on, units} = stage;
				if (conditional) {
					if (!on) {
						return true;
					}
					if (!isJointValid4Pipeline({joint: on, allTopics: [triggerTopic], triggerTopic, variables})) {
						return true;
					}
				}

				return units.some(unit => {
					// return true when fail on validation
					const {conditional, on, do: actions} = unit;
					if (conditional) {
						if (!on) {
							return true;
						}
						if (!isJointValid4Pipeline({joint: on, allTopics: [triggerTopic], triggerTopic, variables})) {
							return true;
						}
					}
					return actions.some(action => {
						// return true when fail on validation
						if (isAlarmAction(action)) {
							const {severity, on, conditional} = action;
							return !severity
								|| (conditional && (!on || !isJointValid4Pipeline({
									joint: on,
									allTopics: [triggerTopic],
									triggerTopic,
									variables
								})));
						} else if (isCopyToMemoryAction(action)) {
							const {variableName, source} = action;
							const invalid = !variableName || variableName.trim().length === 0
								|| !source || !isParameterValid4Pipeline({
									parameter: source,
									allTopics: topics,
									triggerTopic,
									variables,
									expectedTypes: [AnyFactorType.ANY],
									array: false
								});
							if (!invalid) {
								// pass validate
								const built = tryToBuildVariable({action, variables, topics, triggerTopic});
								if (!built) {
									// cannot build variable, return true as failed.
									return true;
								}
							}
							return invalid;
						} else if (isReadTopicAction(action)) {
							const {topicId, variableName, by} = action;
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic
								|| !variableName || variableName.trim().length === 0
								|| !by || !isJointValid4Pipeline({
									joint: by,
									allTopics: [topic, triggerTopic],
									triggerTopic,
									variables
								})) {
								return true;
							}
							if (isReadFactorAction(action) || isReadFactorsAction(action)) {
								const {factorId} = action;
								// eslint-disable-next-line
								const factor = topic.factors.find(factor => factor.factorId == factorId);
								if (!factor) {
									return true;
								}
							}

							const built = tryToBuildVariable({action, variables, topics, triggerTopic});
							if (!built) {
								// cannot build variable, return true as failed.
								return true;
							}
							// pass all validation
							return false;
						} else if (isInsertRowAction(action) || isMergeRowAction(action)) {
							const {topicId, mapping} = action;
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic) {
								return true;
							}
							if (!mapping || mapping.length === 0) {
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
								return true;
							}
							if (isMergeRowAction(action)) {
								const {by} = action;
								return !by || !isJointValid4Pipeline({
									joint: by,
									allTopics: [topic, triggerTopic],
									triggerTopic,
									variables
								});
							} else {
								// pass validation
								return false;
							}
						} else if (isWriteFactorAction(action)) {
							const {topicId, factorId, by} = action;
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic) {
								return true;
							}
							// eslint-disable-next-line
							const factor = topic.factors.find(factor => factor.factorId == factorId);
							if (!factor) {
								return true;
							}
							return !by || !isJointValid4Pipeline({
								joint: by,
								allTopics: [topic, triggerTopic],
								triggerTopic,
								variables
							});
						} else {
							return true;
						}
					});
				});
			});

			if (!pass) {
				pipeline.validated = false;
				resolve('There is something incorrect in pipeline definition, view it in dsl panel for detail information.');
				return;
			}

			pipeline.validated = true;
			resolve(true);
		});
	};
};