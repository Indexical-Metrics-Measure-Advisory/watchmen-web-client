import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { faCaretDown, faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs, { Dayjs } from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ICON_BACK } from './constants';

interface State {
	active: boolean;
	top: number;
	left: number;
	width: number;
	height: number;
	initValue?: Dayjs;
	value?: Dayjs;

	pickTime?: boolean;
	pickYearMonth?: boolean;
}

const getPosition = (container: HTMLDivElement) => {
	const rect = container.getBoundingClientRect();
	return {
		top: rect.top,
		left: rect.left,
		width: rect.width,
		height: rect.height
	};
};

const getLastDateOfMonth = (year: number, month: number): 28 | 29 | 30 | 31 => {
	switch (month + 1) {
		case 4:
		case 6:
		case 9:
		case 11:
			return 30;
		case 2:
			return year % 400 === 0 ? 29 : (year % 100 === 0 ? 28 : (year % 4 === 0) ? 29 : 28);
		default:
			return 31;
	}
};

const computeCalendarDays = (firstDate: Dayjs) => {
	const weekday = firstDate.day();
	const year = firstDate.year();
	const month = firstDate.month();
	const lastDate = getLastDateOfMonth(year, month);
	const days = new Array(lastDate).fill(1).map((v, index) => {
		return { year, month, date: index + 1 };
	});
	if (weekday !== 0) {
		const previousMonth = month === 0 ? 11 : (month - 1);
		const previousYear = month === 0 ? (year - 1) : year;
		let previousLastDate = getLastDateOfMonth(previousYear, previousMonth);
		for (let index = weekday - 1; index >= 0; index--) {
			days.unshift({ year: previousYear, month: previousMonth, date: previousLastDate-- });
		}
	}
	const length = days.length;
	if (length < 42) {
		const nextMonth = month === 11 ? 0 : (month + 1);
		const nextYear = month === 11 ? (year + 1) : year;
		let date = 1;
		for (let index = days.length; index < 42; index++) {
			days.push({ year: nextYear, month: nextMonth, date: date++ });
		}
	}
	return days;
};

