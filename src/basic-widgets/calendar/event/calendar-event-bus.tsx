import EventEmitter from 'events';
import React, { useContext, useState } from 'react';
import { CalendarEventBus } from './calendar-event-bus-types';

const Context = React.createContext<CalendarEventBus>({} as CalendarEventBus);
Context.displayName = 'CalendarEventBus';

export const CalendarEventBusProvider = (props: { children?: ((props: any) => React.ReactNode) | React.ReactNode }) => {
	const { children } = props;

	const [ emitter ] = useState(new EventEmitter().setMaxListeners(999999));
	const [ bus ] = useState<CalendarEventBus>({
		fire: (type: string, ...data: any): CalendarEventBus => {
			emitter.emit(type, ...data);
			return bus;
		},
		on: (type: string, listener: (...data: any) => void): CalendarEventBus => {
			if (emitter.rawListeners(type).includes(listener)) {
				console.error(`Listener on [${type}] was added into calendar event bus, check it.`);
			}
			emitter.on(type, listener);
			return bus;
		},
		off: (type: string, listener: (...data: any) => void): CalendarEventBus => {
			emitter.off(type, listener);
			return bus;
		}
	});

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useCalendarEventBus = () => useContext(Context);
