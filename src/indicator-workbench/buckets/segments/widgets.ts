import {Button, RoundDwarfButton} from '@/widgets/basic/button';
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
	// editor in grid layout, 30% 70%, column gap is 32px, table is second column in editor.
	margin-left    : calc((100% + var(--margin)) / 0.7 * 0.3 * -1 - var(--margin));
`;

export const SegmentTableHeader = styled.div.attrs<{ cells: string }>(({cells}) => {
	return {
		style: {
			gridTemplateColumns: `48px 1fr ${cells} 40px`
		}
	};
})<{ cells: string }>`
	display         : grid;
	grid-column-gap : calc(var(--margin) / 2);
	align-items     : center;
	padding         : calc(var(--margin) / 4) calc(var(--margin) / 2);
	border-bottom   : var(--border);
	border-width    : calc(var(--border-width) * 2);
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

export const SegmentRowContainer = styled.div.attrs<{ cells: string }>(({cells}) => {
	return {
		style: {
			gridTemplateColumns: `48px 1fr ${cells} 40px`
		}
	};
})<{ cells: string }>`
	display         : grid;
	grid-column-gap : calc(var(--margin) / 2);
	align-items     : center;
	padding         : calc(var(--margin) / 8) calc(var(--margin) / 2);
	border-radius   : var(--border-radius);
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

export const SegmentIndexLabel = styled.span`
	display     : flex;
	position    : relative;
	align-self  : start;
	align-items : center;
	color       : var(--warn-color);
	font-weight : var(--font-bold);
	height      : ${GRID_ROW_HEIGHT}px;
`;

export const SegmentPropInput = styled(TuplePropertyInput)`
	width : 100%;
`;
export const SegmentNameCellContainer = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	align-self  : start;
	height      : ${GRID_ROW_HEIGHT}px;
`;

export const SegmentButton = styled(Button).attrs({'data-widget': 'segment-button'})`
	align-self     : start;
	justify-self   : end;
	padding        : 0;
	margin-top     : calc((${GRID_ROW_HEIGHT}px - var(--height)) / 2 + 1px);
	width          : calc(var(--height) - 2px);
	height         : calc(var(--height) - 2px);
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
