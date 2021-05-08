import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import {CalendarState} from './types';

export const DROPDOWN_HEIGHT = 290;
export const DROPDOWN_WIDTH = 364;

export const CalendarContainer = styled.div.attrs<CalendarState>(() => {
	return {'data-widget': 'calendar'};
})<CalendarState>(({top, height}) => {
	const atBottom = top + height + DROPDOWN_HEIGHT < window.innerHeight;
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
		}
	`;
});
export const CalendarLabel = styled.span`
	white-space   : nowrap;
	text-overflow : ellipsis;
	overflow-x    : hidden;
	flex-grow     : 1;
`;
export const CalendarCaret = styled(FontAwesomeIcon)`
	opacity     : 0;
	margin-left : var(--letter-gap);
	transition  : all 300ms ease-in-out;
`;
