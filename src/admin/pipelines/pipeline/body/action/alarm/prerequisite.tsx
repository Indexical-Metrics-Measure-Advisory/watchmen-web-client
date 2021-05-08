import React from 'react';
import {AlarmAction} from '../../../../../../services/tuples/pipeline-stage-unit-action/system-actions-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ConditionalEditor} from '../../conditional';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';

export const AlarmPrerequisite = (props: {
	action: AlarmAction;
	topic: Topic;
}) => {
	const {action, topic} = props;

	const {fire} = useActionEventBus();

	const onConditionTypeChange = () => {
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	return <ConditionalEditor conditional={action} topics={[topic]} onChange={onConditionTypeChange}/>;
};