const Container = styled.div.attrs<State>(() => {
	return { 'data-widget': 'calendar' };
})<State>(({ top, height }) => {
	const atBottom = top + height + 290 < window.innerHeight;
	return `
		position: relative;
		padding: 6px var(--input-indent);
		outline: none;
		appearance: none;
		border: var(--border);
		border-radius: var(--border-radius);
		font-size: var(--font-size);
		height: var(--height);
		line-height: var(--line-height);
		color: var(--font-color);
		background-color: transparent;
		transition: all 300ms ease-in-out;
		display: flex;
		align-items: center;
		cursor: pointer;
		width: 100%;
		> svg {
			opacity: 0;
			margin-left: var(--letter-gap);
			transition: all 300ms ease-in-out;
		}
		&:hover,
		&:focus {
			> svg {
				opacity: 1;
			}
		}
		&[data-options-visible=true]:focus {
			border-bottom-left-radius: ${atBottom ? 0 : 'var(--border-radius)'};
			border-bottom-right-radius: ${atBottom ? 0 : 'var(--border-radius)'};
			border-top-left-radius: ${atBottom ? 'var(--border-radius)' : 0};
			border-top-right-radius: ${atBottom ? 'var(--border-radius)' : 0};
			> div:last-child {
				opacity: 1;
				pointer-events: auto;
			}
		}
	`;
});
const Label = styled.span`
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow-x    : hidden;
	flex-grow     : 1;
`;
const Picker = styled.div.attrs<State>(({ top, left, width, height }) => {
	const atBottom = top + height + 290 < window.innerHeight;
	return {
		style: {
			top: atBottom ? (top + height - 1) : 'unset',
			bottom: atBottom ? 'unset' : `calc(100vh - ${top + 1}px)`,
			left,
			borderTopLeftRadius: atBottom ? 0 : 'var(--border-radius)',
			borderTopRightRadius: (atBottom && width >= 364) ? 0 : 'var(--border-radius)',
			borderBottomLeftRadius: atBottom ? 'var(--border-radius)' : 0,
			borderBottomRightRadius: (atBottom || width < 364) ? 'var(--border-radius)' : 0
		}
	};
})<State>`
	display          : flex;
	flex-direction   : column;
	position         : fixed;
	width            : 364px;
	height           : 290px;
	pointer-events   : none;
	opacity          : 0;
	background-color : var(--bg-color);
	border           : var(--border);
	transition       : opacity 300ms ease-in-out;
	z-index          : 999;
`;
const PickerHeader = styled.div`
	display       : flex;
	align-items   : center;
	border-bottom : var(--border);
	height        : 32px;
	padding       : 0 0 0 calc(var(--margin) / 2);
	cursor        : default;
	> svg {
		width        : 32px;
		margin-right : calc(var(--margin) / 2);
	}
	> span:nth-child(2) {
		margin-right : calc(var(--margin) / 2);
		font-weight  : var(--font-bold);
		cursor       : pointer;
	}
	> span:nth-child(3) {
		cursor : pointer;
	}
	> span:nth-child(4) {
		flex-grow : 1;
	}
	> span:nth-child(5),
	> span:nth-child(6) {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		padding          : 0 calc(var(--margin) / 3);
		height           : 33px;
		min-width        : 50px;
		margin-top       : -1px;
		background-color : var(--primary-color);
		color            : var(--invert-color);
		cursor           : pointer;
	}
	> span:nth-child(6) {
		margin-right            : -1px;
		border-top-right-radius : var(--border-radius);
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 25%;
			left             : 0;
			width            : 1px;
			height           : 50%;
			background-color : var(--invert-color);
		}
	}
`;
const DatePickerBody = styled.div`
	display               : grid;
	grid-template-columns : auto 1fr;
	cursor                : default;
	> div:first-child {
		display        : flex;
		flex-direction : column;
		grid-row       : span 2;
		border-right   : var(--border);
		> span {
			display     : flex;
			align-items : center;
			height      : 32px;
			padding     : 0 calc(var(--margin) / 2);
			cursor      : pointer;
			user-select : none;
			transition  : all 300ms ease-in-out;
			&:hover {
				background-color : var(--hover-color);
			}
		}
	}
	> div:nth-last-child(2) {
		display         : flex;
		align-items     : center;
		justify-content : space-between;
		height          : 32px;
		padding         : 0 calc(var(--margin) / 2);
		> span {
			font-weight : var(--font-bold);
		}
		> div {
			display     : flex;
			align-items : center;
			> span {
				display         : flex;
				align-items     : center;
				justify-content : center;
				font-weight     : var(--font-bold);
				border-radius   : var(--border-radius);
				user-select     : none;
				transition      : all 300ms ease-in-out;
				cursor          : pointer;
				&:hover {
					background-color : var(--hover-color);
				}
				&:first-child {
					transform        : scale(0.8);
					transform-origin : right;
					padding          : 2px 6px;
				}
				&:not(:first-child) {
					height : 20px;
					width  : 24px;
				}
			}
		}
	}
	> div:last-child {
		display               : grid;
		grid-template-columns : repeat(7, 32px);
		grid-template-rows    : repeat(7, 32px);
		> span {
			display         : flex;
			align-items     : center;
			justify-content : center;
			position        : relative;
			text-align      : center;
			cursor          : pointer;
			&:nth-child(-n + 7) {
				color       : var(--primary-color);
				font-weight : var(--font-bold);
				opacity     : 0.7;
				cursor      : default;
			}
			&:first-child,
			&:nth-child(7) {
				color : var(--danger-color);
			}
			&:not(:nth-child(-n + 7)) {
				&:before {
					content          : '';
					display          : block;
					position         : absolute;
					top              : 4px;
					left             : 4px;
					height           : 24px;
					width            : 24px;
					border-radius    : 100%;
					background-color : var(--hover-color);
					opacity          : 0;
					z-index          : -1;
					transition       : all 300ms ease-in-out;
				}
				&:hover:before {
					opacity : 1;
				}
			}
			&[data-current-month=false] {
				color : var(--hover-color);
				&:hover {
					color : var(--primary-color);
				}
			}
			&[data-today=true] {
				font-weight : var(--font-bold);
				color       : var(--primary-color);
			}
			&[data-current=true] {
				color : var(--invert-color);
				&:before {
					background-color : var(--invert-color);
					box-shadow       : 0 0 11px 0 rgba(0, 0, 0, 0.1);
					opacity          : 1;
					z-index          : -2;
				}
				&:after {
					content          : '';
					display          : block;
					position         : absolute;
					top              : 7px;
					left             : 7px;
					height           : 18px;
					width            : 18px;
					border-radius    : 100%;
					background-color : var(--primary-color);
					z-index          : -1;
				}
			}
		}
	}
`;
const DatePickerButtons = styled.div`
	display  : flex;
	position : absolute;
	bottom   : -1px;
	right    : -1px;
	> div {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		padding          : 0 calc(var(--margin) / 3);
		min-width        : 80px;
		height           : 32px;
		background-color : var(--primary-color);
		color            : var(--invert-color);
		box-shadow       : 0 0 11px 0 rgba(0, 0, 0, 0.1);
		cursor           : pointer;
		z-index          : 1;
	}
	> div:first-child {
		border-top-left-radius : var(--border-radius);
	}
	> div:last-child {
		border-bottom-right-radius : var(--border-radius);
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 25%;
			left             : 0;
			width            : 1px;
			height           : 50%;
			background-color : var(--invert-color);
		}
	}
`;
const TimePickerBody = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr 1fr 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding               : 0 calc(var(--margin) / 2) calc(var(--margin) / 2);
	cursor                : default;
	> div:first-child {
		display                   : flex;
		align-items               : center;
		justify-content           : center;
		position                  : absolute;
		top                       : calc((var(--height) * 1.5 - 32px) / 2);
		right                     : 0;
		height                    : var(--height);
		width                     : 32px;
		background-color          : var(--primary-color);
		color                     : var(--invert-color);
		cursor                    : pointer;
		border-top-left-radius    : var(--border-radius);
		border-bottom-left-radius : var(--border-radius);
	}
	> div:nth-child(-n + 4):not(:first-child) {
		display      : flex;
		align-items  : center;
		font-variant : petite-caps;
		height       : calc(var(--height) * 1.5);
		font-weight  : var(--font-bold);
	}
	> div:nth-last-child(-n + 3) {
		display        : flex;
		flex-direction : column;
		height         : calc(290px - 32px - var(--height) * 1.5 - var(--margin) / 2);
		border-radius  : var(--border-radius);
		border         : var(--border);
		overflow-y     : scroll;
		> span {
			display     : flex;
			align-items : center;
			min-height  : var(--height);
			padding     : 0 calc(var(--margin) / 2);
			cursor      : pointer;
			&:hover {
				background-color : var(--hover-color);
			}
		}
	}
