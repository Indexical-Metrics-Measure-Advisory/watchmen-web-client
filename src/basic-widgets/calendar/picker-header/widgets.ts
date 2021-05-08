import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {DROPDOWN_Z_INDEX} from '../../constants';
import {CalendarState} from '../types';
import {DROPDOWN_HEIGHT, DROPDOWN_WIDTH} from '../widgets';

export const CalendarPickerContainer = styled.div.attrs<CalendarState>(({active, top, left, width, height}) => {
	const atBottom = top + height + DROPDOWN_HEIGHT < window.innerHeight;
	return {
		style: {
			height: DROPDOWN_HEIGHT,
			width: DROPDOWN_WIDTH,
			top: atBottom ? (top + height - 1) : 'unset',
			bottom: atBottom ? 'unset' : `calc(100vh - ${top + 1}px)`,
			left,
			borderTopLeftRadius: atBottom ? 0 : 'var(--border-radius)',
			borderTopRightRadius: (atBottom && width >= 364) ? 0 : 'var(--border-radius)',
			borderBottomLeftRadius: atBottom ? 'var(--border-radius)' : 0,
			borderBottomRightRadius: (atBottom || width < 364) ? 'var(--border-radius)' : 0,
			opacity: active ? 1 : (void 0),
			pointerEvents: active ? 'auto' : (void 0)
		}
	};
})<CalendarState>`
	display          : flex;
	flex-direction   : column;
	position         : fixed;
	pointer-events   : none;
	opacity          : 0;
	background-color : var(--bg-color);
	border           : var(--border);
	transition       : opacity 300ms ease-in-out;
	z-index          : ${DROPDOWN_Z_INDEX};
`;
export const CalendarPickerHeaderContainer = styled.div`
	display       : flex;
	align-items   : center;
	border-bottom : var(--border);
	height        : 32px;
	padding       : 0 0 0 calc(var(--margin) / 2);
	cursor        : default;
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
export const CalendarPickerHeaderIcon = styled(FontAwesomeIcon)`
	width        : var(--margin);
	margin-right : calc(var(--margin) / 2);
`;
export const CalendarPickerHeaderDateLabel = styled.span`
	margin-right : calc(var(--margin) / 2);
	font-weight  : var(--font-bold);
	cursor       : pointer;
`;
export const CalendarPickerHeaderTimeLabel = styled.span`
	cursor : pointer;
`;
export const CalendarPickerHeaderPlaceholder = styled.span`
	flex-grow : 1;
`;
export const CalendarPickerHeaderTimeButton = styled.div`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	color            : var(--invert-color);
	background-color : var(--primary-color);
	height           : var(--button-height-in-form);
	min-width        : 50px;
	font-variant     : petite-caps;
	cursor           : pointer;
	&:not(:last-child) {
		border-top-left-radius    : var(--border-radius);
		border-bottom-left-radius : var(--border-radius);
	}
	&:last-child:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 30%;
		left             : 0;
		height           : 40%;
		width            : 1px;
		background-color : var(--invert-color);
		opacity          : 0.7;
	}
`;
