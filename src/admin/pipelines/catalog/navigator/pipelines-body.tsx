import {toPipeline} from '@/routes/utils';
import {isWriteTopicAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {findPipelinesTriggerByTopic, findPipelinesWriteToTopic} from '@/services/data/tuples/pipeline-utils';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {ICON_PIPELINE} from '@/widgets/basic/constants';
import {TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useHistory} from 'react-router-dom';
import {
	NoPipelines,
	PipelineButton,
	PipelineDirection,
	PipelineName,
	PipelineNameLabel,
	PipelineRowContainer,
	PipelinesBodyContainer,
	PipelinesWrapper,
	PipelineTopic,
	PipelineTopicLabel
} from './pipelines-widgets';

interface AssembledPipeline {
	pipeline: Pipeline;
	from: Topic;
	to: Array<Topic>;
}

const assemblePipeline = (topics: Map<string, Topic>) => (pipeline: Pipeline): AssembledPipeline => {
	return {
		pipeline, from: topics.get(pipeline.topicId)!,
		to: pipeline.stages.map(({units}) => {
			return units.map(({do: actions}) => {
				return actions.map(action => {
					if (!isWriteTopicAction(action)) {
						return null;
					}
					return action.topicId;
				}).filter(x => !!x) as Array<TopicId>;
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
	const {pipelines: allPipelines, topics, topic, incoming, visible} = props;

	const history = useHistory();

	const topicsMap: Map<string, Topic> = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());
	let pipelines: Array<AssembledPipeline>;
	if (!topic) {
		pipelines = [];
	} else if (incoming) {
		pipelines = findPipelinesWriteToTopic(allPipelines, topic).map(assemblePipeline(topicsMap));
	} else {
		pipelines = findPipelinesTriggerByTopic(allPipelines, topic).map(assemblePipeline(topicsMap));
	}

	const onPipelineClicked = (pipeline: Pipeline) => () => {
		history.push(toPipeline(pipeline.pipelineId));
	};

	return <PipelinesBodyContainer visible={visible}>
		{pipelines.length === 0
			? <NoPipelines>{incoming ? 'No incoming pipeline.' : 'No outgoing pipeline.'}</NoPipelines>
			: <PipelinesWrapper>
				{pipelines.map(({pipeline, from, to}) => {
					const toTopics = Array.from(new Set(to));
					return <PipelineRowContainer key={pipeline.pipelineId}>
						<PipelineName>
							<PipelineNameLabel>{pipeline.name || 'Noname Pipeline'}</PipelineNameLabel>
						</PipelineName>
						<PipelineButton
							tooltip={{label: 'Open Pipeline', alignment: TooltipAlignment.RIGHT, offsetX: 6}}
							onClick={onPipelineClicked(pipeline)}>
							<FontAwesomeIcon icon={ICON_PIPELINE}/>
						</PipelineButton>
						<PipelineDirection
							rows={incoming ? 1 : toTopics.length}>{incoming ? 'From' : 'To'}</PipelineDirection>
						{incoming
							? <PipelineTopic>
								<PipelineTopicLabel>{from?.name}</PipelineTopicLabel>
							</PipelineTopic>
							: toTopics.map(topic => {
								return <PipelineTopic key={topic.topicId}>
									<PipelineTopicLabel>{topic.name}</PipelineTopicLabel>
								</PipelineTopic>;
							})}
					</PipelineRowContainer>;
				})}
			</PipelinesWrapper>
		}
	</PipelinesBodyContainer>;
};