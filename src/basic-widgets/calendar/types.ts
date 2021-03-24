import { Dayjs } from 'dayjs';

export interface CalendarState {
	active: boolean;
	top: number;
	left: number;
	width: number;
	height: number;
	initValue: Dayjs;
	value: Dayjs;
}
