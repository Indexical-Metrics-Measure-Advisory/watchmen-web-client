import {Dayjs} from 'dayjs';
import {useEffect} from 'react';
import {useCalendarEventBus} from './event/calendar-event-bus';
import {CalendarEventTypes} from './event/calendar-event-bus-types';

export const useValueChange = (onChange: (value: Dayjs) => void) => {
	const {on, off} = useCalendarEventBus();
	useEffect(() => {
		on(CalendarEventTypes.DATE_CHANGED, onChange);
		on(CalendarEventTypes.TIME_CHANGED, onChange);
		return () => {
			off(CalendarEventTypes.DATE_CHANGED, onChange);
			off(CalendarEventTypes.TIME_CHANGED, onChange);
		};
	}, [on, off, onChange]);
};