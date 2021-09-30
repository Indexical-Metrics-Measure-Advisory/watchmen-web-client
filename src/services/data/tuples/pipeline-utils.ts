import {isWriteTopicAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from './pipeline-types';
import {Topic} from './topic-types';

export const findPipelinesWriteToTopic = (pipelines: Array<Pipeline>, topic: Topic): Array<Pipeline> => {
	return pipelines.filter(({stages}: Pipeline) => {
		return stages.some(({units}) => {
			return units.some(({do: actions}) => {
				return actions.some(action => {
					if (!isWriteTopicAction(action)) {
						return false;
					}
					// eslint-disable-next-line
					return action.topicId == topic.topicId;
				});
			});
		});
	});
};
export const findPipelinesTriggerByTopic = (pipelines: Array<Pipeline>, topic: Topic): Array<Pipeline> => {
	// eslint-disable-next-line
	return pipelines.filter(pipeline => pipeline.topicId == topic.topicId);
};