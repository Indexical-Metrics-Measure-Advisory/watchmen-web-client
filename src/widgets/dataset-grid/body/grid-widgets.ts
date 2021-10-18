import styled from 'styled-components';
import {TooltipButton} from '../../basic/tooltip-button';
import {FILLER_MIN_WIDTH, HEADER_HEIGHT, ROW_HEIGHT} from '../constants';
import {ColumnDef} from '../types';

interface GridProps {
	columns: Array<ColumnDef>,
	autoFill: boolean
}

export const GridContainer = styled.div
	.attrs<GridProps>(
		({columns, autoFill}) => {
			const fixTableWidth = columns.reduce((width, column) => width + column.width, 0);
			return {
				'data-widget': 'dataset-grid',
				'data-v-scroll': '',
				'data-h-scroll': '',
				style: {
					minWidth: autoFill ? (void 0) : fixTableWidth
				}
			};
		})<GridProps & { rowCount: number }>`
	display        : flex;
	flex-direction : column;
	position       : relative;
	height         : 100%;
	&:first-child {
		overflow-x : hidden;
		overflow-y : auto;
		> div[data-widget="dataset-grid-body"] > div:after {
			content          : '';
			display          : block;
			position         : absolute;
			left             : 0;
			width            : 100%;
			height           : 100%;
			background-color : var(--primary-color);
			opacity          : 0.02;
		}
		&:after {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 0;
			right            : 0;
			width            : 1px;
			height           : ${({rowCount}) => ROW_HEIGHT * rowCount}px;
			background-color : var(--border-color);
		}
		&::-webkit-scrollbar {
			background-color : transparent;
			width            : 0;
		}
	}
	&:nth-child(2) {
		flex-grow : 1;
		overflow  : auto;
	}
	&[data-scrollable=false]:nth-child(2) {
		overflow : hidden;
	}
`;

export const GridHeader = styled.div
	.attrs<GridProps>(({columns, autoFill}) => {
		return {
			'data-widget': 'dataset-grid-header',
			style: {
				// each data column hold 2 physical columns, the first is show data, the second is for show drag placeholder
				gridTemplateColumns: autoFill ? `0 ${columns.map(def => `${def.width}px 0`).join(' ')} minmax(${FILLER_MIN_WIDTH}px, 1fr)` : `0 ${columns.map(def => `${def.width}px 0`).join(' ')}`
			}
		};
	})<GridProps>`
	display       : grid;
	position      : sticky;
	top           : 0;
	justify-items : stretch;
	align-items   : stretch;
	height        : ${HEADER_HEIGHT}px;
	z-index       : 1;
`;

export const GridHeaderCell = styled.div
	.attrs<{ column: number, filler?: true }>(({column, filler}) => {
		return {
			'data-widget': 'dataset-grid-header-cell',
			style: {
				gridColumn: column,
				borderRightColor: filler ? 'transparent' : 'var(--border-color)'
			}
		};
	})<{ lastColumn: boolean, column: number, filler?: true }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	font-size        : 0.8em;
	font-family      : var(--title-font-family);
	height           : ${HEADER_HEIGHT}px;
	background-color : var(--bg-color);
	padding          : 0 8px;
	border-right     : var(--border);
	border-bottom    : var(--border);
	box-shadow       : -1px 0 0 0 var(--border-color);
	&:not([data-rowno=true]):not([data-filler=true]) {
		&:hover {
			> div[data-widget='dataset-grid-header-cell-buttons'] {
				opacity        : 1;
				pointer-events : auto;
				transition     : all 300ms ease-in-out;
			}
		}
	}
	&[data-dragging=true] {
		display : none;
	}
	> span {
		flex-grow     : 1;
		white-space   : nowrap;
		overflow      : hidden;
		text-overflow : ellipsis;
	}
	> button {
		opacity   : 0.7;
		font-size : 0.9em;
		> svg:nth-child(2) {
			display          : block;
			position         : absolute;
			z-index          : 1;
			top              : 50%;
			left             : 50%;
			transform        : translate(-50%, -50%) scale(0.8);
			transform-origin : center center;
		}
	}
`;
export const GridHeaderCellButtons = styled.div.attrs({
	'data-widget': 'dataset-grid-header-cell-buttons'
})`
	display          : flex;
	position         : absolute;
	height           : 31px;
	top              : 0;
	right            : 0;
	padding          : calc(var(--margin) / 8);
	background-color : var(--bg-color);
	opacity          : 0;
	pointer-events   : none;
	> button {
		font-size : 0.9em;
		width     : 24px;
	}
`;
export const GridHeaderCellButton = styled(TooltipButton)`
	width   : var(--button-height-in-form);
	height  : var(--button-height-in-form);
	padding : 0;
`;

export const GridBody = styled.div
	.attrs<GridProps>(({columns, autoFill}) => {
		return {
			'data-widget': 'dataset-grid-body',
			style: {
				// each data column hold 2 physical columns, the first is show data, the second is for show drag placeholder
				gridTemplateColumns: autoFill ? `0 ${columns.map(def => `${def.width}px 0`).join(' ')} minmax(${FILLER_MIN_WIDTH}px, 1fr)` : `0 ${columns.map(def => `${def.width}px 0`).join(' ')}`
			}
		};
	})<GridProps>`
	display        : grid;
	justify-items  : stretch;
	align-items    : stretch;
	grid-auto-rows : ${ROW_HEIGHT}px;
`;

export const GridBodyCell = styled.div
	.attrs<{ lastRow: boolean, column: number, filler?: true }>(({lastRow, column, filler}) => {
		return {
			'data-widget': 'dataset-grid-body-cell',
			style: {
				gridColumn: column,
				borderBottom: lastRow ? 0 : 'var(--border)',
				borderRightColor: filler ? 'transparent' : 'var(--border-color)'
			}
		};
	})<{ lastRow: boolean, lastColumn: boolean, column: number, filler?: true }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	font-size        : 0.8em;
	padding          : 0 8px;
	background-color : var(--invert-color);
	border-right     : var(--border);
	box-shadow       : -1px 0 0 0 var(--border-color);
	&[data-rowno=true] {
		&:hover {
			cursor : e-resize;
		}
		> span {
			font-family      : var(--title-font-family);
			transform        : scale(0.8);
			transform-origin : left;
		}
	}
	&[data-last-row=true] {
		box-shadow : -1px 0 0 0 var(--border-color), 0 1px 0 0 var(--border-color);
	}
	&[data-dragging=true] {
		display : none;
	}
	> span {
		flex-grow     : 1;
		white-space   : nowrap;
		overflow      : hidden;
		text-overflow : ellipsis;
	}
`;
