import styled from 'styled-components';
import { TuplePropertyDropdown, TuplePropertyInput } from '../../widgets/tuple-workbench/tuple-editor';
import { FACTORS_TABLE_ROW_HEIGHT } from '../factors/widgets';

export const FactorCell = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : ${FACTORS_TABLE_ROW_HEIGHT}px;
	transition  : all 300ms ease-in-out;
	&:nth-child(8n + 5), &:nth-child(8n + 6), &:nth-child(8n + 7), &:nth-child(8n) {
		background-color : var(--grid-rib-bg-color);
	}
`;

export const FactorNameCellContainer = styled(FactorCell)`
	&:hover + div + div + div {
		> div {
			opacity        : 1;
			pointer-events : auto;
		}
	}
`;
export const FactorLabelCellContainer = styled(FactorCell)`
	&:hover + div + div {
		> div {
			opacity        : 1;
			pointer-events : auto;
		}
	}
`;
export const FactorTypeCellContainer = styled(FactorCell)`
	&:hover + div {
		> div {
			opacity        : 1;
			pointer-events : auto;
		}
	}
`;
export const FactorDefaultValueCellContainer = styled(FactorCell)`
	margin-right : -4px;
	&:hover {
		// buttons
		> div {
			opacity        : 1;
			pointer-events : auto;
		}
	}
	> input {
		margin-right: 0;
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

// export const FactorButtons = styled.div`
// 	display: flex;
// 	position: absolute;
// 	opacity: 0;
// 	pointer-events: none;
// 	padding: 4px 8px;
// 	left: calc((${FACTOR_TABLE_NAME_COLUMN_WIDTH}px + ${FACTOR_TABLE_LABEL_COLUMN_WIDTH}px + ${FACTOR_TABLE_TYPE_COLUMN_WIDTH}px + ${FACTOR_BUTTONS_WIDTH}px) * -1);
// 	height: ${FACTOR_ROW_HEIGHT}px;
// 	&[data-max=true] {
// 		left: calc((${FACTOR_TABLE_MAX_NAME_COLUMN_WIDTH}px + ${FACTOR_TABLE_MAX_LABEL_COLUMN_WIDTH}px + ${FACTOR_TABLE_TYPE_COLUMN_WIDTH}px + ${FACTOR_BUTTONS_WIDTH}px) * -1);
// 	}
// 	button {
// 		width: 24px;
// 		height: 24px;
// 		font-size: 1em;
// 		color: var(--invert-color);
// 		border-radius: 12px;
// 		&:before {
// 			border-radius: 12px;
// 		}
// 		&:first-child {
// 			background-color: var(--console-danger-color);
// 			margin-right: calc(var(--margin) / 8);
// 		}
// 		&:last-child {
// 			background-color: var(--console-primary-color);
// 		}
// 	}
// `;
