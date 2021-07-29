import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {TopicProfileEventBus} from './topic-profile-event-bus-types';

const Context = React.createContext<TopicProfileEventBus>({} as TopicProfileEventBus);
Context.displayName = 'TopicProfileEventBus';

export const TopicProfileEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<TopicProfileEventBus>({
		fire: (type: string, ...data: Array<any>): TopicProfileEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): TopicProfileEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into topic profile event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): TopicProfileEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useTopicProfileEventBus = () => useContext(Context);
