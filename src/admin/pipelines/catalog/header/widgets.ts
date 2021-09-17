import {PageHeaderHolderContainer} from '@/widgets/basic/page-header';
import {DialogBody} from '@/widgets/dialog/widgets';
import styled from 'styled-components';

export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
`;

export const PickerDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : var(--margin);
`;

export const PickerTableHeader = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 60px 1fr;
	border-bottom         : var(--border);
`;
export const PickerTableHeaderCell = styled.div`
	display      : flex;
	align-items  : center;
	height       : var(--height);
	font-weight  : var(--font-bold);
	font-variant : petite-caps;
	padding      : 0 calc(var(--margin) / 4);
	> input {
		border-top    : 0;
		border-left   : 0;
		border-right  : 0;
		border-radius : 0;
		height        : calc(var(--height) * 0.8);
		width         : 100%;
		padding       : 0;
		margin-bottom : -1px;
		margin-left   : calc(var(--margin) / 2);
	}
`;
export const PickerTableBody = styled.div.attrs({'data-v-scroll': ''})`
	display    : block;
	position   : relative;
	overflow-y : auto;
	max-height : calc(50vh - var(--margin) - var(--line-height));
`;
export const PickerTableBodyRow = styled.div.attrs<{ columns?: number }>(({columns = 3}) => {
	return {
		style: {
			gridTemplateColumns: columns === 3 ? '40px 60px 1fr' : '40px 60px auto 1fr'
		}
	};
})<{ columns?: number }>`
	display  : grid;
	position : relative;
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
	&:hover {
		background-color : var(--hover-color);
	}
`;
export const PickerTableBodyCell = styled.div`
	display     : flex;
	align-items : center;
	height      : var(--height);
	padding     : 0 calc(var(--margin) / 4);
`;
