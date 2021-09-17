import {Dayjs} from 'dayjs';
import React from 'react';
import {DatePicker} from '../date-picker';
import {CalendarPickerHeader} from '../picker-header';
import {CalendarPickerContainer} from '../picker-header/widgets';
import {TimePicker} from '../time-picker';
import {CalendarState} from '../types';
import {YearMonthPicker} from '../year-month-picker';

export const CalendarPicker = (props: {
	state: CalendarState;
	confirm: (value: Dayjs) => void;
	clear: () => void;
}) => {
	const {state, confirm, clear} = props;

	return <CalendarPickerContainer {...state}>
		<CalendarPickerHeader/>
		<DatePicker confirm={confirm} clear={clear}/>
		<TimePicker/>
		<YearMonthPicker/>
	</CalendarPickerContainer>;

};