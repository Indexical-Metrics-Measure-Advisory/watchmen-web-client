import {Dayjs} from 'dayjs';
import React from 'react';
import {DatePicker} from '../date-picker';
import {CalendarPickerHeader} from '../picker-header';
import {CalendarPickerContainer} from '../picker-header/widgets';
import {TimePicker} from '../time-picker';
import {CalendarState} from '../types';
import {YearMonthPicker} from '../year-month-picker';

export const CalendarPicker = (props: {
	showTime: boolean;
	state: CalendarState;
	confirm: (value: Dayjs) => void;
	clear: () => void;
}) => {
	const {showTime, state, confirm, clear} = props;

	return <CalendarPickerContainer {...state}>
		<CalendarPickerHeader showTime={showTime}/>
		<DatePicker confirm={confirm} clear={clear}/>
		{showTime ? <TimePicker/> : null}
		<YearMonthPicker/>
	</CalendarPickerContainer>;

};