import {Dayjs} from 'dayjs';

export enum CalendarEventTypes {
	OPEN_YEAR_MONTH_PICKER = 'open-year-month-picker',
	YEAR_MONTH_PICKER_CLOSED = 'year-month-picker-closed',

	OPEN_TIME_PICKER = 'open-time-picker',
	TIME_PICKER_CLOSED = 'time-picker-closed',

	DATE_CHANGED = 'date-changed',
	TIME_CHANGED = 'time-changed',

	ASK_VALUE = 'ask-value',
}

export interface CalendarEventBus {
	fire(type: CalendarEventTypes.OPEN_YEAR_MONTH_PICKER): this;
	on(type: CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, listener: () => void): this;
	off(type: CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, listener: () => void): this;

	fire(type: CalendarEventTypes.YEAR_MONTH_PICKER_CLOSED): this;
	on(type: CalendarEventTypes.YEAR_MONTH_PICKER_CLOSED, listener: () => void): this;
	off(type: CalendarEventTypes.YEAR_MONTH_PICKER_CLOSED, listener: () => void): this;

	fire(type: CalendarEventTypes.OPEN_TIME_PICKER): this;
	on(type: CalendarEventTypes.OPEN_TIME_PICKER, listener: () => void): this;
	off(type: CalendarEventTypes.OPEN_TIME_PICKER, listener: () => void): this;

	fire(type: CalendarEventTypes.TIME_PICKER_CLOSED): this;
	on(type: CalendarEventTypes.TIME_PICKER_CLOSED, listener: () => void): this;
	off(type: CalendarEventTypes.TIME_PICKER_CLOSED, listener: () => void): this;

	fire(type: CalendarEventTypes.DATE_CHANGED, value: Dayjs): this;
	on(type: CalendarEventTypes.DATE_CHANGED, listener: (value: Dayjs) => void): this;
	off(type: CalendarEventTypes.DATE_CHANGED, listener: (value: Dayjs) => void): this;

	fire(type: CalendarEventTypes.TIME_CHANGED, value: Dayjs): this;
	on(type: CalendarEventTypes.TIME_CHANGED, listener: (value: Dayjs) => void): this;
	off(type: CalendarEventTypes.TIME_CHANGED, listener: (value: Dayjs) => void): this;

	fire(type: CalendarEventTypes.ASK_VALUE, onData: (value: Dayjs) => void): this;
	on(type: CalendarEventTypes.ASK_VALUE, listener: (onData: (value: Dayjs) => void) => void): this;
	off(type: CalendarEventTypes.ASK_VALUE, listener: (onData: (value: Dayjs) => void) => void): this;
}