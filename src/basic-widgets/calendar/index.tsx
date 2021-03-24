import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import { CALENDAR_DATE_FORMAT, CALENDAR_FORMAT, CALENDAR_TIME_FORMAT } from './constants';
import { CalendarEventBusProvider } from './event/calendar-event-bus';
import { CalendarPicker } from './picker';
import { CalendarState } from './types';
import { CalendarCaret, CalendarContainer, CalendarLabel } from './widgets';

const getPosition = (container: HTMLDivElement) => {
	const rect = container.getBoundingClientRect();
	return {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height
	};
};

export const Calendar = (props: {
	onChange: (value?: string) => (void | { active: boolean });
	value?: string,
}) => {
	const { onChange, value, ...rest } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [ state, setState ] = useState<CalendarState>(() => {
		const date = dayjs();
		return {
			active: false,
			top: 0,
			left: 0,
			width: 0,
			height: 0,
			initValue: date,
			value: date
		};
	});

	useEffect(() => {
		const onScroll = () => {
			if (!state.active) {
				return;
			}
			const { top, left, width, height } = getPosition(containerRef.current!);
			setState({ ...state, top, left, width, height });
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
		const { top, left, width, height } = getPosition(containerRef.current!);
		const currentDate = value ? dayjs(value) : dayjs();
		setState({
			active: true,
			top,
			left,
			width,
			height,
			initValue: currentDate,
			value: currentDate
		});
	};
	const onBlurred = async () => {
		if (state.initValue === state.value) {
			setState({ ...state, active: false });
		} else {
			const ret = onChange(state.value!.format(CALENDAR_FORMAT));
			if (ret && ret.active) {
				setState({ ...state, active: true });
			} else {
				setState({ ...state, active: false });
			}
		}
	};

	const onClear = () => {
		const ret = onChange();
		if (!ret || !ret.active) {
			setState({ ...state, value: dayjs(), active: false });
		} else {
			setState({ ...state, value: dayjs() });
		}
	};
	const onConfirm = (value: Dayjs) => {
		const ret = onChange(value!.format(CALENDAR_FORMAT));
		if (!ret || !ret.active) {
			setState({ ...state, value, active: false });
		} else {
			setState({ ...state, value });
		}
	};

	return <CalendarEventBusProvider>
		<CalendarContainer data-options-visible={state.active}
		                   {...state}
		                   {...rest}
		                   role='input' tabIndex={0} ref={containerRef}
		                   onClick={onClicked} onBlur={onBlurred}>
			<CalendarLabel>{value}</CalendarLabel>
			<CalendarCaret icon={faCaretDown}/>
			<CalendarPicker state={state} confirm={onConfirm} clear={onClear}/>
		</CalendarContainer>
	</CalendarEventBusProvider>;
};

export {
	CALENDAR_FORMAT,
	CALENDAR_DATE_FORMAT,
	CALENDAR_TIME_FORMAT
};