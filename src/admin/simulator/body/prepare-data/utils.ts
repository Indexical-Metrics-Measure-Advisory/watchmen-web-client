import {
	isReadTopicAction,
	isWriteTopicAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {getPipelineName} from '../../utils';

export interface FlowTreePipelineNode {
	pipeline: Pipeline;
	readTopics: Array<FlowTreeTopicNode>;
	writeTopics: Array<FlowTreeTopicNode>;
	checked: boolean;
	parent: FlowTreeTopicNode;
}

export interface FlowTreeTopicNode {
	topic: Topic;
	loop: boolean;
	pipelines: Array<FlowTreePipelineNode>;
	parent: FlowTreePipelineNode | null;
}

const buildPipelineNodes = (
	availablePipelines: Array<Pipeline>,
	pipelines: Array<Pipeline>,
	topicNode: FlowTreeTopicNode,
	topics: Array<Topic>,
	ancestors: Array<Topic>
) => {
	const topic = topicNode.topic;

	return availablePipelines
		// eslint-disable-next-line
		.filter(pipeline => pipeline.topicId == topic.topicId)
		.sort((p1, p2) => {
			return getPipelineName(p1).toLowerCase().localeCompare(getPipelineName(p2).toLowerCase());
		}).map(pipeline => {
			const readTopics: Array<FlowTreeTopicNode> = [];
			const writeTopics: Array<FlowTreeTopicNode> = [];
			const pipelineNode = {
				pipeline,
				readTopics,
				writeTopics,
				checked: false,
				parent: topicNode
			} as FlowTreePipelineNode;
			pipeline.stages.forEach(stage => {
				stage.units.forEach(unit => {
					unit.do.forEach(action => {
						if (isReadTopicAction(action)) {
							// eslint-disable-next-line
							const readTopic = topics.find(t => t.topicId == action.topicId)!;
							readTopics.push(buildTopicNode(readTopic, pipelineNode, [], [...new Set([topic, ...ancestors])], topics, pipelines, false));
						} else if (isWriteTopicAction(action)) {
							// eslint-disable-next-line
							const writeTopic = topics.find(t => t.topicId == action.topicId)!;
							writeTopics.push(buildTopicNode(writeTopic, pipelineNode, [], [...new Set([topic, ...ancestors])], topics, pipelines, true));
						}
					});
				});
			});
			return pipelineNode;
		});
};

export const buildTopicNode = (
	topic: Topic,
	parent: FlowTreePipelineNode | null,
	availablePipelines: Array<Pipeline>,
	ancestors: Array<Topic>,
	topics: Array<Topic>,
	pipelines: Array<Pipeline>,
	deep: boolean
): FlowTreeTopicNode => {
	const loop = ancestors.includes(topic);
	const topicNode = {topic, loop, parent} as FlowTreeTopicNode;
	topicNode.pipelines = (loop || !deep)
		? []
		: buildPipelineNodes(availablePipelines.length === 0 ? pipelines : availablePipelines, pipelines, topicNode, topics, ancestors);
	return topicNode;
};