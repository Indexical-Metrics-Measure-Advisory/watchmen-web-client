import styled from 'styled-components';
import { GRID_ROW_GAP } from '../constants';

export const ConditionalContainer = styled.div.attrs({ 'data-widget': 'conditional' })`
	display               : grid;
	grid-template-columns : 1fr;
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;