`;
const YearMonthPickerBody = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 33% 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding               : 0 calc(var(--margin) / 2) calc(var(--margin) / 2);
	cursor                : default;
	> div:first-child {
		display                   : flex;
		align-items               : center;
		justify-content           : center;
		position                  : absolute;
		top                       : calc((var(--height) * 1.5 - 32px) / 2);
		right                     : 0;
		height                    : var(--height);
		width                     : 32px;
		background-color          : var(--primary-color);
		color                     : var(--invert-color);
		cursor                    : pointer;
		border-top-left-radius    : var(--border-radius);
		border-bottom-left-radius : var(--border-radius);
	}
	> div:nth-child(-n + 3):not(:first-child) {
		display      : flex;
		align-items  : center;
		font-variant : petite-caps;
		height       : calc(var(--height) * 1.5);
		font-weight  : var(--font-bold);
	}
	> div:nth-last-child(2) {
		display        : flex;
		flex-direction : column;
		height         : calc(290px - 32px - var(--height) * 1.5 - var(--margin) / 2);
		border-radius  : var(--border-radius);
		border         : var(--border);
		overflow-y     : scroll;
		> span {
			display     : flex;
			align-items : center;
			min-height  : var(--height);
			padding     : 0 calc(var(--margin) / 2);
			cursor      : pointer;
			&:hover {
				background-color : var(--hover-color);
			}
		}
	}
	> div:last-child {
		display               : grid;
		grid-template-columns : 1fr 1fr 1fr;
		grid-column-gap       : calc(var(--margin) / 2);
		grid-row-gap          : calc(var(--margin) / 2);
		> span {
			display         : flex;
			align-items     : center;
			justify-content : center;
			border-radius   : var(--border-radius);
			cursor          : pointer;
			&:hover {
				background-color : var(--hover-color);
			}
		}
	}
`;

