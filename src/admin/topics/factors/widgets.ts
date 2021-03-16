import styled from 'styled-components';
import { RoundDwarfButton } from '../../../basic-widgets/button';
import { HEADER_HEIGHT } from '../../../basic-widgets/constants';

export const FactorsTableButton = styled(RoundDwarfButton).attrs({ 'data-widget': 'factors-table-button' })`
	align-self   : center;
	justify-self : flex-start;
`;

const FACTORS_TABLE_FOOTER_HEIGHT = HEADER_HEIGHT;

export const FactorsTableContainer = styled.div.attrs({ 'data-widget': 'factors-table' })`
	grid-column    : span 2;
	display        : flex;
	flex-direction : column;
	font-size      : 0.8em;
	// editor in grid layout, 30% 70%, column gap is 32px, table is second column in editor.
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
	margin-bottom  : var(--margin);
`;

export const FactorsTableBodyContainer = styled.div.attrs({
	'data-widget': 'factors-table-body',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	position       : relative;
	margin         : 0 calc(var(--margin) / -2);
	padding        : 0 calc(var(--margin) / 2);
`;

export const FactorsTableFooter = styled.div.attrs({ 'data-widget': 'factors-table-footer' })`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : ${FACTORS_TABLE_FOOTER_HEIGHT}px;
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 3);
	}
`;

