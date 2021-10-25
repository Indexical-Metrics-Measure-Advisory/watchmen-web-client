import {RoundDwarfButton} from '@/widgets/basic/button';
import {HEADER_HEIGHT} from '@/widgets/basic/constants';
import styled from 'styled-components';

export const FactorsTableButton = styled(RoundDwarfButton).attrs({'data-widget': 'factors-table-button'})`
	align-self   : center;
	justify-self : flex-start;
`;

export const FactorsTableContainer = styled.div.attrs({'data-widget': 'factors-table'})`
	grid-column    : span 2;
	display        : flex;
	flex-direction : column;
	font-size      : 0.8em;
	// editor in grid layout, 30% 70%, column gap is 32px, table is second column in editor.
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
	margin-bottom  : var(--margin);
`;

export const FactorsTableHeaderContainer = styled.div.attrs({'data-widget': 'factors-table-header'})`
	display     : flex;
	align-items : center;
	height      : ${HEADER_HEIGHT}px;
	margin      : 0 calc(var(--margin) / -2);
	> svg {
		min-width : var(--margin);
	}
	> input {
		margin-left   : calc(var(--margin) * -1);
		padding-left  : var(--margin);
		border-radius : 0;
		border        : 0;
		border-bottom : var(--border);
		width         : 100%;
		//&::placeholder {
		//	font-variant : petite-caps;
		//}
	}
`;
export const FactorsTableBodyContainer = styled.div.attrs({'data-widget': 'factors-table-body'})`
	display        : flex;
	flex-direction : column;
	position       : relative;
	margin         : 0 calc(var(--margin) / -2) calc(var(--margin) / 2);
	padding        : 0 calc(var(--margin) / 2);
`;
export const FactorsTableBodyPageableContainer = styled.div.attrs({'data-widget': 'enum-items-table-body-pageable'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : calc(${HEADER_HEIGHT}px * 1.5);
	margin      : 0 calc(var(--margin) / -2);
	> span {
		margin-right : calc(var(--margin) / 2);
		font-variant : petite-caps;
	}
	> div[data-widget=dropdown] {
		width : 150px;
	}
`;

export const FactorsTableFooter = styled.div.attrs({'data-widget': 'factors-table-footer'})`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : ${HEADER_HEIGHT}px;
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 3);
	}
`;

