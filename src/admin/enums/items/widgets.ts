import styled from 'styled-components';
import { HEADER_HEIGHT } from '../../../basic-widgets/constants';

const FACTORS_TABLE_HEADER_HEIGHT = HEADER_HEIGHT;
const FACTORS_TABLE_FOOTER_HEIGHT = HEADER_HEIGHT;
const GRID_COLUMNS = '64px 150px 1fr 150px 150px';

export const ItemsTableContainer = styled.div.attrs({ 'data-widget': 'enum-items-table' })`
	grid-column    : span 2;
	display        : flex;
	flex-direction : column;
	font-size      : 0.8em;
	margin-top     : calc(var(--margin) * 2.5);
	// editor in grid layout, 30% 70%, column gap is 32px, table is second column in editor.
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
	margin-bottom  : var(--margin);
`;

export const ItemsTableHeaderContainer = styled.div.attrs({
	'data-widget': 'enum-items-table-header',
	'data-v-scroll': ''
})`
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	height                : ${FACTORS_TABLE_HEADER_HEIGHT}px;
	margin                : 0 calc(var(--margin) / -2);
	padding               : 0 calc(var(--margin) / 2);
	border-bottom         : var(--border);
`;
export const ItemsTableHeaderCell = styled.div.attrs({
	'data-widget': 'enum-items-table-header-cell',
	'data-v-scroll': ''
})`
	display       : flex;
	align-items   : center;
	font-weight   : var(--font-demi-bold);
	white-space   : nowrap;
	overflow-x    : hidden;
	text-overflow : ellipsis;
`;

export const ItemsTableBodyContainer = styled.div.attrs({
	'data-widget': 'enum-items-table-body',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	position       : relative;
`;

export const ItemsTableBodyRow = styled.div.attrs({
	'data-widget': 'enum-items-table-body-row',
	'data-v-scroll': ''
})`
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	height                : calc(${FACTORS_TABLE_HEADER_HEIGHT}px * 0.8);
	margin                : 0 calc(var(--margin) / -2);
	padding               : 0 calc(var(--margin) / 2);
	border-radius         : var(--border-radius);
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
`;
export const ItemsTableBodyCell = styled.div.attrs({
	'data-widget': 'enum-items-table-body-cell',
	'data-v-scroll': ''
})`
	display       : flex;
	align-items   : center;
	white-space   : nowrap;
	overflow-x    : hidden;
	text-overflow : ellipsis;
`;

export const ItemsTableFooter = styled.div.attrs({ 'data-widget': 'enum-items-table-footer' })`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : ${FACTORS_TABLE_FOOTER_HEIGHT}px;
	margin-top      : var(--margin);
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 3);
	}
`;

