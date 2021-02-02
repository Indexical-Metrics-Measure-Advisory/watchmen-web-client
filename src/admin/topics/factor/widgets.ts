import styled from 'styled-components';
import { TooltipButton } from '../../../basic-widgets/tooltip-button';
import { TuplePropertyDropdown, TuplePropertyInput } from '../../widgets/tuple-workbench/tuple-editor';
import { FACTORS_TABLE_ROW_HEIGHT } from '../factors/widgets';

export const FactorCell = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : ${FACTORS_TABLE_ROW_HEIGHT}px;
	transition  : all 300ms ease-in-out;
	&:nth-child(12n + 7),
	&:nth-child(12n + 8),
	&:nth-child(12n + 9),
	&:nth-child(12n + 10),
	&:nth-child(12n + 11),
	&:nth-child(12n) {
		background-color : var(--grid-rib-bg-color);
	}
`;

export const FactorSerialCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-serial-cell' })`
	font-variant : petite-caps;
	font-weight  : var(--fond-bold);
	padding      : 0 2px;
	&:hover + div + div + div + div + div[data-widget="factor-buttons"] > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;

export const FactorNameCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-name-cell' })`
	// 4px fill gap caused by vertical scroll
	margin-right : -4px;
	&:hover + div + div + div + div[data-widget="factor-buttons"] > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorLabelCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-label-cell' })`
	// 4px fill gap caused by vertical scroll
	margin-left : 4px;
	margin-right : -4px;
	&:hover + div + div + div[data-widget="factor-buttons"] > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorTypeCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-type-cell' })`
	// 4px fill gap caused by vertical scroll
	margin-left : 4px;
	margin-right : -4px;
	&:hover + div + div[data-widget="factor-buttons"] > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorDefaultValueCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-default-value-cell' })`
	// 4px fill gap caused by vertical scroll
	margin-left : 4px;
	margin-right : -4px;
	&:hover + div[data-widget="factor-buttons"] > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;

export const FactorPropInput = styled(TuplePropertyInput)`
	width        : 100%;
	border-color : transparent;
	margin-right : var(--input-indent);
	&:hover {
		border-color : var(--border-color);
		box-shadow   : var(--hover-shadow);
		z-index      : 1;
	}
	&:focus {
		border-color     : var(--primary-color);
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
		z-index          : 2;
	}
`;
export const FactorPropDropdown = styled(TuplePropertyDropdown)`
	width        : 100%;
	border-color : transparent;
	margin-right : var(--input-indent);
	&:hover {
		border-color : var(--border-color);
		box-shadow   : var(--hover-shadow);
		z-index      : 1;
	}
	&:focus {
		border-color     : var(--primary-color);
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
	}
	> div[data-widget="dropdown-options-container"] {
		border-color : var(--primary-color);
		box-shadow   : var(--primary-hover-shadow);
	}
`;
export const IncorrectFactorType = styled.span`
	color           : var(--danger-color);
	text-decoration : line-through;
`;

export const FactorButtonsContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-buttons' })`
	// 4px fill gap caused by vertical scroll
	margin-left : 4px;
	margin-right : -4px;
	&:hover > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorButton = styled(TooltipButton).attrs({ 'data-widget': 'factor-button' })`
	width          : 24px;
	height         : 24px;
	padding        : 0;
	border-radius  : 100%;
	opacity        : 0;
	pointer-events : none;
	&:not(:first-child) {
		margin-left : calc(var(--margin) / 4);
	}
`;
