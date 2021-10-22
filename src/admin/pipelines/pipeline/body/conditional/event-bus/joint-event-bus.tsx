import EventEmitter from 'events';
import React, {ReactNode, useContext, useState} from 'react';
import {JointEventBus} from './joint-event-bus-types';

const Context = React.createContext<JointEventBus>({} as JointEventBus);
Context.displayName = 'JointEventBus';

export const JointEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<JointEventBus>({
		fire: (type: string, ...data: Array<any>): JointEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): JointEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into joint event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): JointEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useJointEventBus = () => useContext(Context);
