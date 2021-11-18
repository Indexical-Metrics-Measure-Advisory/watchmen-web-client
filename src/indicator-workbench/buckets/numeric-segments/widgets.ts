import {GRID_ROW_HEIGHT} from '@/widgets/basic/constants';
import styled from 'styled-components';

export const SegmentValueCellContainer = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : ${GRID_ROW_HEIGHT}px;
`;
export const NotAvailableCell = styled.span`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
`;
