import styled from 'styled-components';
import {GRID_ACTION_COLUMNS, GRID_COLUMN_GAP, GRID_ROW_GAP} from '../constants';
import {FooterLeadLabel, LeadLabel} from '../widgets';

export const ActionContainer = styled.div.attrs({'data-widget': 'action'})`
	grid-column           : 1 / span 2;
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_ACTION_COLUMNS};
	grid-column-gap       : ${GRID_COLUMN_GAP};
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	margin-top            : calc(var(--margin) / 8);
	padding               : calc(var(--margin) / 4);
	border-radius         : var(--param-height);
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
		border-radius    : var(--param-height);
	}
	&:after {
		content       : '';
		display       : block;
		position      : absolute;
		top           : 0;
		left          : 0;
		width         : 100%;
		height        : 100%;
		border-radius : var(--param-height);
		border-width  : calc(var(--border-width) * 2);
		border-color  : var(--danger-color);
		border-style  : solid;
		opacity       : 0;
		transition    : all 300ms ease-in-out;
		z-index       : -1;
	}
	&:hover {
		&:after {
			opacity : 0.3;
		}
	}
	> div[data-widget="header-buttons"] {
		top   : calc((var(--margin) / 2 + var(--height) - var(--param-height)) / 2);
		right : calc(var(--margin) / 2);
	}
`;
export const ActionLeadLabel = styled(LeadLabel)`
	font-weight : var(--font-boldest);
	color       : var(--warn-color);
`;
export const ActionLeadLabelThin = styled(LeadLabel)`
	font-weight : normal;
`;
export const ActionFooterLeadLabel = styled(FooterLeadLabel)`
	grid-column : 1 / span 2;
`;