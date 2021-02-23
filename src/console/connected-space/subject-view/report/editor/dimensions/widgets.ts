import styled from 'styled-components';
import { Button, DwarfButton } from '../../../../../../basic-widgets/button';
import { PropValue } from '../settings-widgets/widgets';

export const DimensionContainer = styled.div.attrs({ 'data-widget': 'report-dimension' })`
	display               : grid;
	grid-template-columns : 32px 1fr 32px;
	position              : relative;
	grid-column           : 1 / span 2;
	align-items           : center;
	font-size             : 1.1em;
	height                : calc(var(--height) + 1px);
	border-bottom         : var(--border);
	> div[data-widget="chart-settings-prop-value"] {
		border-bottom : 0;
		height        : var(--height);
	}
`;
export const DimensionIndexLabel = styled.div.attrs({ 'data-widget': 'report-dimension-index' })`
	display         : flex;
	align-items     : center;
	justify-content : center;
	height          : var(--height);
	font-weight     : var(--font-demi-bold);
	padding         : 0 calc(var(--margin) / 8);
	border-right    : var(--border);
	white-space     : nowrap;
	overflow        : hidden;
	text-overflow   : ellipsis;
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
	> svg {
		font-size : 0.8em;
	}
`;
export const AddDimensionContainer = styled(PropValue)`
	grid-column     : 1 / span 2;
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : flex-end;
	padding         : 0 calc(var(--margin) / 2);
`;
export const AddDimensionButton = styled(DwarfButton)`
`;