import React from 'react';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {
	FromTopic,
	ToTopic
} from '../../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {IncorrectOptionLabel, TopicDropdown, TopicFinderContainer} from './widgets';
import {findSelectedTopic} from '../../../../../../services/tuples/factor-calculator-utils';
import {buildTopicOptions} from '../../../../../../shared-widgets/tuples';

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