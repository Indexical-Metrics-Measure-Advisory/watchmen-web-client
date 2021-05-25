import {AnyFactorType, Parameter, ParameterExpressionOperator} from '../../../services/tuples/factor-calculator-types';
import {Subject, SubjectDataSetFilterJoint} from '../../../services/tuples/subject-types';
import {isExpressionFilter, isJointFilter} from '../../../services/tuples/subject-utils';
import {Topic} from '../../../services/tuples/topic-types';
import {
	isExpressionValid4DataSet,
	isJointValid4DataSet,
	isParameterValid4DataSet
} from '../../../services/tuples/dataset-validation-utils';
import {isComputedParameter, isTopicFactorParameter} from '../../../services/tuples/parameter-utils';

const getTopicIdsFromParameter = (parameter: Parameter): Array<string> => {
	if (isTopicFactorParameter(parameter)) {
		return [parameter.topicId];
	} else if (isComputedParameter(parameter)) {
		const {parameters} = parameter;
		return parameters.map(parameter => getTopicIdsFromParameter(parameter)).flat();
	} else {
		return [];
	}
};

const getTopicIdsFromFilter = (joint: SubjectDataSetFilterJoint): Array<string> => {
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

export const isDefValid = (subject: Subject, topics: Array<Topic>) => {
	const {dataset} = subject;
	if (!dataset) {
		return false;
	}

	// validate subject definition
	const {columns} = dataset;
	if (!columns || columns.length === 0) {
		return false;
	}
	const hasInvalidColumn = columns.some(({parameter, alias}) => {
		return !alias || alias.trim().length === 0 || !isParameterValid4DataSet({
			parameter,
			topics,
			expectedTypes: [AnyFactorType.ANY],
			array: false
		});
	});
	if (hasInvalidColumn) {
		return false;
	}

	const {filters} = dataset;
	if (!filters || !filters.jointType) {
		return false;
	}
	if (filters.filters.length !== 0) {
		const hasInvalidFilter = filters.filters.some(filter => {
			if (isJointFilter(filter)) {
				return !isJointValid4DataSet(filter, topics);
			} else if (isExpressionFilter(filter)) {
				return !isExpressionValid4DataSet(filter, topics);
			} else {
				return true;
			}
		});
		if (hasInvalidFilter) {
			return false;
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
		return false;
	}
	const topicIdsInJoins = Array.from(new Set((joins || []).reduce((topicIds, {topicId, secondaryTopicId}) => {
		topicIds.push(topicId, secondaryTopicId);
		return topicIds;
	}, [] as Array<string>)));
	const topicIdsInColumns = Array.from(new Set(columns.map(({parameter}) => getTopicIdsFromParameter(parameter)).flat()));
	const topicIdsInFilters = Array.from(new Set(getTopicIdsFromFilter(filters)));
	if (topicIdsInJoins.length === 0) {
		// no join, single source topic
		if (topicIdsInColumns.length > 1 || topicIdsInFilters.length > 1) {
			return false;
		}
		if (topicIdsInColumns.length === 1 && topicIdsInFilters.length === 1) {
			// eslint-disable-next-line
			return topicIdsInColumns[0] == topicIdsInFilters[0];
		}
	} else {
		const columnTopicNotInJoin = topicIdsInColumns.some(topicId => !topicIdsInJoins.includes(topicId));
		if (columnTopicNotInJoin) {
			return false;
		}
		const filterTopicNotInJoin = topicIdsInFilters.some(topicId => !topicIdsInJoins.includes(topicId));
		if (filterTopicNotInJoin) {
			return false;
		}
		if (topicIdsInColumns.length !== topicIdsInJoins.length) {
			// every topic in column must be declared in joins
			return false;
		}
	}

	return true;
};