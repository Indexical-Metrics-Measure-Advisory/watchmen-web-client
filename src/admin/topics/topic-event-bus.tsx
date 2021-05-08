import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {useTupleEventBus} from '../widgets/tuple-workbench/tuple-event-bus';
import {TupleEventTypes, TupleState} from '../widgets/tuple-workbench/tuple-event-bus-types';
import {TopicEventBus, TopicEventTypes} from './topic-event-bus-types';

const Context = React.createContext<TopicEventBus>({} as TopicEventBus);
Context.displayName = 'TopicEventBus';

export const TopicEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const {fire} = useTupleEventBus();
	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<TopicEventBus>({
		fire: (type: string, ...data: any): TopicEventBus => {
			if (type !== TopicEventTypes.FACTOR_SEARCH_TEXT_CHANGED) {
				fire(TupleEventTypes.CHANGE_TUPLE_STATE, TupleState.CHANGED);
			}
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): TopicEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into topic event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): TopicEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTopicEventBus = () => useContext(Context);
