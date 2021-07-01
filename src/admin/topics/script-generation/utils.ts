import {Topic} from '../../../services/tuples/topic-types';
import {Factor} from '../../../services/tuples/factor-types';

export type IndexGroups = { [key in string]: Array<Factor> };

const collectIndexes = (topic: Topic, prefix: string): IndexGroups => {
	return topic.factors.reduce((map, factor) => {
		if (factor.indexGroup && factor.indexGroup.startsWith(prefix)) {
			let factors = map[factor.indexGroup];
			if (!factors) {
				factors = [];
				map[factor.indexGroup] = factors;
			}
			factors.push(factor);
		}
		return map;
	}, {} as IndexGroups);
};
export const gatherUniqueIndexes = (topic: Topic): IndexGroups => {
	return collectIndexes(topic, 'u-');
};
export const gatherIndexes = (topic: Topic): IndexGroups => {
	return collectIndexes(topic, 'i-');
};

export const asTopicName = (topic: Topic) => {
	return topic.name.toLowerCase().replaceAll('-', '_').replaceAll(' ', '_');
};
export const asFullTopicName = (topic: Topic) => {
	return `topic_${asTopicName(topic)}`;
};
export const asFactorName = (factor: Factor) => {
	return factor.name.toLowerCase().replaceAll('-', '_').replaceAll(' ', '_');
};
export const getIdColumnName = () => 'id_';
export const getRawTopicDataColumnName = () => 'data_';
export const getAggregateAssistColumnName = () => 'aggregate_assist_';
export const getVersionColumnName = () => 'version_';
export const getInsertTimeColumnName = () => 'insert_time_';
export const getUpdateTimeColumnName = () => 'update_time_'
export const asUniqueIndexName = (topic: Topic) => `u_${asTopicName(topic)}`;
export const asIndexName = (topic: Topic) => `i_${asTopicName(topic)}`;