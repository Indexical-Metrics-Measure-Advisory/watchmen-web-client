import {findSelectedTopic} from '@/services/data/tuples/factor-calculator-utils';
import {FromTopic, ToTopic} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {buildTopicOptions} from '@/widgets/tuples';
import React from 'react';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {IncorrectOptionLabel, TopicDropdown, TopicFinderContainer} from './widgets';

export const TopicPicker = (props: { action: FromTopic | ToTopic, topics: Array<Topic> }) => {
	const {action, topics} = props;
	const {topicId} = action;

	const {fire} = useActionEventBus();
	const forceUpdate = useForceUpdate();

	const onTopicChange = ({value}: DropdownOption) => {
		const selectedTopic = value as Topic;
		if (selectedTopic.topicId === topicId) {
			return;
		}

		action.topicId = selectedTopic.topicId;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
		fire(ActionEventTypes.TOPIC_CHANGED, action);
	};

	const {selected: selectedTopic, extra: extraTopic} = findSelectedTopic(topics, topicId);
	const topicOptions = buildTopicOptions({
		topics, extraTopic, toExtraNode: (topic: Topic) => {
			return <IncorrectOptionLabel>{topic.name}</IncorrectOptionLabel>;
		}
	});

	return <TopicFinderContainer>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}
		               please="Topic?"/>
	</TopicFinderContainer>;
};