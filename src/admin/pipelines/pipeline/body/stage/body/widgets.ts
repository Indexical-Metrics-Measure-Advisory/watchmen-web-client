import styled from 'styled-components';
import {GRID_COLUMN_GAP, GRID_COLUMNS, GRID_ROW_GAP} from '../../constants';

export const StageBodyContainer = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		'data-widget': 'stage-body',
		style: {
			display: expanded ? (void 0) : 'none'
		}
	};
})<{ expanded: boolean }>`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
`;