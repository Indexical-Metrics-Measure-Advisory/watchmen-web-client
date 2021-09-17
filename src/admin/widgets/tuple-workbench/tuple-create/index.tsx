import {ICON_ADD} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {TupleCreateButton} from './widgets';

export const TupleCreate = (props: {
	label?: string;
	visible: boolean;
}) => {
	const {label = 'Create One', visible} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once, fire} = useTupleEventBus();

	if (!visible) {
		return null;
	}

	const onCreateClicked = () => {
		once(TupleEventTypes.REPLY_TUPLE_STATE, (state: TupleState) => {
			if (state !== TupleState.SAVED && state !== TupleState.NONE) {
				fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
					'Still in editing, all changes will be lost if interrupt. Are you sure to continue?',
					() => {
						fire(TupleEventTypes.DO_CREATE_TUPLE);
						fireGlobal(EventTypes.HIDE_DIALOG);
					},
					() => fireGlobal(EventTypes.HIDE_DIALOG));
			} else {
				fire(TupleEventTypes.DO_CREATE_TUPLE);
			}
		}).fire(TupleEventTypes.ASK_TUPLE_STATE);
	};

	return <TupleCreateButton onClick={onCreateClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>{label}</span>
	</TupleCreateButton>;
};