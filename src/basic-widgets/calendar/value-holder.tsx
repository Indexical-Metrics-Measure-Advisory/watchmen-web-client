import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import { useCalendarEventBus } from './event/calendar-event-bus';
import { CalendarEventTypes } from './event/calendar-event-bus-types';
import { useValueChange } from './use-value-change';

export const CalendarValueHolder = () => {
	const { on, off, fire } = useCalendarEventBus();
	const [ value, setValue ] = useState<Dayjs>(dayjs());
	useValueChange(setValue);
	useEffect(() => {
		const onAskValue = () => fire(CalendarEventTypes.REPLY_VALUE, value);
		on(CalendarEventTypes.ASK_VALUE, onAskValue);
		return () => {
			off(CalendarEventTypes.ASK_VALUE, onAskValue);
		};
	}, [ on, off, fire, value ]);

	return <></>;
};