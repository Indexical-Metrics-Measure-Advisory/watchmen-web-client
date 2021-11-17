import {
	isExpressionValid4DataSet,
	isJointValid4DataSet,
	isParameterValid4DataSet
} from '@/services/data/tuples/dataset-validation-utils';
import {
	AnyFactorType,
	Parameter,
	ParameterExpressionOperator,
	ParameterInvalidReasonsLabels
} from '@/services/data/tuples/factor-calculator-types';
import {isComputedParameter, isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {Subject, SubjectDataSetFilterJoint} from '@/services/data/tuples/subject-types';
import {isExpressionFilter, isJointFilter} from '@/services/data/tuples/subject-utils';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {againstSnakeCaseName} from '@/services/utils';

const getTopicIdsFromParameter = (parameter: Parameter): Array<TopicId> => {
	if (isTopicFactorParameter(parameter)) {
		return [parameter.topicId];
	} else if (isComputedParameter(parameter)) {
		const {parameters} = parameter;
		return parameters.map(parameter => getTopicIdsFromParameter(parameter)).flat();
	} else {
		return [];
	}
};

const getTopicIdsFromFilter = (joint: SubjectDataSetFilterJoint): Array<TopicId> => {
	return joint.filters.map(filter => {
		if (isJointFilter(filter)) {
			return getTopicIdsFromFilter(filter);
		} else if (isExpressionFilter(filter)) {
			const {left, operator, right} = filter;
			const leftTopicIds = getTopicIdsFromParameter(left);
			const rightTopicIds = (
				operator !== ParameterExpressionOperator.EMPTY
				&& operator !== ParameterExpressionOperator.NOT_EMPTY
			) ? getTopicIdsFromParameter(right) : [];
			return [...leftTopicIds, ...rightTopicIds];
		} else {
			return [];
		}
	}).flat();
};

export const isDefValid = (subject: Subject, topics: Array<Topic>): { valid: boolean, messages: Array<string> } => {
	const {dataset} = subject;
	if (!dataset) {
		return {valid: false, messages: ['No dataset defined.']};
	}

	// validate subject definition
	const {columns} = dataset;
	if (!columns || columns.length === 0) {
		return {valid: false, messages: ['No columns defined.']};
	}
	let columnInvalidMessage = '';
	const hasInvalidColumn = columns.some(({parameter, alias}, index) => {
		if (!alias || alias.trim().length === 0) {
			columnInvalidMessage = `Column[#${index + 1}] is incorrect caused by no name specified.`;
			return true;
		} else if (againstSnakeCaseName(alias.trim())) {
			columnInvalidMessage = `Column[#${index + 1}] is incorrect caused by name cannot start with digit and must follow snake case.`;
			return true;
		}
		return !isParameterValid4DataSet({
			parameter,
			topics,
			expectedTypes: [AnyFactorType.ANY],
			array: false,
			reasons: (reason) => {
				columnInvalidMessage = `Column[#${index + 1}] is incorrect caused by ${ParameterInvalidReasonsLabels[reason]}.`;
			}
		});
	});
	if (hasInvalidColumn) {
		return {valid: false, messages: [columnInvalidMessage]};
	}

	const {filters} = dataset;
	if (!filters || !filters.jointType) {
		return {valid: false, messages: ['No filter defined.']};
	}
	if (filters.filters.length !== 0) {
		let filterInvalidMessage = '';
		const hasInvalidFilter = filters.filters.some(filter => {
			if (isJointFilter(filter)) {
				return !isJointValid4DataSet({
					joint: filter, topics, reasons: (reason) => {
						filterInvalidMessage = `Filter is incorrect caused by ${ParameterInvalidReasonsLabels[reason]}.`;
					}
				});
			} else if (isExpressionFilter(filter)) {
				return !isExpressionValid4DataSet({
					expression: filter, topics, reasons: (reason) => {
						filterInvalidMessage = `Filter is incorrect caused by ${ParameterInvalidReasonsLabels[reason]}.`;
					}
				});
			} else {
				return true;
			}
		});
		if (hasInvalidFilter) {
			return {valid: false, messages: [filterInvalidMessage]};
		}
	}

	const {joins} = dataset;
	const hasInvalidJoin = (joins || []).some(({topicId, factorId, secondaryTopicId, secondaryFactorId, type}) => {
		if (!type || !topicId || !factorId || !secondaryTopicId || !secondaryFactorId) {
			return true;
		}
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
		// eslint-disable-next-line
		const secondaryTopic = topics.find(topic => topic.topicId == secondaryTopicId);
		if (!secondaryTopic) {
			return true;
		}
		// eslint-disable-next-line
		const secondaryFactor = secondaryTopic.factors.find(factor => factor.factorId == secondaryFactorId);
		// noinspection RedundantIfStatementJS
		if (!secondaryFactor) {
			return true;
		}

		return false;
	});
	if (hasInvalidJoin) {
		return {valid: false, messages: ['Invalid join defined.']};
	}
	const topicIdsInJoins = Array.from(new Set((joins || []).reduce((topicIds, {topicId, secondaryTopicId}) => {
		topicIds.push(topicId, secondaryTopicId);
		return topicIds;
	}, [] as Array<TopicId>)));
	const topicIdsInColumns = Array.from(new Set(columns.map(({parameter}) => getTopicIdsFromParameter(parameter)).flat()));
	const topicIdsInFilters = Array.from(new Set(getTopicIdsFromFilter(filters)));
	if (topicIdsInJoins.length === 0) {
		// no join, single source topic
		if (topicIdsInColumns.length > 1 || topicIdsInFilters.length > 1) {
			return {valid: false, messages: ['Join of topics in columns or filters should be defined.']};
		}
		if (topicIdsInColumns.length === 1 && topicIdsInFilters.length === 1 && topicIdsInColumns[0] !== topicIdsInFilters[0]) {
			// eslint-disable-next-line
			return {valid: false, messages: ['Topic in columns and filters is mismatched.']};
		}
	} else {
		const columnTopicNotInJoin = topicIdsInColumns.some(topicId => !topicIdsInJoins.includes(topicId));
		if (columnTopicNotInJoin) {
			return {valid: false, messages: ['Join of topics in columns should be defined.']};
		}
		const filterTopicNotInJoin = topicIdsInFilters.some(topicId => !topicIdsInJoins.includes(topicId));
		if (filterTopicNotInJoin) {
			return {valid: false, messages: ['Join of topics in filters should be defined.']};
		}
	}

	// valid
	return {valid: true, messages: []};
};