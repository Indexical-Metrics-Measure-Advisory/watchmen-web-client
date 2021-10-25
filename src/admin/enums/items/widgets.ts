import {HEADER_HEIGHT} from '@/widgets/basic/constants';
import styled from 'styled-components';

const ITEMS_TABLE_HEADER_HEIGHT = HEADER_HEIGHT;
const ITEMS_TABLE_FOOTER_HEIGHT = HEADER_HEIGHT;
const GRID_COLUMNS = '64px 150px 1fr 150px 150px';

export const ItemsTableContainer = styled.div.attrs({'data-widget': 'enum-items-table'})`
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
	grid-template-rows    : var(--height) ${ITEMS_TABLE_HEADER_HEIGHT}px;
	align-items           : center;
	margin                : 0 calc(var(--margin) / -2);
	padding               : 0 calc(var(--margin) / 2);
	border-bottom         : var(--border);
	> svg {
		margin-left : calc(var(--margin) / -2);
		min-width   : var(--margin);
	}
	> input {
		grid-column   : 2 / span 4;
		margin-left   : calc(-64px + var(--margin) / -2);
		padding-left  : var(--margin);
		border-radius : 0;
		border        : 0;
		border-bottom : var(--border);
		width         : calc(100% + 64px + var(--margin));
		//&::placeholder {
		//	font-variant : petite-caps;
		//}
	}
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
	height                : calc(${ITEMS_TABLE_HEADER_HEIGHT}px * 0.8);
	margin                : 0 calc(var(--margin) / -2);
	padding               : 0 calc(var(--margin) / 2);
	border-radius         : var(--border-radius);
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
`;
export const ItemsTableBodyCell = styled.div.attrs({'data-widget': 'enum-items-table-body-cell'})`
	display       : flex;
	align-items   : center;
	white-space   : nowrap;
	overflow-x    : hidden;
	text-overflow : ellipsis;
`;
export const ItemsTableBodyPageableContainer = styled.div.attrs({'data-widget': 'enum-items-table-body-pageable'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : calc(${ITEMS_TABLE_FOOTER_HEIGHT}px * 1.5);
	margin      : 0 calc(var(--margin) / -2);
	> span {
		margin-right : calc(var(--margin) / 2);
		font-variant : petite-caps;
	}
	> div[data-widget=dropdown] {
		width : 150px;
	}
`;

export const ItemsTableFooter = styled.div.attrs({'data-widget': 'enum-items-table-footer'})`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : ${ITEMS_TABLE_FOOTER_HEIGHT}px;
	margin-top      : var(--margin);
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 3);
	}
`;

