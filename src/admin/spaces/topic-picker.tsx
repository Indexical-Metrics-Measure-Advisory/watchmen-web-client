import React from 'react';
import {QueryTopicForHolder} from '@/services/tuples/query-topic-types';
import {Space} from '@/services/tuples/space-types';
import {listTopicsForHolder} from '@/services/tuples/topic';
import {TupleItemPicker} from '../widgets/tuple-workbench/tuple-item-picker';

const hasTopic = (space: Space) => !!space.topicIds && space.topicIds.length > 0;
const getTopicIds = (space: Space): Array<string> => space.topicIds;
const findNameFromTopics = (topicId: string, topics: Array<QueryTopicForHolder>): string => {
	// eslint-disable-next-line
	return topics.find(topic => topic.topicId == topicId)!.name;
};
const removeTopic = (space: Space) => (topicOrId: string | QueryTopicForHolder) => {
	let topicId: string;
	if (typeof topicOrId === 'string') {
		topicId = topicOrId;
	} else {
		topicId = topicOrId.topicId;
	}
	// eslint-disable-next-line
	const index = space.topicIds.findIndex(id => id == topicId);
	if (index !== -1) {
		space.topicIds.splice(index, 1);
	}
};
const addTopic = (space: Space) => (topic: QueryTopicForHolder) => {
	const {topicId} = topic;
	// eslint-disable-next-line
	const index = space.topicIds.findIndex(id => id == topicId);
	if (index === -1) {
		space.topicIds.push(topicId);
	}
};
const getIdOfTopic = (topic: QueryTopicForHolder) => topic.topicId;
const getNameOfTopic = (topic: QueryTopicForHolder) => topic.name;
// eslint-disable-next-line
const isTopicPicked = (space: Space) => (topic: QueryTopicForHolder) => space.topicIds.some(topicId => topicId == topic.topicId);

export const TopicPicker = (props: {
	label: string;
	space: Space;
	codes: Array<QueryTopicForHolder>;
}) => {
	const {label, space, codes} = props;

	return <TupleItemPicker actionLabel={label}
	                        holder={space} codes={codes}
	                        isHolding={hasTopic} getHoldIds={getTopicIds} getNameOfHold={findNameFromTopics}
	                        listCandidates={listTopicsForHolder} getIdOfCandidate={getIdOfTopic}
	                        getNameOfCandidate={getNameOfTopic} isCandidateHold={isTopicPicked(space)}
	                        removeHold={removeTopic(space)} addHold={addTopic(space)}/>;
};
