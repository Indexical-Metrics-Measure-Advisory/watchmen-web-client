import styled from 'styled-components';
import { GRID_COLUMN_GAP, GRID_COLUMNS, GRID_ROW_GAP } from '../constants';
import { LeadLabel } from '../widgets';

export const ActionContainer = styled.div.attrs({ 'data-widget': 'action' })`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin                : calc(var(--margin) / 4) 0;
`;
export const ActionLeadLabel = styled(LeadLabel)`
	font-variant : none;
	font-weight  : var(--font-boldest);
`;
