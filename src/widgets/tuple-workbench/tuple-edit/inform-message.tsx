import React, {useEffect, useState} from 'react';
import {useTupleEventBus} from '../tuple-event-bus';
import {TupleEventTypes, TupleState} from '../tuple-event-bus-types';
import {TupleEditInformMessage} from './widgets';

export const InformMessage = () => {
	const {on, off, fire} = useTupleEventBus();
	const [state, setState] = useState<TupleState>(TupleState.NONE);
	useEffect(() => {
		const onTupleChange = () => {
			setState(TupleState.NONE);
		};
		const onTupleStateChange = (state: TupleState) => {
			setState(state);
		};
		const onAskTupleState = (onStateGot: (state: TupleState) => void) => {
			onStateGot(state);
		};
		on(TupleEventTypes.TUPLE_CREATED, onTupleChange);
		on(TupleEventTypes.TUPLE_LOADED, onTupleChange);
		on(TupleEventTypes.CHANGE_TUPLE_STATE, onTupleStateChange);
		on(TupleEventTypes.ASK_TUPLE_STATE, onAskTupleState);
		return () => {
			off(TupleEventTypes.TUPLE_CREATED, onTupleChange);
			off(TupleEventTypes.TUPLE_LOADED, onTupleChange);
			off(TupleEventTypes.CHANGE_TUPLE_STATE, onTupleStateChange);
			off(TupleEventTypes.ASK_TUPLE_STATE, onAskTupleState);
		};
	}, [on, off, fire, state]);

	let message = '';
	switch (state) {
		case TupleState.SAVED:
			message = 'Data Saved.';
			break;
		case TupleState.SAVING:
			message = 'Data Saving...';
			break;
		case TupleState.CHANGED:
			message = 'Data Changed.';
			break;
	}

	return <TupleEditInformMessage data-change-kind={state}><span>{message}</span></TupleEditInformMessage>;
};