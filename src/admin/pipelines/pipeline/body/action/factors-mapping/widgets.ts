import styled from 'styled-components';
import { GRID_ROW_GAP } from '../../constants';

export const FactorsMappingContainer = styled.div.attrs({ 'data-widget': 'factors-mapping' })`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;
