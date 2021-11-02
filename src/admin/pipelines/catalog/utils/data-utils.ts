import {isWriteTopicAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {TopicId} from '@/services/data/tuples/topic-types';

export const computeRelatedTopicIds = (pipeline: Pipeline): Array<{ source: string, target: string }> => {
	const sourceTopicId = pipeline.topicId;

	return pipeline.stages.map(stage => {
		return stage.units.map(unit => {
			return unit.do.map(action => {
				if (!isWriteTopicAction(action)) {
					return null;
				}

				const {topicId} = action;
				return topicId;
			}).filter(x => !!x) as Array<TopicId>;
		}).flat();
	}).flat().map(targetTopicId => {
		return {source: sourceTopicId, target: targetTopicId};
	});
};
