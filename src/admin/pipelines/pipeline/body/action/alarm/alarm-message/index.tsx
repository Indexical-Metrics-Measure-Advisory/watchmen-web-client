import {AlarmAction} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
import {useActionEventBus} from '../../action-event-bus';
import {ActionEventTypes} from '../../action-event-bus-types';
import {MessageInput, MessageInputContainer, MessageInputLabel} from './widgets';

export const AlarmMessage = (props: { action: AlarmAction }) => {
	const {action} = props;

	const {fire} = useActionEventBus();
	const forceUpdate = useForceUpdate();
	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === action.message) {
			return;
		}

		action.message = value;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	return <MessageInputContainer>
		<MessageInputLabel>{action.message}</MessageInputLabel>
		<MessageInput value={action.message || ''} onChange={onChange}
		              placeholder='Use "{}" to include variables or factor values.'/>
	</MessageInputContainer>;
};