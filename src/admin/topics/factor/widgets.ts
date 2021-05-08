import styled from 'styled-components';
import {GRID_ROW_HEIGHT} from '../../../basic-widgets/constants';
import {TooltipButton} from '../../../basic-widgets/tooltip-button';
import {TuplePropertyDropdown, TuplePropertyInput} from '../../widgets/tuple-workbench/tuple-editor';

export const FactorRowContainer = styled.div`
	display               : grid;
	grid-template-columns : 10% 20% 10% 20% 10% 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
	margin                : 0 calc(var(--margin) / -2);
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
	border-radius         : var(--border-radius);
	&:nth-child(2n + 1) {
		background-color : var(--grid-rib-bg-color);
	}
`;
export const FactorPropLabel = styled.span`
	> span:first-child {
		color       : var(--warn-color);
		font-weight : var(--font-bold);
	}
`;
export const FactorCell = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : ${GRID_ROW_HEIGHT}px;
	transition  : all 300ms ease-in-out;
`;

export const FactorSerialCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-serial-cell'})`
	font-variant : petite-caps;
	font-weight  : var(--fond-bold);
	padding      : 0 2px;
	&:hover + div + div + div + div + div[data-widget="factor-buttons"] > button {
		opacity        : 1;
		pointer-events : auto;
	}
`;

export const FactorNameCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-name-cell'})``;
export const FactorLabelCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-label-cell'})`
	grid-column: span 3;
`;
export const FactorTypeCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-type-cell'})``;
export const FactorEnumCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-enum-cell'})``;
export const FactorDefaultValueCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-default-value-cell'})`
	+ span {
		grid-column: 1;
	}
`;
export const FactorIndexGroupCellContainer = styled(FactorCell).attrs({'data-widget': 'factor-index-group-cell'})``;

export const FactorPropInput = styled(TuplePropertyInput)`
	width : 100%;
`;
export const FactorPropDropdown = styled(TuplePropertyDropdown)`
	width : 100%;
`;
export const IncorrectFactorType = styled.span`
	color           : var(--danger-color);
	text-decoration : line-through;
`;

export const FactorButtonsContainer = styled(FactorCell).attrs({'data-widget': 'factor-buttons'})`
	grid-column  : 5 / span 2;
	justify-self : end;
`;
export const FactorButton = styled(TooltipButton).attrs({'data-widget': 'factor-button'})`
	width          : 24px;
	height         : 24px;
	padding        : 0;
	&:not(:first-child) {
		margin-left : calc(var(--margin) / 4);
	}
`;
