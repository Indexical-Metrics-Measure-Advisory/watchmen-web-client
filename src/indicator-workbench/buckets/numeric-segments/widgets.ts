import {RoundDwarfButton} from '@/widgets/basic/button';
import {GRID_ROW_HEIGHT, HEADER_HEIGHT} from '@/widgets/basic/constants';
import {TuplePropertyInput} from '@/widgets/tuple-workbench/tuple-editor';
import styled from 'styled-components';

export const SegmentsTableButton = styled(RoundDwarfButton).attrs({'data-widget': 'segments-table-button'})`
	align-self   : center;
	justify-self : flex-start;
`;

export const SegmentsTableContainer = styled.div.attrs({'data-widget': 'segments-table'})`
	grid-column    : span 2;
	display        : flex;
	flex-direction : column;
	font-size      : 0.8em;
	margin-bottom  : var(--margin);
`;

export const SegmentTableHeader = styled.div`
	display               : grid;
	grid-template-columns : 48px 1fr 1fr 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
	border-bottom         : var(--border);
	border-width          : calc(var(--border-width) * 2);
`;

export const SegmentTableHeaderLabel = styled.span`
	font-variant : petite-caps;
	font-size    : 1.1em;
	font-weight  : var(--font-demi-bold);
`;

export const SegmentsTableBodyContainer = styled.div.attrs({'data-widget': 'segments-table-body'})`
	display        : flex;
	flex-direction : column;
	position       : relative;
	margin-bottom  : calc(var(--margin) / 2);
`;

export const SegmentRowContainer = styled.div`
	display               : grid;
	grid-template-columns : 48px 1fr 1fr 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
	padding               : calc(var(--margin) / 8) calc(var(--margin) / 2);
	border-radius         : var(--border-radius);
	&:nth-child(2n + 1) {
		background-color : var(--grid-rib-bg-color);
	}
	&:hover {
		> button:last-child {
			opacity        : 1;
			pointer-events : auto;
		}
	}
`;

export const SegmentPropLabel = styled.span`
	> span:first-child {
		color       : var(--warn-color);
		font-weight : var(--font-bold);
	}
`;

export const SegmentPropInput = styled(TuplePropertyInput)`
	width : 100%;
`;

export const SegmentValueCellContainer = styled.div.attrs({'data-widget': 'segment-value-cell'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : ${GRID_ROW_HEIGHT}px;
	transition  : all 300ms ease-in-out;
`;
export const SegmentButton = styled(RoundDwarfButton).attrs({'data-widget': 'segment-button'})`
	align-self     : center;
	justify-self   : end;
	opacity        : 0;
	pointer-events : none;
`;

export const SegmentsTableFooter = styled.div.attrs({'data-widget': 'segments-table-footer'})`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : ${HEADER_HEIGHT}px;
	> button:not(:first-child) {
		margin-left : calc(var(--margin) / 3);
	}
`;
