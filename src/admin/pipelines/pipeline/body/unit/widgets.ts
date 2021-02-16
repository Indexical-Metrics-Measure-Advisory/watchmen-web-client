import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_COLUMNS, GRID_ROW_GAP } from '../constants';

export const UnitContainer = styled.div.attrs({ 'data-widget': 'unit' })`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin                : calc(var(--margin) / 4) calc(var(--margin) / -2) 0 calc(var(--margin) / -2);
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		border-radius    : calc(var(--border-radius) * 3);
		opacity          : 0.05;
		z-index          : -1;
	}
	+ div[data-widget=unit] {
		margin-top : calc(var(--margin) / 2);
	}
`;
