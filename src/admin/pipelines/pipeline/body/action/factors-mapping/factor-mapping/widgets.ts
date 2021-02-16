import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_ROW_GAP } from '../../../constants';

export const FactorMappingContainer = styled.div.attrs({ 'data-widget': 'factor-mapping' })`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;
