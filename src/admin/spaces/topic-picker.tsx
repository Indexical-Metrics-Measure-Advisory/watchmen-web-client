import {QueryTopicForHolder} from '@/services/data/tuples/query-topic-types';
import {Space} from '@/services/data/tuples/space-types';
import {listTopicsForHolder} from '@/services/data/tuples/topic';
import {TopicId} from '@/services/data/tuples/topic-types';
import {TupleItemPicker} from '@/widgets/tuple-workbench/tuple-item-picker';
import React from 'react';
import {useSpaceEventBus} from './space-event-bus';
import {SpaceEventTypes} from './space-event-bus-types';

const hasTopic = (space: Space) => !!space.topicIds && space.topicIds.length > 0;
const getTopicIds = (space: Space): Array<TopicId> => space.topicIds;
const findNameFromTopics = (topicId: TopicId, topics: Array<QueryTopicForHolder>): string => {
	// eslint-disable-next-line
	return topics.find(topic => topic.topicId == topicId)!.name;
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

	const {fire} = useSpaceEventBus();

	const addTopic = (space: Space) => (topic: QueryTopicForHolder) => {
		const {topicId} = topic;
		// eslint-disable-next-line
		const index = space.topicIds.findIndex(id => id == topicId);
		if (index === -1) {
			space.topicIds.push(topicId);
			fire(SpaceEventTypes.TOPIC_ADDED, topicId);
		}
	};
	const removeTopic = (space: Space) => (topicOrId: string | QueryTopicForHolder) => {
		let topicId: TopicId;
		if (typeof topicOrId === 'string') {
			topicId = topicOrId;
		} else {
			topicId = topicOrId.topicId;
		}
		// eslint-disable-next-line
		const index = space.topicIds.findIndex(id => id == topicId);
		if (index !== -1) {
			space.topicIds.splice(index, 1);
			fire(SpaceEventTypes.TOPIC_REMOVED, topicId);
		}
	};

	return <TupleItemPicker actionLabel={label}
	                        holder={space} codes={codes}
	                        isHolding={hasTopic} getHoldIds={getTopicIds} getNameOfHold={findNameFromTopics}
	                        listCandidates={listTopicsForHolder} getIdOfCandidate={getIdOfTopic}
	                        getNameOfCandidate={getNameOfTopic} isCandidateHold={isTopicPicked(space)}
	                        removeHold={removeTopic(space)} addHold={addTopic(space)}/>;
};
