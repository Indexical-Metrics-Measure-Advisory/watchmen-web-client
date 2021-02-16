import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import {
	MappingRow,
	WriteTopicAction
} from '../../../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { useActionEventBus } from '../action-event-bus';
import { ActionEventTypes } from '../action-event-bus-types';
import { FactorMapping } from './factor-mapping';
import { FactorsMappingContainer } from './widgets';

export const FactorsMapping = (props: { action: WriteTopicAction & MappingRow, topics: Array<Topic>, topic: Topic }) => {
	const { action, topics, topic } = props;

	const { on, off } = useActionEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ActionEventTypes.TOPIC_CHANGED, forceUpdate);
		return () => {
			off(ActionEventTypes.TOPIC_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	let targetTopic: Topic | undefined = (void 0);
	const { topicId } = action;
	if (topicId) {
		// eslint-disable-next-line
		targetTopic = topics.find(topic => topic.topicId == topicId);
	}

	return <FactorsMappingContainer>
		{action.mapping.map(mapping => {
			return <FactorMapping action={action} mapping={mapping} source={topic} target={targetTopic} key={v4()}/>;
		})}
	</FactorsMappingContainer>;
};