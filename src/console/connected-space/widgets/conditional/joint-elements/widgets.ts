import styled from 'styled-components';
import {GRID_ROW_GAP} from '../constants';

export const JointElementsContainer = styled.div.attrs({'data-widget': 'joint-elements'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin-left           : var(--margin);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		bottom           : 0;
		left             : calc(var(--margin) / -2);
		width            : 1px;
		height           : calc(100% + ${GRID_ROW_GAP} + (var(--height) - var(--param-height)) / 2);
		background-color : transparent;
		border-left      : var(--border);
		z-index          : -1;
	}
`;
