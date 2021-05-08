import styled from 'styled-components';
import {GRID_ROW_GAP} from '../constants';

export const ConditionalContainer = styled.div.attrs({'data-widget': 'conditional'})`
	display               : grid;
	grid-template-columns : 1fr;
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;
export const ConditionalHeader = styled.div.attrs({'data-widget': 'conditional-header'})`
	display : flex;
`;
export const RemoveMeButton = styled.div.attrs({'data-widget': 'remove-me-button'})`
	display         : flex;
	position        : relative;
	align-self      : center;
	align-items     : center;
	justify-content : center;
	width           : var(--param-height);
	height          : var(--param-height);
	margin-left     : calc(var(--margin) / 2);
	border-radius   : 100%;
	box-shadow      : var(--param-border);
	opacity         : 0.7;
	cursor          : pointer;
	transition      : box-shadow 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		bottom                    : 50%;
		left                      : calc(var(--margin) / -2);
		width                     : calc(var(--margin) / 2);
		height                    : 1px;
		background-color          : transparent;
		border-left               : var(--border);
		border-bottom             : var(--border);
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
	}
	&:hover {
		color      : var(--danger-color);
		opacity    : 1;
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
`;