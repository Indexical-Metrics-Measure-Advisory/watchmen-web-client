import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {ICON_BACK} from '../../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {useValueChange} from '../use-value-change';
import {
	MonthSelector,
	MonthSelectorOption,
	YearMonthPickerCloseButton,
	YearMonthPickerContainer,
	YearMonthPickerLabel,
	YearSelector,
	YearSelectorOption
} from './widgets';

export const YearMonthPicker = () => {
	const {on, off, fire} = useCalendarEventBus();
	const [visible, setVisible] = useState(false);
	const [value, setValue] = useState<Dayjs>(dayjs());

	useEffect(() => {
		const onOpen = () => setVisible(true);
		const onClose = () => setVisible(false);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onClose);
		return () => {
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_TIME_PICKER, onClose);
		};
	}, [on, off]);
	useValueChange(setValue);

	if (!visible) {
		return null;
	}

	const onCancelPickYearMonthClicked = () => {
		setVisible(false);
		fire(CalendarEventTypes.YEAR_MONTH_PICKER_CLOSED);
	};
	const onYearChange = (year: number) => () => {
		const newValue = value.year(year);
		fire(CalendarEventTypes.DATE_CHANGED, newValue);
	};
	const onMonthChange = (month: number) => () => {
		const newValue = value.month(month);
		fire(CalendarEventTypes.DATE_CHANGED, newValue);
	};

	const nowYear = new Date().getFullYear();

	return <YearMonthPickerContainer>
		<YearMonthPickerCloseButton onClick={onCancelPickYearMonthClicked}>
			<FontAwesomeIcon icon={ICON_BACK} transform={{rotate: 180}}/>
		</YearMonthPickerCloseButton>
		<YearMonthPickerLabel>Year</YearMonthPickerLabel>
		<YearMonthPickerLabel>Month</YearMonthPickerLabel>
		<YearSelector>
			{new Array(100).fill(1).map((v, index) => {
				const year = nowYear - index;
				return <YearSelectorOption onClick={onYearChange(year)} key={index}>
					{year}
				</YearSelectorOption>;
			})}
		</YearSelector>
		<MonthSelector>
			<MonthSelectorOption onClick={onMonthChange(0)}>Jan</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(1)}>Feb</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(2)}>Mar</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(3)}>Apr</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(4)}>May</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(5)}>Jun</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(6)}>Jul</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(7)}>Aug</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(8)}>Sep</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(9)}>Oct</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(10)}>Nov</MonthSelectorOption>
			<MonthSelectorOption onClick={onMonthChange(11)}>Dec</MonthSelectorOption>
		</MonthSelector>
	</YearMonthPickerContainer>;
};