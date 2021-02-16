import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_COLUMNS } from '../../constants';

export const UnitHeaderContainer = styled.div.attrs({ 'data-widget': 'unit-header' })`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	align-items           : center;
`;
