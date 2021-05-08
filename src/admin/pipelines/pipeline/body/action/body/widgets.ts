import styled from 'styled-components';
import {GRID_ACTION_COLUMNS, GRID_COLUMN_GAP, GRID_ROW_GAP} from '../../constants';

export const ActionBodyContainer = styled.div.attrs({'data-widget': 'action-body'})`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_ACTION_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	padding-right         : calc(var(--margin) / 4);
`;