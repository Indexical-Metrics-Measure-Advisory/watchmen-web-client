import {Computed, Parameter} from '../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isTopicFactorParameter
} from '../../services/tuples/factor-calculator-utils';
import {
	SubjectDataSet,
	SubjectDataSetColumn,
	SubjectDataSetFilter,
	SubjectDataSetJoin
} from '../../services/tuples/subject-types';
import {isExpressionFilter, isJointFilter} from '../../services/tuples/subject-utils';

const computeRelatedTopicIdsByComputed = (computed: Computed): Array<string> => {
	const topicIds: Array<string> = computed.parameters.reduce<Array<string>>((topicIds, param) => {
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

const computeTopicIdsByParameter = (parameter?: Parameter): Array<string> => {
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

const computeRelatedTopicIdsByFilter = (filter: SubjectDataSetFilter): Array<string> => {
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

const computeRelatedTopicIdsByColumn = (column: SubjectDataSetColumn): Array<string> => {
	return computeTopicIdsByParameter(column.parameter);
};

const computeRelatedTopicIdsByJoin = (join: SubjectDataSetJoin): Array<string> => {
	return [join.topicId, join.secondaryTopicId].filter(x => !!x);
};

export const computeRelatedTopicIds = (dataset: SubjectDataSet): Array<string> => {
	const {filters, columns, joins} = dataset;

	return Array.from(new Set([
		...computeRelatedTopicIdsByFilter(filters).flat(),
		...columns.map(column => computeRelatedTopicIdsByColumn(column)).flat(),
		...joins.map(join => computeRelatedTopicIdsByJoin(join)).flat()
	]));
};