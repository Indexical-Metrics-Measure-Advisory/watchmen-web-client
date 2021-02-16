import styled from 'styled-components';
import { GRID_ACTION_COLUMNS, GRID_COLUMN_GAP, GRID_ROW_GAP } from '../constants';
import { LeadLabel } from '../widgets';

export const ActionContainer = styled.div.attrs({ 'data-widget': 'action' })`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_ACTION_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin-top            : calc(var(--margin) / 8);
	padding               : calc(var(--margin) / 4);
	border-radius         : calc(var(--border-radius) * 3);
	&:first-child {
		margin-top : 0;
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.05;
		border-radius    : calc(var(--border-radius) * 3);
	}
`;
export const ActionLeadLabel = styled(LeadLabel)`
	font-weight : var(--font-boldest);
`;
export const ActionLeadLabelThin = styled(LeadLabel)`
	font-weight : normal;
`;