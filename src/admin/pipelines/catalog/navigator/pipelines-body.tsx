import { isWriteTopicAction } from '../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import { Pipeline } from '../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../services/tuples/topic-types';
import {
	NoPipelines,
	PipelineDirection,
	PipelineName,
	PipelineRowContainer,
	PipelinesBodyContainer,
	TopicSmall
} from './pipelines-widgets';

interface AssembledPipeline {
	pipeline: Pipeline;
	from: Topic;
	to: Array<Topic>;
}

const assemblePipeline = (topics: Map<string, Topic>) => (pipeline: Pipeline): AssembledPipeline => {
	return {
		pipeline, from: topics.get(pipeline.topicId)!,
		to: pipeline.stages.map(({ units }) => {
			return units.map(({ do: actions }) => {
				return actions.map(action => {
					if (!isWriteTopicAction(action)) {
						return null;
					}
					return action.topicId;
				}).filter(x => !!x) as Array<string>;
			}).flat();
		}).flat()
			.map(topicId => topics.get(topicId))
			.filter(x => !!x) as Array<Topic>
	};
};

export const PipelinesBody = (props: {
	pipelines: Array<Pipeline>;
	topics: Array<Topic>;
	topic: Topic | null;
	visible: boolean;
	incoming: boolean;
}) => {
	const { pipelines: allPipelines, topics, topic, incoming, visible } = props;

	const topicsMap: Map<string, Topic> = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());
	let pipelines: Array<AssembledPipeline>;
	if (!topic) {
		pipelines = [];
	} else if (incoming) {
		pipelines = allPipelines.filter(({ stages }: Pipeline) => {
			return stages.some(({ units }) => {
				return units.some(({ do: actions }) => {
					return actions.some(action => {
						if (!isWriteTopicAction(action)) {
							return false;
						}
						// eslint-disable-next-line
						return action.topicId == topic.topicId;
					});
				});
			});
		}).map(assemblePipeline(topicsMap));
	} else {
		// eslint-disable-next-line
		pipelines = allPipelines.filter(pipeline => pipeline.topicId == topic.topicId).map(assemblePipeline(topicsMap));
	}

	return <PipelinesBodyContainer visible={visible}>
		{pipelines.length === 0
			? <NoPipelines>{incoming ? 'No incoming pipeline.' : 'No outgoing pipeline.'}</NoPipelines>
			: pipelines.map(({ pipeline, from, to }) => {
				return <PipelineRowContainer key={pipeline.pipelineId}>
					<PipelineName>{pipeline.name || 'Noname Pipeline'}</PipelineName>
					<PipelineDirection rows={incoming ? 1 : to.length}>{incoming ? 'From' : 'To'}</PipelineDirection>
					{incoming
						? <TopicSmall>{from.name}</TopicSmall>
						: to.map(topic => {
							return <TopicSmall key={topic.topicId}>{topic.name}</TopicSmall>;
						})}

				</PipelineRowContainer>;
			})}
	</PipelinesBodyContainer>;
};