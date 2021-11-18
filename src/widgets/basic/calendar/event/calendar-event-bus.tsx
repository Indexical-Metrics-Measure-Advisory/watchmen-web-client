import React, {createContext, ReactNode, useContext} from 'react';
import {useCreateEventBus} from '../../../events/use-create-event-bus';
import {CalendarEventBus} from './calendar-event-bus-types';

const Context = createContext<CalendarEventBus>({} as CalendarEventBus);
Context.displayName = 'CalendarEventBus';

export const CalendarEventBusProvider = (props: { children?: ReactNode }) => {
	const {children} = props;

	const bus = useCreateEventBus<CalendarEventBus>('calendar');

	return <Context.Provider value={bus}>
		{children}
	</Context.Provider>;
};

export const useCalendarEventBus = () => useContext(Context);
