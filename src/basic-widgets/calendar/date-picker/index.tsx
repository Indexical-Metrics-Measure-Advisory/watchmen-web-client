import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useCalendarEventBus } from '../event/calendar-event-bus';
import { CalendarEventTypes } from '../event/calendar-event-bus-types';
import { computeCalendarDays } from './utils';
import { DatePickerButtons, DatePickerContainer, DatePickerShortcut, DatePickerShortcutButton } from './widgets';

export const DatePicker = (props: {
	initValue: Dayjs;
	confirm: (value: Dayjs) => void;
	clear: () => void;
}) => {
	const { initValue, confirm, clear } = props;

	const { on, off, fire } = useCalendarEventBus();
	const [ visible, setVisible ] = useState(true);
	const [ value, setValue ] = useState<Dayjs>(initValue);

	useEffect(() => {
		const onOpen = () => setVisible(false);
		const onClosed = () => setVisible(true);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
		on(CalendarEventTypes.YEAR_MONTH_PICKER_CLOSED, onClosed);
		on(CalendarEventTypes.TIME_PICKER_CLOSED, onClosed);
		return () => {
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
			off(CalendarEventTypes.YEAR_MONTH_PICKER_CLOSED, onClosed);
			off(CalendarEventTypes.TIME_PICKER_CLOSED, onClosed);
		};
	}, [ on, off ]);

	if (!visible) {
		return null;
	}

	const today = dayjs();
	const todayYear = today.year();
	const todayMonth = today.month();
	const todayDate = today.date();

	const onDateClicked = (date: Dayjs) => () => {
		const newValue = date.clone().hour(value.hour()).minute(value.minute()).second(value.second()).millisecond(value.millisecond());
		setValue(newValue);
		fire(CalendarEventTypes.DATE_CHANGED, newValue);
	};
	const onTodayClicked = onDateClicked(today);
	const onYesterdayClicked = onDateClicked(today.subtract(1, 'day'));
	const onWeekendClicked = onDateClicked(today.day(6));
	const onPrevWeekendClicked = onDateClicked(today.day(6).subtract(1, 'week'));
	const onMonthEndClicked = onDateClicked(today.date(1).add(1, 'month').subtract(1, 'day'));
	const onPrevMonthEndClicked = onDateClicked(today.date(1).subtract(1, 'day'));
	const onYearEndClicked = onDateClicked(today.month(11).date(31));
	const onPrevYearEndClicked = onDateClicked(today.month(11).date(31).subtract(1, 'year'));

	const onGotoPrevMonthClicked = () => onDateClicked(value!.subtract(1, 'month'));
	const onGotoNextMonthClicked = () => onDateClicked(value!.add(1, 'month'));

	const onClearClicked = () => clear();
	const onConfirmClicked = () => confirm(value);

	const currentYear = value.year();
	const currentMonth = value.month();
	const currentDate = value.date();
	const currentDisplayMonth = value.format('MMM YYYY');
	const firstDayOfDisplayMonth = value.clone().date(1);
	const days = computeCalendarDays(firstDayOfDisplayMonth);

	return <>
		<DatePickerContainer>
			<DatePickerShortcut>
				<DatePickerShortcutButton onClick={onTodayClicked}>Today</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onYesterdayClicked}>Yesterday</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onWeekendClicked}>This Weekend</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onPrevWeekendClicked}>Prev Weekend</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onMonthEndClicked}>This Month End</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onPrevMonthEndClicked}>Prev Month End</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onYearEndClicked}>This Year End</DatePickerShortcutButton>
				<DatePickerShortcutButton onClick={onPrevYearEndClicked}>Prev Year End</DatePickerShortcutButton>
			</DatePickerShortcut>
			<div>
				<span>{currentDisplayMonth}</span>
				<div>
					<span onClick={onTodayClicked}>TODAY</span>
					<span onClick={onGotoPrevMonthClicked}><FontAwesomeIcon icon={faCaretLeft}/></span>
					<span onClick={onGotoNextMonthClicked}><FontAwesomeIcon icon={faCaretRight}/></span>
				</div>
			</div>
			<div>
				<span>S</span>
				<span>M</span>
				<span>T</span>
				<span>W</span>
				<span>T</span>
				<span>F</span>
				<span>S</span>
				{days.map(({ year, month, date }) => {
					return <span key={`${year}/${month}/${date}`}
					             data-current-month={year === currentYear && month === currentMonth}
					             data-current={year === currentYear && month === currentMonth && date === currentDate}
					             data-today={year === todayYear && month === todayMonth && date === todayDate}
					             onClick={onDateClicked(dayjs().year(year).month(month).date(date))}>
							{date}
						</span>;
				})}
			</div>
		</DatePickerContainer>
		<DatePickerButtons>
			<div onClick={onClearClicked}>Clear</div>
			<div onClick={onConfirmClicked}>Confirm</div>
		</DatePickerButtons>
	</>;
};