import { Computed } from '../../../services/tuples/factor-calculator-types';
import {
	isComputedParameter,
	isConstantParameter,
	isTopicFactorParameter
} from '../../../services/tuples/factor-calculator-utils';
import {
	SubjectDataSet,
	SubjectDataSetColumn,
	SubjectDataSetFilter,
	SubjectDataSetJoin
} from '../../../services/tuples/subject-types';
import { isExpressionFilter, isJointFilter } from '../../../services/tuples/subject-utils';

const computeRelatedTopicIdsByFilter = (filter: SubjectDataSetFilter): Array<string> => {
	if (isJointFilter(filter)) {
		const topicIds = filter.filters.map(filter => computeRelatedTopicIdsByFilter(filter)).flat().filter(x => !!x);
		return Array.from(new Set(topicIds));
	} else if (isExpressionFilter(filter)) {
		const topicIds = [ ...computeRelatedTopicIdsByComputed(filter.left), ...computeRelatedTopicIdsByComputed(filter.right) ];
		return Array.from(new Set(topicIds));
	} else {
		return [];
	}
};
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
const computeRelatedTopicIdsByColumn = (column: SubjectDataSetColumn): Array<string> => {
	return computeRelatedTopicIdsByComputed(column);
};
const computeRelatedTopicIdsByJoin = (join: SubjectDataSetJoin): Array<string> => {
	return [ join.topicId, join.secondaryTopicId ].filter(x => !!x);
};
export const computeRelatedTopicIds = (dataset: SubjectDataSet): Array<string> => {
	const { filters, columns, joins } = dataset;

	return Array.from(new Set([
		...filters.map(filter => computeRelatedTopicIdsByFilter(filter)).flat(),
		...columns.map(column => computeRelatedTopicIdsByColumn(column)).flat(),
		...joins.map(join => computeRelatedTopicIdsByJoin(join)).flat()
	]));
};