import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useState} from 'react';
import {ICON_BACK} from '../../constants';
import {useCalendarEventBus} from '../event/calendar-event-bus';
import {CalendarEventTypes} from '../event/calendar-event-bus-types';
import {useValueChange} from '../use-value-change';
import {
	TimePickerCloseButton,
	TimePickerContainer,
	TimePickerLabel,
	TimePickerSelector,
	TimePickerSelectorOption
} from './widgets';

export const TimePicker = () => {
	const {on, off, fire} = useCalendarEventBus();
	const [visible, setVisible] = useState(false);
	const [value, setValue] = useState<Dayjs>(dayjs());

	useEffect(() => {
		const onOpen = () => setVisible(true);
		const onClose = () => setVisible(false);
		on(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
		on(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
		return () => {
			off(CalendarEventTypes.OPEN_TIME_PICKER, onOpen);
			off(CalendarEventTypes.OPEN_YEAR_MONTH_PICKER, onClose);
		};
	}, [on, off]);
	useValueChange(setValue);

	if (!visible) {
		return null;
	}

	const onCancelPickTimeClicked = () => {
		setVisible(false);
		fire(CalendarEventTypes.TIME_PICKER_CLOSED);
	};
	const onHourChange = (index: number) => () => {
		const newValue = value.hour(index);
		fire(CalendarEventTypes.TIME_CHANGED, newValue);
	};
	const onMinuteChange = (index: number) => () => {
		const newValue = value.minute(index);
		fire(CalendarEventTypes.TIME_CHANGED, newValue);
	};
	const onSecondChange = (index: number) => () => {
		const newValue = value.second(index);
		fire(CalendarEventTypes.TIME_CHANGED, newValue);
	};

	return <TimePickerContainer>
		<TimePickerCloseButton onClick={onCancelPickTimeClicked}>
			<FontAwesomeIcon icon={ICON_BACK} transform={{rotate: 180}}/>
		</TimePickerCloseButton>
		<TimePickerLabel>Hour</TimePickerLabel>
		<TimePickerLabel>Minute</TimePickerLabel>
		<TimePickerLabel>Second</TimePickerLabel>
		<TimePickerSelector>
			{new Array(24).fill(1).map((v, index) => {
				return <TimePickerSelectorOption onClick={onHourChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
		<TimePickerSelector>
			{new Array(60).fill(1).map((v, index) => {
				return <TimePickerSelectorOption onClick={onMinuteChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
		<TimePickerSelector>
			{new Array(60).fill(1).map((v, index) => {
				return <TimePickerSelectorOption onClick={onSecondChange(index)} key={index}>
					{`${index}`.padStart(2, '0')}
				</TimePickerSelectorOption>;
			})}
		</TimePickerSelector>
	</TimePickerContainer>;
};