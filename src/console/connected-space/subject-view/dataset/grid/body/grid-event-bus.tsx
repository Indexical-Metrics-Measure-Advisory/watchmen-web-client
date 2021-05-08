import {EventEmitter} from 'events';
import React, {useState} from 'react';
import {GridEventBus} from './grid-event-bus-types';

const Context = React.createContext<GridEventBus>({} as GridEventBus);
Context.displayName = 'GridEventBus';

export const GridEventBusProvider = (props: {
	children?: ((props: any) => React.ReactNode) | React.ReactNode;
}) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<GridEventBus>({
		fire: (type: string, ...data: any): GridEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): GridEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): GridEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into grid event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): GridEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useGridEventBus = () => {
	return React.useContext(Context);
};
