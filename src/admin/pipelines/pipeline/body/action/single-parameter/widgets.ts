import styled from 'styled-components';
import { GRID_ROW_GAP } from '../../constants';

export const SingleParameterContainer = styled.div.attrs({ 'data-widget': 'expression-side' })`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-auto-rows        : minmax(var(--height), auto);
	grid-row-gap          : ${GRID_ROW_GAP};
	&:before {
		content       : '';
		display       : block;
		position      : absolute;
		top           : calc(var(--height) / -2);
		left          : calc(var(--margin) / -2);
		width         : calc(var(--margin) / 2);
		height        : var(--height);
		border-left   : var(--border);
		border-bottom : var(--border);
		z-index       : -1;
	}
	&:last-child:before {
		border-bottom-left-radius : var(--border-radius);
	}
	&:not(:last-child) {
		:after {
			content          : '';
			display          : block;
			position         : absolute;
			top              : calc(var(--height) / 2);
			left             : calc(var(--margin) / -2);
			width            : 1px;
			height           : calc(100% - var(--height) / 2);
			background-color : var(--border-color);
			z-index          : -1;
		}
	}
`;