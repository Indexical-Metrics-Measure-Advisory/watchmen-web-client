import {
	SubjectDataSet,
	SubjectDataSetColumn,
	SubjectDataSetFilter,
	SubjectDataSetJoin
} from '../../../services/tuples/subject-types';

const computeRelatedTopicIdsByFilter = (filter: SubjectDataSetFilter): Array<string> => {
	// TODO compute related topic ids by dataset filter
	return [];
};
const computeRelatedTopicIdsByColumn = (column: SubjectDataSetColumn): Array<string> => {
	return [ column.topicId, column.secondaryTopicId ].filter(x => !!x) as Array<string>;
};
const computeRelatedTopicIdsByJoin = (join: SubjectDataSetJoin): Array<string> => {
	// TODO compute related topic ids by dataset join
	return [];
};
export const computeRelatedTopicIds = (dataset: SubjectDataSet): Array<string> => {
	const { filters, columns, joins } = dataset;

	return Array.from(new Set([
		...filters.map(filter => computeRelatedTopicIdsByFilter(filter)).flat(),
		...columns.map(column => computeRelatedTopicIdsByColumn(column)).flat(),
		...joins.map(join => computeRelatedTopicIdsByJoin(join)).flat()
	]));
};