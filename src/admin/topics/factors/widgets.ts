import styled from 'styled-components';
import { RoundDwarfButton } from '../../../basic-widgets/button';

export const FactorsTableButton = styled(RoundDwarfButton).attrs({ 'data-widget': 'factors-table-button' })`
	align-self   : center;
	justify-self : flex-start;
`;

const FACTORS_TABLE_HEADER_HEIGHT = 32;
export const FACTORS_TABLE_ROW_HEIGHT = 36;
const FACTORS_TABLE_SERIAL_COLUMN_WIDTH = 32;
const FACTORS_TABLE_LABEL_COLUMN_WIDTH = 200;
const FACTORS_TABLE_TYPE_COLUMN_WIDTH = 230;
const FACTORS_TABLE_DEFAULT_COLUMN_WIDTH = 150;
const FACTORS_TABLE_BUTTONS_COLUMN_WIDTH = 60;
const FACTORS_TABLE_FOOTER_HEIGHT = 40;

const GRID_COLUMNS = [
	FACTORS_TABLE_SERIAL_COLUMN_WIDTH,
	'1fr',
	FACTORS_TABLE_LABEL_COLUMN_WIDTH,
	FACTORS_TABLE_TYPE_COLUMN_WIDTH,
	FACTORS_TABLE_DEFAULT_COLUMN_WIDTH,
	FACTORS_TABLE_BUTTONS_COLUMN_WIDTH
].map(x => typeof x === 'number' ? `${x}px` : x).join(' ');

export const FactorsTableContainer = styled.div.attrs({ 'data-widget': 'factors-table' })`
	grid-column    : span 2;
	display        : flex;
	flex-direction : column;
	font-size      : 0.8em;
	// editor in grid layout, 30% 70%, column gap is 32px, table is second column in editor.
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
	margin-bottom  : var(--margin);
`;
export const FactorsTableHeader = styled.div.attrs({ 'data-widget': 'factors-table-header' })`
	display               : grid;
	grid-template-columns : ${GRID_COLUMNS};
	margin: 0 calc(var(--margin) / -2);
	padding: 0 calc(var(--margin) / 2);
`;
export const FactorsTableHeaderCell = styled.div.attrs({ 'data-widget': 'factors-table-header-cell' })`
	display       : flex;
	align-items   : center;
	height        : ${FACTORS_TABLE_HEADER_HEIGHT}px;
	border-bottom : var(--border);
	padding-left  : var(--input-indent);
	font-variant  : petite-caps;
	font-weight   : var(--font-bold);
	// serial header cell
	&:first-child {
		padding-left : 2px;
	}
`;

export const FactorsTableBodyContainer = styled.div.attrs({
	'data-widget': 'factors-table-body',
	'data-v-scroll': ''
})`
	display               : grid;
	position              : relative;
	grid-template-columns : ${GRID_COLUMNS};
	margin                : 0 calc(var(--margin) / -2);
	padding               : 0 calc(var(--margin) / 2);
	max-height            : ${FACTORS_TABLE_ROW_HEIGHT * 15.5}px;
	overflow-x            : visible;
	overflow-y            : scroll;
`;

export const FactorsTableFooter = styled.div.attrs({ 'data-widget': 'factors-table-footer' })`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : ${FACTORS_TABLE_FOOTER_HEIGHT}px;
	border-top      : var(--border);
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 3);
	}
`;

