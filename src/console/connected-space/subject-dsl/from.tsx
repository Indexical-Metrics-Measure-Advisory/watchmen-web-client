import {Factor} from '@/services/data/tuples/factor-types';
import {Subject, SubjectDataSetJoin, TopicJoinType} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Lang} from '@/widgets/langs';
import React, {ReactNode} from 'react';
import {v4} from 'uuid';
import {Comma, Equals, FactorName, Join, JoinAnd, NewLine, On, TopicName} from './literal';
import {buildTopicsMap, findTopicAndFactor} from './literal-utils';
import {EmptyPart, PartContent} from './widgets';

interface PrettyJoin extends SubjectDataSetJoin {
	first: {
		topic?: Topic;
		topicPicked: boolean;
		factor?: Factor;
	},
	second: {
		topic?: Topic;
		topicPicked: boolean;
		factor?: Factor;
	}
}

const beautifyJoins = (options: {
	subject: Subject;
	availableTopicsMap: Map<string, Topic>;
	pickedTopicsMap: Map<string, Topic>;
}): Array<PrettyJoin> => {
	const {subject, availableTopicsMap, pickedTopicsMap} = options;

	return [...subject.dataset.joins]
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
			return {...join, first: tf1, second: tf2};
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

const renderFromAnd = (join: PrettyJoin): Array<ReactNode> => {
	const {
		first: {topic = null, topicPicked: picked, factor = null},
		second: {topic: topic2 = null, topicPicked: picked2, factor: factor2 = null}
	} = join;
	return [
		<JoinAnd key={v4()}/>,
		<FactorName topic={topic} picked={picked} factor={factor} key={v4()}/>,
		<Equals key={v4()}/>,
		<FactorName topic={topic2} picked={picked2} factor={factor2} key={v4()}/>
	];
};
const renderFromJoin = (join: PrettyJoin): Array<ReactNode> => {
	const {
		first: {topic = null, topicPicked: picked, factor = null},
		type: joinType,
		second: {topic: topic2 = null, topicPicked: picked2, factor: factor2 = null}
	} = join;
	return [
		<Join type={joinType} key={v4()}/>,
		<TopicName topic={topic2} picked={picked2} key={v4()}/>,
		<On key={v4()}/>,
		<FactorName topic={topic} picked={picked} factor={factor} key={v4()}/>,
		<Equals key={v4()}/>,
		<FactorName topic={topic2} picked={picked2} factor={factor2} key={v4()}/>
	];
};
const renderAll = (join: PrettyJoin): Array<ReactNode> => {
	const {first: {topic = null, topicPicked: picked}} = join;
	return [
		<TopicName topic={topic} picked={picked} key={v4()}/>,
		...renderFromJoin(join)
	];
};

export const From = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, availableTopics, pickedTopics} = props;

	const hasJoin = subject.dataset.joins && subject.dataset.joins.length !== 0;

	const {availableTopicsMap, pickedTopicsMap} = buildTopicsMap({availableTopics, pickedTopics});
	const joins = beautifyJoins({subject, pickedTopicsMap, availableTopicsMap});
	const levels: Array<Topic | TopicJoinType | null> = [];

	return <PartContent>
		{hasJoin
			? joins.map(join => {
				const nodes = [];
				const {first: {topic = null}, type: joinType, second: {topic: topic2 = null}} = join;
				if (levels.length === 0) {
					levels.push(topic, joinType, topic2);
					nodes.push(...renderAll(join));
				} else if (levels.length === 3) {
					if (topic === levels[0]) {
						if (topic2 === levels[2] && joinType === levels[1]) {
							nodes.push(<NewLine key={v4()}/>);
							nodes.push(...renderFromAnd(join));
						} else {
							levels[1] = joinType;
							levels[2] = topic2;
							nodes.push(<NewLine key={v4()}/>);
							nodes.push(...renderFromJoin(join));
						}
					} else {
						levels.length = 0;
						levels.push(topic, joinType, topic2);
						nodes.push(<Comma key={v4()}/>);
						nodes.push(<NewLine key={v4()}/>);
						nodes.push(...renderAll(join));
					}
				}
				return nodes;
			}).flat()
			: <EmptyPart>{Lang.CONSOLE.CONNECTED_SPACE.SUBJECT_NO_FROM}</EmptyPart>}
	</PartContent>;
};