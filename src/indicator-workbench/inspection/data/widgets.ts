import styled from 'styled-components';
import {Columns} from './utils';

export const DataContainer = styled.div.attrs({'data-widget': 'inspection-data'})`
	display  : block;
	position : relative;
`;
export const DataGridContainer = styled.div.attrs({
	'data-widget': 'inspection-grid',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	max-height     : calc(var(--header-height) + var(--border-width) * 2 + (var(--grid-row-height) + var(--border-width)) * 19 + var(--grid-row-height) + var(--border-width) * 4);
	overflow       : auto;
	border         : var(--border);
	border-width   : calc(var(--border-width) * 2);
	border-radius  : calc(var(--border-radius) * 2);
`;
export const DataGridHeader = styled.div.attrs<{ columns: Columns }>(({columns}) => {
	return {
		'data-widget': 'inspection-grid-header',
		style: {
			gridTemplateColumns: `40px ${columns.map(column => column.width ?? 200).map(x => `${x}px`).join(' ')} 1fr`
		}
	};
})<{ columns: Columns }>`
	display             : grid;
	position            : sticky;
	top                 : 0;
	width               : 100%;
	border-bottom       : var(--border);
	border-bottom-width : calc(var(--border-width) * 2);
	background-color    : var(--bg-color);
	z-index             : 1;
`;
export const DataGridHeaderCell = styled.div.attrs<{ isSelected?: boolean }>(
	{'data-widget': 'inspection-grid-header-cell'}
)<{ isSelected?: boolean }>`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--header-height);
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	padding       : 0 calc(var(--margin) / 4);
	border-right  : var(--border);
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
	opacity       : 0.9;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : ${({isSelected}) => isSelected ? 'var(--warn-color)' : (void 0)};
		opacity          : 0.1;
		z-index          : -1;
	}
`;
export const DataGridNoData = styled.div.attrs({'data-widget': 'inspection-grid-no-data'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : var(--header-height);
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	padding      : 0 calc(var(--margin) / 4) 0 calc(40px + var(--margin) / 4);
	opacity      : 0.7;
`;
export const DataGridBodyRow = styled.div.attrs<{ columns: Columns; isSelected: boolean }>(({columns}) => {
	return {
		'data-widget': 'inspection-grid-body-row',
		style: {
			gridTemplateColumns: `40px ${columns.map(column => column.width ?? 200).map(x => `${x}px`).join(' ')} 1fr`
		}
	};
})<{ columns: Columns; isSelected: boolean }>`
	display       : grid;
	position      : relative;
	width         : 100%;
	border-bottom : var(--border);
	&:last-child {
		border-bottom-width : 0;
	}
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : ${({isSelected}) => isSelected ? 'var(--warn-color)' : (void 0)};
		opacity          : 0.1;
		z-index          : -1;
	}
`;
export const DataGridBodyRowIndexCell = styled.div.attrs({'data-widget': 'inspection-grid-body-row-index-cell'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	justify-self : stretch;
	height       : var(--grid-row-height);
	padding      : 0 calc(var(--margin) / 4);
	border-right : var(--border);
	font-size    : 0.8em;
	overflow     : hidden;
	white-space  : nowrap;
	opacity      : 0.8;
`;
export const DataGridBodyRowCell = styled.div.attrs<{ isNumeric?: boolean; isSelected: boolean }>(
	({isNumeric = false}) => {
		return {
			'data-widget': 'inspection-grid-body-row-cell',
			style: {
				justifyContent: isNumeric ? 'flex-end' : (void 0)
			}
		};
	})<{ isNumeric?: boolean; isSelected: boolean }>`
	display       : flex;
	position      : relative;
	align-items   : center;
	height        : var(--grid-row-height);
	padding       : 0 calc(var(--margin) / 4);
	border-right  : var(--border);
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
	opacity       : 0.9;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : ${({isSelected}) => isSelected ? 'var(--warn-color)' : (void 0)};
		opacity          : 0.1;
		z-index          : -1;
	}
`;

