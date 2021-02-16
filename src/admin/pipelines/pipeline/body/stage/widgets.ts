import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_COLUMNS, GRID_ROW_GAP } from '../constants';

export const StageContainer = styled.div.attrs({ 'data-widget': 'stage' })`
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin-top            : calc(var(--margin) / 4);
	padding-top           : calc(var(--margin) / 4);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : calc(var(--margin) / -2);
		width            : calc(100% + var(--margin));
		height           : 1px;
		border-top       : var(--border);
		border-top-style : dashed;
		border-top-color : var(--primary-color);
		opacity          : 0.3;
	}
`;
