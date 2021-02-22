import styled from 'styled-components';
import { Button } from '../../../../../../basic-widgets/button';

export const DimensionContainer = styled.div.attrs({ 'data-widget': 'report-dimension' })`
	display               : grid;
	grid-template-columns : 32px 1fr;
	position              : relative;
	grid-column           : 1 / span 2;
	align-items           : center;
	font-size             : 1.1em;
	height                : calc(var(--height) + 1px);
	padding-left          : calc(var(--margin) / 2);
	padding-right         : calc(var(--margin) / 2);
	border-bottom         : var(--border);
	> div[data-widget="chart-settings-prop-value"] {
		border-bottom : 0;
		height        : var(--height);
	}
	> div[data-widget="report-dimension-delete-me"] {
		display : none;
	}
	&:hover {
		grid-template-columns : 32px 1fr 32px;
		padding-right         : 0;
		> div[data-widget="report-dimension-delete-me"] {
			display : flex;
		}
	}
`;
export const DimensionIndexLabel = styled.div.attrs({ 'data-widget': 'report-dimension-index' })`
	display       : flex;
	align-items   : center;
	height        : var(--height);
	font-weight   : var(--font-demi-bold);
	border-right  : var(--border);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const IncorrectOptionLabel = styled.span.attrs({ 'data-widget': 'incorrect-option' })`
	color           : var(--danger-color);
	text-decoration : line-through;
`;
export const DeleteMeContainer = styled.div.attrs({ 'data-widget': 'report-dimension-delete-me' })`
	display     : flex;
	align-items : center;
	height      : var(--height);
`;
export const DeleteMeButton = styled(Button)`
	height  : var(--button-height-in-form);
	width   : var(--button-height-in-form);
	padding : 0;
	&:hover {
		color      : var(--danger-color);
		box-shadow : var(--param-danger-border), var(--danger-hover-shadow);
	}
`;