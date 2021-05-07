import styled from 'styled-components';
import {GRID_ROW_GAP} from '../../../constants';
import {LeadLabel} from '../../../widgets';

export const FactorMappingContainer = styled.div.attrs({'data-widget': 'factor-mapping'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : ${GRID_ROW_GAP};
	grid-auto-rows        : minmax(var(--height), auto);
	> div[data-widget="pipeline-editor-lead-label"] {
		margin-right : calc(var(--margin) / 2);
	}
	> div[data-widget="single-parameter"] {
		grid-column : 2 / span 3;
		&:before {
			content                   : '';
			display                   : block;
			position                  : absolute;
			top                       : calc(var(--height) / 2 - 1px);
			left                      : calc(var(--margin) / -2);
			width                     : calc(var(--margin) / 2);
			height                    : calc(100% + ${GRID_ROW_GAP} + 1px);
			border                    : var(--border);
			border-right              : 0;
			border-top-left-radius    : var(--border-radius);
			border-bottom-left-radius : var(--border-radius);
			background-color          : transparent;
			z-index                   : -2;
		}
	}
	> div[data-widget="aggregate-arithmetic"] {
		grid-column : 2;
	}
	> div[data-widget="factor-finder"] {
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : calc(var(--height) / 2);
			left             : calc(var(--margin) / -2);
			width            : calc(var(--margin) / 2);
			height           : 1px;
			background-color : var(--border-color);
		}
	}
`;
export const FactorMappingLeadLabel = styled(LeadLabel)`
	font-weight : normal;
`;
export const RemoveMeButton = styled.div.attrs({'data-widget': 'remove-me-button'})`
	display         : flex;
	position        : relative;
	align-self      : center;
	align-items     : center;
	justify-content : center;
	width           : var(--param-height);
	height          : var(--param-height);
	border-radius   : 100%;
	box-shadow      : var(--param-border);
	opacity         : 0.7;
	cursor          : pointer;
	transition      : box-shadow 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
	&:before {
		content                   : '';
		display                   : block;
		position                  : absolute;
		bottom                    : 50%;
		left                      : calc(var(--margin) / -2);
		width                     : calc(var(--margin) / 2);
		height                    : 1px;
		background-color          : transparent;
		border-left               : var(--border);
		border-bottom             : var(--border);
		border-bottom-left-radius : var(--border-radius);
		z-index                   : -1;
	}
	&:hover {
		color      : var(--danger-color);
		opacity    : 1;
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
`;