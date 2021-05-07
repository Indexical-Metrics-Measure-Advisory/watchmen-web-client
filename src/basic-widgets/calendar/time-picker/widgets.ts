import styled from 'styled-components';
import {DROPDOWN_HEIGHT} from '../widgets';

export const TimePickerContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr 1fr 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding               : 0 calc(var(--margin) / 2) calc(var(--margin) / 2);
	cursor                : default;
`;
export const TimePickerCloseButton = styled.div`
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
`;
export const TimePickerLabel = styled.div`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	height       : calc(var(--height) * 1.5);
	font-weight  : var(--font-bold);
`;
export const TimePickerSelector = styled.div.attrs({'data-v-scroll': ''})`
	display        : flex;
	flex-direction : column;
	height         : calc(${DROPDOWN_HEIGHT}px - 32px - var(--height) * 1.5 - var(--margin) / 2);
	border-radius  : var(--border-radius);
	border         : var(--border);
	overflow-y     : scroll;
`;
export const TimePickerSelectorOption = styled.span`
	display     : flex;
	align-items : center;
	min-height  : var(--height);
	padding     : 0 calc(var(--margin) / 2);
	cursor      : pointer;
	&:hover {
		background-color : var(--hover-color);
	}
`;