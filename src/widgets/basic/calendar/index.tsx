import dayjs, {Dayjs} from 'dayjs';
import React, {useEffect, useRef, useState} from 'react';
import {ICON_DROPDOWN} from '../constants';
import {CALENDAR_DATE_FORMAT, CALENDAR_FORMAT, CALENDAR_TIME_FORMAT} from './constants';
import {CalendarEventBusProvider, useCalendarEventBus} from './event/calendar-event-bus';
import {CalendarEventTypes} from './event/calendar-event-bus-types';
import {CalendarPicker} from './picker';
import {CalendarState} from './types';
import {CalendarValueHolder} from './value-holder';
import {CalendarCaret, CalendarContainer, CalendarLabel} from './widgets';

const getPosition = (container: HTMLDivElement) => {
	const rect = container.getBoundingClientRect();
	return {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height
	};
};

const Picker = (props: {
	onChange: (value?: string) => (void | { active: boolean });
	value?: string;
	showTime?: boolean;
}) => {
	const {onChange, value, showTime = true, ...rest} = props;

	const {fire} = useCalendarEventBus();
	const containerRef = useRef<HTMLDivElement>(null);
	const [state, setState] = useState<CalendarState>(() => {
		return {
			active: false,
			top: 0,
			left: 0,
			width: 0,
			height: 0
		};
	});

	useEffect(() => {
		const onScroll = () => {
			if (!state.active) {
				return;
			}
			const {top, left, width, height} = getPosition(containerRef.current!);
			setState({...state, top, left, width, height});
		};
		window.addEventListener('scroll', onScroll, true);
		return () => {
			window.removeEventListener('scroll', onScroll, true);
		};
	});

	const onClicked = () => {
		if (state.active) {
			return;
		}
		const {top, left, width, height} = getPosition(containerRef.current!);
		const currentDate = value ? dayjs(value) : dayjs();
		fire(CalendarEventTypes.DATE_CHANGED, currentDate);
		setState({active: true, top, left, width, height});
	};
	const onBlurred = async () => {
		if (!state.active) {
			// do nothing
			return;
		}

		fire(CalendarEventTypes.ASK_VALUE, (newValue: Dayjs) => {
			if (!value) {
				onChange(newValue!.format(CALENDAR_FORMAT));
				setState({...state, active: false});
			} else {
				const originalValue = dayjs(value);
				if (!originalValue.isSame(newValue)) {
					onChange(newValue!.format(CALENDAR_FORMAT));
					setState({...state, active: false});
				} else {
					setState({...state, active: false});
				}
			}
		});
	};

	const onClear = () => {
		const ret = onChange();
		if (!ret || !ret.active) {
			setState({...state, active: false});
		}
	};
	const onConfirm = (value: Dayjs) => {
		const ret = onChange(value!.format(CALENDAR_FORMAT));
		if (!ret || !ret.active) {
			setState({...state, active: false});
		}
	};

	return <CalendarContainer data-options-visible={state.active}
	                          {...state}
	                          {...rest}
	                          role="input" tabIndex={0} ref={containerRef}
	                          onClick={onClicked} onBlur={onBlurred}>
		<CalendarLabel>{value}</CalendarLabel>
		<CalendarCaret icon={ICON_DROPDOWN}/>
		<CalendarPicker showTime={showTime} state={state} confirm={onConfirm} clear={onClear}/>
		<CalendarValueHolder/>
	</CalendarContainer>;
};

export const Calendar = (props: {
	onChange: (value?: string) => (void | { active: boolean });
	value?: string,
	showTime?: boolean;
}) => {
	return <CalendarEventBusProvider>
		<Picker {...props}/>
	</CalendarEventBusProvider>;
};

export {
	CALENDAR_FORMAT,
	CALENDAR_DATE_FORMAT,
	CALENDAR_TIME_FORMAT
};