import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_ADD} from '../../basic/constants';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {TupleCreateButton} from './widgets';

export const TupleCreate = (props: {
	label?: string;
	visible: boolean;
}) => {
	const {label = 'Create One', visible} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useTupleEventBus();

	if (!visible) {
		return null;
	}

	const onCreateClicked = () => {
		fire(TupleEventTypes.ASK_TUPLE_STATE, (state: TupleState) => {
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
		});
	};

	return <TupleCreateButton onClick={onCreateClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>{label}</span>
	</TupleCreateButton>;
};