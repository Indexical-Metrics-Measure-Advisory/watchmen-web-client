import {
	isReadTopicAction,
	isWriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {TopicId} from '@/services/data/tuples/topic-types';

/**
 * source write target
 */
export const computeWriteFlowTopicIds = (pipeline: Pipeline): Array<{ source: TopicId, target: TopicId }> => {
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

/**
 * source read target
 */
export const computeReadFlowTopicIds = (pipelines: Array<Pipeline>, topicId: TopicId): Array<{ source: TopicId, target: TopicId }> => {
	return pipelines.map(pipeline => {
		return pipeline.stages.map(stage => {
			return stage.units.map(unit => {
				return unit.do.map(action => {
					if (!isReadTopicAction(action)) {
						return null;
					}
					const {topicId} = action;
					return topicId;
				}).filter(x => !!x) as Array<TopicId>;
			}).flat();
		}).flat();
	}).flat().map(sourceTopicId => {
		return {source: sourceTopicId, target: topicId};
	});
};