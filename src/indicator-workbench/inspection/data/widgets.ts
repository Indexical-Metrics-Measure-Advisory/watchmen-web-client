import styled from 'styled-components';
import {Columns} from '../types';

export const DataContainer = styled.div.attrs({'data-widget': 'inspection-data'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 1fr;
	grid-row-gap          : calc(var(--margin) / 2);
`;
export const DataToolbarContainer = styled.div.attrs({'data-widget': 'inspection-data-toolbar'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;
export const DataGridContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'inspection-grid',
		'data-v-scroll': '',
		'data-h-scroll': '',
		style: {
			maxHeight: visible ? (void 0) : 0,
			borderColor: visible ? (void 0) : 'transparent',
			overflow: visible ? (void 0) : 'hidden'
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	max-height     : calc(var(--header-height) + var(--border-width) * 2 + (var(--grid-row-height) + var(--border-width)) * 19 + var(--grid-row-height) + var(--border-width) * 4);
	overflow       : auto;
	border         : var(--border);
	border-width   : calc(var(--border-width) * 2);
	border-radius  : calc(var(--border-radius) * 2);
	transition     : max-height 300ms ease-in-out, border-color 300ms ease-in-out;
`;
export const DataGridHeader = styled.div.attrs<{ columns: Columns }>(({columns}) => {
	return {
		'data-widget': 'inspection-grid-header',
		style: {
			gridTemplateColumns: `40px ${columns.map(column => column.width ?? 200).map(x => `${x}px`).join(' ')} 1fr`,
			width: 40 + columns.reduce((width, column) => width + (column.width ?? 200), 0)
		}
	};
})<{ columns: Columns }>`
	display             : grid;
	position            : sticky;
	top                 : 0;
	min-width           : 100%;
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
	min-height    : var(--header-height);
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
	min-height   : var(--header-height);
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	padding      : 0 calc(var(--margin) / 4) 0 calc(40px + var(--margin) / 4);
	opacity      : 0.7;
`;
export const DataGridBodyRow = styled.div.attrs<{ columns: Columns; isSelected: boolean }>(({columns}) => {
	return {
		'data-widget': 'inspection-grid-body-row',
		style: {
			gridTemplateColumns: `40px ${columns.map(column => column.width ?? 200).map(x => `${x}px`).join(' ')} 1fr`,
			width: 40 + columns.reduce((width, column) => width + (column.width ?? 200), 0)
		}
	};
})<{ columns: Columns; isSelected: boolean }>`
	display       : grid;
	position      : relative;
	min-width     : 100%;
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
	min-height   : var(--grid-row-height);
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
	min-height    : var(--grid-row-height);
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
export const DataChartsContainer = styled.div.attrs({'data-widget': 'inspection-charts'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	> span[data-widget=inspection-label] {
		align-self : start;
	}
`;
export const Charts = styled.div.attrs({'data-widget': 'inspection-charts-content'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(2, calc((100% - var(--margin)) / 2));
	grid-column-gap       : var(--margin);
`;
export const ChartGroupTitle = styled.div.attrs({'data-widget': 'inspection-chart-group-title'})`
	display       : flex;
	position      : relative;
	grid-column   : 1 / span 2;
	align-items   : center;
	font-variant  : petite-caps;
	font-weight   : var(--font-demi-bold);
	min-height    : var(--header-height);
	padding       : 0 calc(var(--margin) / 2);
	border-radius : calc(var(--border-radius) * 2);
	margin-bottom : calc(var(--margin) / 2);
	overflow      : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.2;
		z-index          : -1;
	}
`;
export const ChartContainer = styled.div.attrs({'data-widget': 'inspection-chart'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	padding-top    : 75%;
	> div[data-widget=inspection-chart-container] {
		position      : absolute;
		flex-grow     : 1;
		margin-top    : -75%;
		height        : calc(100% - var(--height));
		width         : 100%;
		border        : var(--border);
		border-width  : calc(var(--border-width) * 2);
		border-radius : calc(var(--border-radius) * 2);
	}
`;
export const ChartLabel = styled.div.attrs({'data-widget': 'inspection-charts-sample'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	font-variant    : petite-caps;
	font-weight     : var(--font-demi-bold);
	line-height     : calc(var(--height) * 2);
	margin-top      : calc(var(--height) * -2);
`;
