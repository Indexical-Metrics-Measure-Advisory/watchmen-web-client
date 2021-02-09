import React from 'react';
import { Lang } from '../../../../../langs';
import { Factor } from '../../../../../services/tuples/factor-types';
import { Subject, TopicJoinType } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import {
	DotNode,
	EqualsNode,
	ExoticNode,
	FactorNode,
	JoinNode,
	NamePair,
	OnNode,
	TopicNode,
	UnknownNode
} from './from-widgets';
import { EmptyPart, PartContent } from './widgets';

const findTopicAndFactor = (options: {
	topicId: string;
	factorId: string;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): { topic?: Topic, topicPicked: boolean, factor?: Factor } => {
	const { topicId, factorId, availableTopicsMap, pickedTopicsMap } = options;

	let topic, topicPicked = false, factor;
	if (topicId) {
		topic = pickedTopicsMap.get(topicId);
	}
	if (topic) {
		topicPicked = true;
	} else {
		topic = availableTopicsMap.get(topicId);
	}
	if (factorId && topic) {
		// eslint-disable-next-line
		factor = topic.factors.find(factor => factor.factorId == factorId);
	}
	return { topic, topicPicked, factor };
};

const beautifyJoins = (options: {
	subject: Subject;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}) => {
	const { subject, availableTopicsMap, pickedTopicsMap } = options;

	return [ ...subject.dataset.joins ]
		.map(join => {
			const tf1 = findTopicAndFactor({
				topicId: join.topicId,
				factorId: join.factorId,
				pickedTopicsMap,
				availableTopicsMap
			});
			const tf2 = findTopicAndFactor({
				topicId: join.secondaryTopicId,
				factorId: join.secondaryFactorId,
				pickedTopicsMap,
				availableTopicsMap
			});
			return { ...join, first: tf1, second: tf2 };
		}).sort((j1, j2) => {
			// unknown to last
			if (!j1.first.topic) {
				return 1;
			} else if (!j2.first.topic) {
				return -1;
			}
			j1.first.topic.name.toLowerCase();
			const compareFirstTopicName = j1.first.topic.name.toLowerCase().localeCompare(j2.first.topic.name.toLowerCase());
			if (compareFirstTopicName === 0) {
				// 2 joins from same topic, continue compare second topic
				if (!j1.second.topic) {
					return 1;
				} else if (!j2.second.topic) {
					return -1;
				}
				const compareSecondTopicName = j1.second.topic.name.toLowerCase().localeCompare(j2.second.topic.name.toLowerCase());
				if (compareSecondTopicName === 0) {
					// 2 joins from same topic and joined same topic, continue compare join type
					if ((j1.type === TopicJoinType.INNER && j2.type !== TopicJoinType.INNER)
						|| (j1.type === TopicJoinType.LEFT && j2.type === TopicJoinType.RIGHT)) {
						return -1;
					} else if ((j2.type === TopicJoinType.INNER && j1.type !== TopicJoinType.INNER)
						|| (j2.type === TopicJoinType.LEFT && j1.type === TopicJoinType.RIGHT)) {
						return 1;
					}
					// same join type, continue compare factor
					if (!j1.first.factor) {
						return 1;
					} else if (!j2.first.factor) {
						return -1;
					}
					const compareFirstFactorName = j1.first.factor.name.toLowerCase().localeCompare(j2.first.factor.name.toLowerCase());
					if (compareFirstFactorName === 0) {
						// 2 joins from same topic and joined same topic, from same factor, continue compare second factor
						if (!j1.second.factor) {
							return 1;
						} else if (!j2.second.factor) {
							return -1;
						}
						return j1.second.factor.name.toLowerCase().localeCompare(j2.second.factor.name.toLowerCase());
					}
					return compareFirstFactorName;
				}
				return compareSecondTopicName;
			}
			return compareFirstTopicName;
		});
};

const JoinLabels: { [key in TopicJoinType]: string } = {
	[TopicJoinType.INNER]: Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_INNER,
	[TopicJoinType.LEFT]: Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_LEFT,
	[TopicJoinType.RIGHT]: Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_RIGHT
};

const TopicName = (props: { topic: Topic | null, picked: boolean }) => {
	const { topic, picked } = props;

	if (topic && picked) {
		return <TopicNode>{topic.name}</TopicNode>;
	} else if (topic && !picked) {
		return <ExoticNode><TopicNode>{topic.name}</TopicNode></ExoticNode>;
	} else {
		return <UnknownNode><TopicNode>?</TopicNode></UnknownNode>;
	}
};
const FactorName = (props: { topic: Topic | null, picked: boolean, factor: Factor | null }) => {
	const { topic, picked, factor } = props;

	return <NamePair>
		<TopicName topic={topic} picked={picked}/>
		<Dot/>
		{factor
			? <FactorNode>{factor.label || factor.name}</FactorNode>
			: <UnknownNode><FactorNode>?</FactorNode></UnknownNode>}
	</NamePair>;
};

const Join = (props: { type: TopicJoinType }) => {
	return <JoinNode>{JoinLabels[props.type || TopicJoinType.INNER]}</JoinNode>;
};
const Dot = () => {
	return <DotNode>.</DotNode>;
};
const On = () => {
	return <OnNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_ON}</OnNode>;
};
const Equals = () => {
	return <EqualsNode>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_JOIN_EQUALS}</EqualsNode>;
};

export const From = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	active: boolean;
}) => {
	const { subject, availableTopics, pickedTopics, active } = props;

	if (!active) {
		return null;
	}

	const hasJoin = subject.dataset.joins && subject.dataset.joins.length !== 0;

	const availableTopicsMap: Map<string, Topic> = availableTopics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());
	const pickedTopicsMap: Map<string, Topic> = pickedTopics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());
	const joins = beautifyJoins({ subject, pickedTopicsMap, availableTopicsMap });
	const levels: Array<Topic | null> = [];

	return <PartContent>
		{hasJoin
			? joins.map(join => {
				const nodes = [];
				const {
					first: { topic = null, topicPicked: picked, factor = null },
					type: joinType,
					second: { topic: topic2 = null, topicPicked: picked2, factor: factor2 = null }
				} = join;
				if (levels.length === 0) {
					levels.push(topic);
					nodes.push(<TopicName topic={topic} picked={picked}/>);
					nodes.push(<Join type={joinType}/>);
					nodes.push(<TopicName topic={topic2} picked={picked2}/>);
					nodes.push(<On/>);
					nodes.push(<FactorName topic={topic} picked={picked} factor={factor}/>);
					nodes.push(<Equals/>);
					nodes.push(<FactorName topic={topic2} picked={picked} factor={factor2}/>);
				}
				return nodes;
			}).flat()
			: <EmptyPart>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_FROM}</EmptyPart>}
	</PartContent>;
};