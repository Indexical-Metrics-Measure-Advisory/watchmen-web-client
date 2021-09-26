import {faCalendarAlt} from '@fortawesome/free-regular-svg-icons';
import dayjs, {Dayjs} from 'dayjs';
import React, {useState} from 'react';
import {CALENDAR_DATE_FORMAT, CALENDAR_TIME_FORMAT} from '../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {useValueChange} from '../use-value-change';
import {
	CalendarPickerHeaderContainer,
	CalendarPickerHeaderDateLabel,
	CalendarPickerHeaderIcon,
	CalendarPickerHeaderPlaceholder,
	CalendarPickerHeaderTimeButton,
	CalendarPickerHeaderTimeLabel
} from './widgets';

export const CalendarPickerHeader = (props: { showTime: boolean }) => {
	const {showTime} = props;

	const {fire} = useCalendarEventBus();
	const [value, setValue] = useState<Dayjs>(dayjs());
	useValueChange(setValue);

	const onTimeClicked = () => fire(CalendarEventTypes.OPEN_TIME_PICKER);
	const onYearMonthClicked = () => fire(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER);
	const onToDayStartClicked = () => {
		const newValue = value.hour(0).minute(0).second(0).millisecond(0);
		fire(CalendarEventTypes.TIME_CHANGED, newValue);
	};
	const onToDayEndClicked = () => {
		const newValue = value.hour(23).minute(59).second(59).millisecond(999);
		fire(CalendarEventTypes.TIME_CHANGED, newValue);
	};

	const currentDisplayDate = value.format(CALENDAR_DATE_FORMAT);
	const currentDisplayTime = value.format(CALENDAR_TIME_FORMAT);

	return <CalendarPickerHeaderContainer>
		<CalendarPickerHeaderIcon icon={faCalendarAlt}/>
		<CalendarPickerHeaderDateLabel onClick={onYearMonthClicked}>
			{currentDisplayDate}
		</CalendarPickerHeaderDateLabel>
		{showTime
			? <CalendarPickerHeaderTimeLabel onClick={onTimeClicked}>
				{currentDisplayTime}
			</CalendarPickerHeaderTimeLabel>
			: null}
		<CalendarPickerHeaderPlaceholder/>
		{showTime
			? <>
				<CalendarPickerHeaderTimeButton onClick={onToDayStartClicked}>
					Start
				</CalendarPickerHeaderTimeButton>
				<CalendarPickerHeaderTimeButton onClick={onToDayEndClicked}>
					End
				</CalendarPickerHeaderTimeButton>
			</>
			: null}
	</CalendarPickerHeaderContainer>;
};