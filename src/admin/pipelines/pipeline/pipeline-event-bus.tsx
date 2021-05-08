import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {PipelineEventBus} from './pipeline-event-bus-types';

const Context = React.createContext<PipelineEventBus>({} as PipelineEventBus);
Context.displayName = 'PipelineEventBus';

export const PipelineEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<PipelineEventBus>({
		fire: (type: string, ...data: any): PipelineEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: any) => void): PipelineEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): PipelineEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into pipeline event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): PipelineEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const usePipelineEventBus = () => useContext(Context);
