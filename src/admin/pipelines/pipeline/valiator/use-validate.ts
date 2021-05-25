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
import {isJointValid4DataSet, isParameterValid4DataSet} from '../../../../services/tuples/dataset-validation-utils';
import {AnyFactorType} from '../../../../services/tuples/factor-calculator-types';

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
			const topic = topics.find(topic => topic.topicId == topicId);
			if (!topic) {
				pipeline.validated = false;
				resolve('Pipeline source topic is mismatched.');
				return;
			}

			if (conditional) {
				if (!on) {
					pipeline.validated = false;
					resolve('Pipeline prerequisite is not given yet.');
					return;
				}
				if (!isJointValid4DataSet(on, [topic])) {
					pipeline.validated = false;
					resolve('Pipeline prerequisite is incorrect.');
					return;
				}
			}

			const pass = !stages.some(stage => {
				// return true when fail on validation
				const {conditional, on, units} = stage;
				if (conditional) {
					if (!on) {
						return true;
					}
					if (!isJointValid4DataSet(on, topics)) {
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
						if (!isJointValid4DataSet(on, topics)) {
							return true;
						}
					}
					return actions.some(action => {
						// return true when fail on validation
						if (isAlarmAction(action)) {
							const {severity, on, conditional, message} = action;
							return !severity
								|| (conditional && (!on || !isJointValid4DataSet(on, topics)))
								|| !message || message.trim().length === 0;
						} else if (isCopyToMemoryAction(action)) {
							const {variableName, source} = action;
							return !variableName || variableName.trim().length === 0
								|| !source || !isParameterValid4DataSet({
									parameter: source,
									topics,
									expectedTypes: [AnyFactorType.ANY],
									array: false
								});
						} else if (isReadTopicAction(action)) {
							const {topicId, variableName, by} = action;
							// eslint-disable-next-line
							const topic = topics.find(topic => topic.topicId == topicId);
							if (!topic
								|| !variableName || variableName.trim().length === 0
								|| !by || !isJointValid4DataSet(by, topics)) {
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
							// pass validation
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
								return !factor || !isParameterValid4DataSet({
									parameter: source,
									topics,
									expectedTypes: [factor.type],
									array: false
								});
							});
							if (fail) {
								return true;
							}
							if (isMergeRowAction(action)) {
								const {by} = action;
								return !by || !isJointValid4DataSet(by, topics);
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
							return !by || !isJointValid4DataSet(by, topics);
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