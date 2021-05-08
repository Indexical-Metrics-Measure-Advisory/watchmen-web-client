import {faCaretLeft, faCaretRight} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {useValueChange} from '../use-value-change';
import {computeCalendarDays} from './utils';
import {
	DatePickerBody,
	DatePickerBodyDateCell,
	DatePickerBodyHeaderCell,
	DatePickerButtons,
	DatePickerClearButton,
	DatePickerConfirmButton,
	DatePickerContainer,
	DatePickerHeader,
	DatePickerHeaderMonthChangeButton,
	DatePickerHeaderOperators,
	DatePickerHeaderTodayButton,
	DatePickerHeaderYearMonth,
	DatePickerShortcut,
	DatePickerShortcutButton
} from './widgets';

export const DatePicker = (props: {
	confirm: (value: Dayjs) => void;
	clear: (value: Dayjs) => void;
}) => {
	const {confirm, clear} = props;

	const {on, off, fire} = useCalendarEventBus();
	const [visible, setVisible] = useState(true);
	const [value, setValue] = useState<Dayjs>(dayjs());

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
	}, [on, off]);
	useValueChange(setValue);

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

	const onGotoPrevMonthClicked = () => onDateClicked(value.subtract(1, 'month'));
	const onGotoNextMonthClicked = () => onDateClicked(value.add(1, 'month'));

	const onClearClicked = () => {
		const newValue = dayjs();
		fire(CalendarEventTypes.DATE_CHANGED, newValue);
		clear(newValue);
	};
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
			<DatePickerHeader>
				<DatePickerHeaderYearMonth>{currentDisplayMonth}</DatePickerHeaderYearMonth>
				<DatePickerHeaderOperators>
					<DatePickerHeaderTodayButton onClick={onTodayClicked}>Today</DatePickerHeaderTodayButton>
					<DatePickerHeaderMonthChangeButton onClick={onGotoPrevMonthClicked}>
						<FontAwesomeIcon icon={faCaretLeft}/>
					</DatePickerHeaderMonthChangeButton>
					<DatePickerHeaderMonthChangeButton onClick={onGotoNextMonthClicked}>
						<FontAwesomeIcon icon={faCaretRight}/>
					</DatePickerHeaderMonthChangeButton>
				</DatePickerHeaderOperators>
			</DatePickerHeader>
			<DatePickerBody>
				<DatePickerBodyHeaderCell>S</DatePickerBodyHeaderCell>
				<DatePickerBodyHeaderCell>M</DatePickerBodyHeaderCell>
				<DatePickerBodyHeaderCell>T</DatePickerBodyHeaderCell>
				<DatePickerBodyHeaderCell>W</DatePickerBodyHeaderCell>
				<DatePickerBodyHeaderCell>T</DatePickerBodyHeaderCell>
				<DatePickerBodyHeaderCell>F</DatePickerBodyHeaderCell>
				<DatePickerBodyHeaderCell>S</DatePickerBodyHeaderCell>
				{days.map(({year, month, date}) => {
					return <DatePickerBodyDateCell key={`${year}/${month}/${date}`}
					                               data-current-month={year === currentYear && month === currentMonth}
					                               data-current={year === currentYear && month === currentMonth && date === currentDate}
					                               data-today={year === todayYear && month === todayMonth && date === todayDate}
					                               onClick={onDateClicked(dayjs().year(year).month(month).date(date))}>
						{date}
					</DatePickerBodyDateCell>;
				})}
			</DatePickerBody>
		</DatePickerContainer>
		<DatePickerButtons>
			<DatePickerClearButton onClick={onClearClicked}>Clear</DatePickerClearButton>
			<DatePickerConfirmButton onClick={onConfirmClicked}>Confirm</DatePickerConfirmButton>
		</DatePickerButtons>
	</>;
};