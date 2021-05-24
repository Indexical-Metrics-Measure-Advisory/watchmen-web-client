import EventEmitter from 'events';
import React, {useContext, useState} from 'react';
import {ColorPickerEventBus} from './color-picker-event-bus-types';

const Context = React.createContext<ColorPickerEventBus>({} as ColorPickerEventBus);
Context.displayName = 'ColorPickerEventBus';

export const ColorPickerEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const {children} = props;

	const [emitter] = useState(new EventEmitter().setMaxListeners(999999));
	const [bus] = useState<ColorPickerEventBus>({
		fire: (type: string, ...data: Array<any>): ColorPickerEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		once: (type: string, listener: (...data: Array<any>) => void): ColorPickerEventBus => {
			emitter.once(type, listener);
			return bus;
		},
		on: (type: string, listener: (...data: Array<any>) => void): ColorPickerEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into color-picker event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: Array<any>) => void): ColorPickerEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useColorPickerEventBus = () => useContext(Context);