export const CALENDAR_DATE_FORMAT = 'YYYY/MM/DD';
export const CALENDAR_TIME_FORMAT = 'HH:mm:ss';
export const CALENDAR_FORMAT = `${CALENDAR_DATE_FORMAT} ${CALENDAR_TIME_FORMAT}`;

export const Calendar = (props: {
	onChange: (value?: string) => (void | { active: boolean });
	value?: string,
}) => {
	const { onChange, value, ...rest } = props;

	const containerRef = useRef<HTMLDivElement>(null);
	const [ state, setState ] = useState<State>({
		active: false,
		top: 0,
		left: 0,
		width: 0,
		height: 0,
		value: (void 0)
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
	const onDayStartClicked = () => setState({
		...state,
		value: state.value!.hour(0).minute(0).second(0).millisecond(0)
	});
	const onDayEndClicked = () => setState({
		...state,
		value: state.value!.hour(23).minute(59).second(59).millisecond(999)
	});
	const onDateClicked = (date: Dayjs) => () => setState(({ value }) => {
		let newValue = date.clone();
		if (value) {
			newValue = newValue.hour(value.hour()).minute(value.minute()).second(value.second()).millisecond(value.millisecond());
		}
		return {
			...state,
			value: newValue
		};
	});
	const onTodayClicked = onDateClicked(dayjs());
	const onYesterdayClicked = onDateClicked(dayjs().subtract(1, 'day'));
	const onWeekendClicked = onDateClicked(dayjs().day(6));
	const onPrevWeekendClicked = onDateClicked(dayjs().day(6).subtract(1, 'week'));
	const onMonthEndClicked = onDateClicked(dayjs().date(1).add(1, 'month').subtract(1, 'day'));
	const onPrevMonthEndClicked = onDateClicked(dayjs().date(1).subtract(1, 'day'));
	const onYearEndClicked = onDateClicked(dayjs().month(11).date(31));
	const onPrevYearEndClicked = onDateClicked(dayjs().month(11).date(31).subtract(1, 'year'));
	const onGotoTodayClicked = () => setState({ ...state, value: today });
	const onGotoPrevMonthClicked = () => setState({ ...state, value: state.value!.subtract(1, 'month') });
	const onGotoNextMonthClicked = () => setState({ ...state, value: state.value!.add(1, 'month') });

	const onTimeClicked = () => setState({ ...state, pickTime: true });
	const onCancelPickTimeClicked = () => setState({ ...state, pickTime: false });
	const onHourChange = (index: number) => () => setState({ ...state, value: state.value!.hour(index) });
	const onMinuteChange = (index: number) => () => setState({ ...state, value: state.value!.minute(index) });
	const onSecondChange = (index: number) => () => setState({ ...state, value: state.value!.second(index) });
	const onYearMonthClicked = () => setState({ ...state, pickYearMonth: true });
	const onCancelPickYearMonthClicked = () => setState({ ...state, pickYearMonth: false });
	const onYearChange = (year: number) => () => setState({ ...state, value: state.value!.year(year) });
	const onMonthChange = (month: number) => () => setState({ ...state, value: state.value!.month(month) });

	const currentValue = state.value || dayjs();
	const currentDisplayDate = currentValue.format(CALENDAR_DATE_FORMAT);
	const currentDisplayTime = currentValue.format(CALENDAR_TIME_FORMAT);
	const currentYear = currentValue.year();
	const currentMonth = currentValue.month();
	const currentDate = currentValue.date();

	const currentDisplayMonth = currentValue.format('MMM YYYY');
	const firstDayOfDisplayMonth = currentValue.clone().date(1);
	const days = computeCalendarDays(firstDayOfDisplayMonth);

	const today = dayjs();
	const todayYear = today.year();
	const todayMonth = today.month();
	const todayDate = today.date();

	const onClearClicked = () => {
		const ret = onChange();
		if (!ret || !ret.active) {
			setState({ ...state, active: false });
		}
	};
	const onConfirmClicked = () => {
		const ret = onChange(state.value!.format(CALENDAR_FORMAT));
		if (!ret || !ret.active) {
			setState({ ...state, active: false });
		}
	};

	return <Container data-options-visible={state.active}
	                  {...state}
	                  {...rest}
	                  role='input' tabIndex={0} ref={containerRef}
	                  onClick={onClicked} onBlur={onBlurred}>
		<Label>{value}</Label>
		<FontAwesomeIcon icon={faCaretDown}/>
		<Picker {...state}>
			<PickerHeader>
				<FontAwesomeIcon icon={faCalendarAlt}/>
				<span onClick={onYearMonthClicked}>{currentDisplayDate}</span>
				<span onClick={onTimeClicked}>{currentDisplayTime}</span>
				<span/>
				<span onClick={onDayStartClicked}>Start</span>
				<span onClick={onDayEndClicked}>End</span>
			</PickerHeader>
			{!state.pickTime && !state.pickYearMonth
				? <>
					<DatePickerBody>
						<div>
							<span onClick={onTodayClicked}>Today</span>
							<span onClick={onYesterdayClicked}>Yesterday</span>
							<span onClick={onWeekendClicked}>This Weekend</span>
							<span onClick={onPrevWeekendClicked}>Prev Weekend</span>
							<span onClick={onMonthEndClicked}>This Month End</span>
							<span onClick={onPrevMonthEndClicked}>Prev Month End</span>
							<span onClick={onYearEndClicked}>This Year End</span>
							<span onClick={onPrevYearEndClicked}>Prev Year End</span>
						</div>
						<div>
							<span>{currentDisplayMonth}</span>
							<div>
								<span onClick={onGotoTodayClicked}>TODAY</span>
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
					</DatePickerBody>
					<DatePickerButtons>
						<div onClick={onClearClicked}>Clear</div>
						<div onClick={onConfirmClicked}>Confirm</div>
					</DatePickerButtons>
				</>
				: null}
			{state.pickTime
				? <TimePickerBody>
					<div onClick={onCancelPickTimeClicked}>
						<FontAwesomeIcon icon={ICON_BACK} transform={{ rotate: 180 }}/>
					</div>
					<div>Hour</div>
					<div>Minute</div>
					<div>Second</div>
					<div data-v-scroll=''>
						{new Array(24).fill(1).map((v, index) => {
							return <span onClick={onHourChange(index)} key={index}>
								{`${index}`.padStart(2, '0')}
							</span>;
						})}
					</div>
					<div data-v-scroll=''>
						{new Array(60).fill(1).map((v, index) => {
							return <span onClick={onMinuteChange(index)} key={index}>
								{`${index}`.padStart(2, '0')}
							</span>;
						})}
					</div>
					<div data-v-scroll=''>
						{new Array(60).fill(1).map((v, index) => {
							return <span onClick={onSecondChange(index)} key={index}>
								{`${index}`.padStart(2, '0')}
							</span>;
						})}
					</div>
				</TimePickerBody>
				: null}
			{state.pickYearMonth
				? <YearMonthPickerBody>
					<div onClick={onCancelPickYearMonthClicked}>
						<FontAwesomeIcon icon={ICON_BACK} transform={{ rotate: 180 }}/>
					</div>
					<div>Year</div>
					<div>Month</div>
					<div data-v-scroll=''>
						{new Array(100).fill(1).map((v, index) => {
							const year = new Date().getFullYear() - index;
							return <span onClick={onYearChange(year)} key={index}>
								{year}
							</span>;
						})}
					</div>
					<div>
						<span onClick={onMonthChange(0)}>Jan</span>
						<span onClick={onMonthChange(1)}>Feb</span>
						<span onClick={onMonthChange(2)}>Mar</span>
						<span onClick={onMonthChange(3)}>Apr</span>
						<span onClick={onMonthChange(4)}>May</span>
						<span onClick={onMonthChange(5)}>Jun</span>
						<span onClick={onMonthChange(6)}>Jul</span>
						<span onClick={onMonthChange(7)}>Aug</span>
						<span onClick={onMonthChange(8)}>Sep</span>
						<span onClick={onMonthChange(9)}>Oct</span>
						<span onClick={onMonthChange(10)}>Nov</span>
						<span onClick={onMonthChange(11)}>Dec</span>
					</div>
				</YearMonthPickerBody>
				: null}
		</Picker>
	</Container>;
};