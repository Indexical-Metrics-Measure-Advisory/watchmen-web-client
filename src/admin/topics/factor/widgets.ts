import styled from 'styled-components';
import { TooltipButton } from '../../../basic-widgets/tooltip-button';
import { TuplePropertyDropdown, TuplePropertyInput } from '../../widgets/tuple-workbench/tuple-editor';
import { FACTORS_TABLE_ROW_HEIGHT, FACTORS_TABLE_ROW_OUTDENT } from '../factors/widgets';

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
	&:hover + div + div + div + div + div[data-widget="factor-buttons"] {
		opacity        : 1;
		pointer-events : auto;
	}
`;

export const FactorNameCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-name-cell' })`
	&:hover + div + div + div + div[data-widget="factor-buttons"] {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorLabelCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-label-cell' })`
	&:hover + div + div + div[data-widget="factor-buttons"] {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorTypeCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-type-cell' })`
	&:hover + div + div[data-widget="factor-buttons"] {
		opacity        : 1;
		pointer-events : auto;
	}
`;
export const FactorDefaultValueCellContainer = styled(FactorCell).attrs({ 'data-widget': 'factor-default-value-cell' })`
	margin-right : -4px;
	&:hover + div[data-widget="factor-buttons"] {
		opacity        : 1;
		pointer-events : auto;
	}
	> input {
		margin-right : 0;
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

export const FactorButtonsContainer = styled.div.attrs<{index:number}>(({index}) => {
	return {
		'data-widget': 'factor-buttons',
		style: {
			top: index * FACTORS_TABLE_ROW_HEIGHT
		}
	}
})<{index:number}>`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : flex-end;
	left            : 0;
	width           : ${FACTORS_TABLE_ROW_OUTDENT}px;
	height          : ${FACTORS_TABLE_ROW_HEIGHT}px;
	padding         : 0 calc(var(--margin) / 4);
	opacity         : 0;
	pointer-events  : none;
	transition      : all 300ms ease-in-out;
	&:hover {
		opacity        : 1;
		pointer-events : auto;
	}
	//button {
	//	width: 24px;
	//	height: 24px;
	//	font-size: 1em;
	//	color: var(--invert-color);
	//	border-radius: 12px;
	//	&:before {
	//		border-radius: 12px;
	//	}
	//	&:first-child {
	//		background-color: var(--console-danger-color);
	//		margin-right: calc(var(--margin) / 8);
	//	}
	//	&:last-child {
	//		background-color: var(--console-primary-color);
	//	}
	//}
`;
export const FactorButton = styled(TooltipButton).attrs({ 'data-widget': 'factor-button' })`
	width         : 24px;
	height        : 24px;
	padding       : 0;
	border-radius : 100%;
	&:not(:first-child) {
		margin-left : calc(var(--margin) / 4);
	}
`;
