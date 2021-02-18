import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Factor } from '../../../../../../services/tuples/factor-types';
import {
	FromTopic,
	ToTopic
} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { Topic, TopicType } from '../../../../../../services/tuples/topic-types';
import { getCurrentTime } from '../../../../../../services/utils';
import { useActionEventBus } from '../action-event-bus';
import { ActionEventTypes } from '../action-event-bus-types';
import { IncorrectOptionLabel, TopicDropdown, TopicFinderContainer } from './widgets';

const createUnknownTopic = (topicId: string): Topic => {
	return {
		topicId,
		name: 'Unknown Topic',
		type: TopicType.SYSTEM,
		factors: [] as Array<Factor>,
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const TopicPicker = (props: { action: FromTopic | ToTopic, topics: Array<Topic> }) => {
	const { action, topics } = props;
	const { topicId } = action;

	const { fire } = useActionEventBus();
	const forceUpdate = useForceUpdate();

	const onTopicChange = ({ value }: DropdownOption) => {
		const selectedTopic = value as Topic;
		if (selectedTopic.topicId === topicId) {
			return;
		}

		action.topicId = selectedTopic.topicId;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
		fire(ActionEventTypes.TOPIC_CHANGED, action);
	};

	let selectedTopic: Topic | null = null, extraTopic: Topic | null = null;
	if (topicId) {
		// eslint-disable-next-line
		selectedTopic = topics.find(topic => topic.topicId == topicId) || null;
		if (!selectedTopic) {
			extraTopic = createUnknownTopic(topicId);
		}
	}

	const topicOptions = ([ ...topics, extraTopic ].filter(x => !!x) as Array<Topic>)
		.sort((t1, t2) => t1.name.toLowerCase().localeCompare(t2.name.toLowerCase()))
		.map(topic => {
			return {
				value: topic,
				label: ({ value }) => {
					if (value === extraTopic) {
						return { node: <IncorrectOptionLabel>{value.name}</IncorrectOptionLabel>, label: value.name };
					} else {
						return value.name;
					}
				},
				key: topic.topicId
			} as DropdownOption;
		});

	return <TopicFinderContainer>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}
		               please='Topic?'/>
	</TopicFinderContainer>;
};