import {Computed, Parameter} from '@/services/data/tuples/factor-calculator-types';
import {isComputedParameter, isConstantParameter, isTopicFactorParameter} from '@/services/data/tuples/parameter-utils';
import {
	SubjectDataSet,
	SubjectDataSetColumn,
	SubjectDataSetFilter,
	SubjectDataSetJoin
} from '@/services/data/tuples/subject-types';
import {isExpressionFilter, isJointFilter} from '@/services/data/tuples/subject-utils';
import {TopicId} from '@/services/data/tuples/topic-types';

const computeRelatedTopicIdsByComputed = (computed: Computed): Array<TopicId> => {
	const topicIds: Array<TopicId> = computed.parameters.reduce<Array<TopicId>>((topicIds, param) => {
		if (isTopicFactorParameter(param)) {
			topicIds.push(param.topicId);
		} else if (isConstantParameter(param)) {
			// do nothing
		} else if (isComputedParameter(param)) {
			topicIds.push(...computeRelatedTopicIdsByComputed(param));
		}
		return topicIds;
	}, []).filter(topicId => !!topicId);
	return Array.from(new Set(topicIds));
};

const computeTopicIdsByParameter = (parameter?: Parameter): Array<TopicId> => {
	if (!parameter) {
		return [];
	}
	if (isTopicFactorParameter(parameter)) {
		return parameter.topicId ? [parameter.topicId] : [];
	} else if (isConstantParameter(parameter)) {
		return [];
	} else if (isComputedParameter(parameter)) {
		return computeRelatedTopicIdsByComputed(parameter);
	} else {
		return [];
	}
};

const computeRelatedTopicIdsByFilter = (filter: SubjectDataSetFilter): Array<TopicId> => {
	if (isJointFilter(filter)) {
		const topicIds = filter.filters.map(filter => computeRelatedTopicIdsByFilter(filter)).flat().filter(x => !!x);
		return Array.from(new Set(topicIds));
	} else if (isExpressionFilter(filter)) {
		const topicIds = [...computeTopicIdsByParameter(filter.left), ...computeTopicIdsByParameter(filter.right)];
		return Array.from(new Set(topicIds));
	} else {
		return [];
	}
};

const computeRelatedTopicIdsByColumn = (column: SubjectDataSetColumn): Array<TopicId> => {
	return computeTopicIdsByParameter(column.parameter);
};

const computeRelatedTopicIdsByJoin = (join: SubjectDataSetJoin): Array<TopicId> => {
	return [join.topicId, join.secondaryTopicId].filter(x => !!x);
};

export const computeRelatedTopicIds = (dataset: SubjectDataSet): Array<TopicId> => {
	const {filters, columns, joins} = dataset;

	return Array.from(new Set([
		...computeRelatedTopicIdsByFilter(filters).flat(),
		...columns.map(column => computeRelatedTopicIdsByColumn(column)).flat(),
		...joins.map(join => computeRelatedTopicIdsByJoin(join)).flat()
	]));
};