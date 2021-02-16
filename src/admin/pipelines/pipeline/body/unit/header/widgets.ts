import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_COLUMNS } from '../../constants';

export const UnitHeaderContainer = styled.div.attrs({ 'data-widget': 'unit-header' })`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	align-items           : center;
	overflow              : hidden;
	margin                : calc(var(--margin) / -4) calc(var(--margin) / -2);
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
	> div[data-widget="header-buttons"] {
		top   : calc((var(--margin) / 2 + var(--height) - var(--param-height)) / 2);
		right : calc(var(--margin) / 2);
	}
`;
