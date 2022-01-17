import {PageHeaderHolderContainer} from '@/widgets/basic/page-header';
import {DialogBody} from '@/widgets/dialog/widgets';
import styled from 'styled-components';

export const PICKER_DIALOG_HEIGHT = '70vh';
const DIALOG_MARGIN = 'var(--margin) * 1.5';
const DIALOG_LABEL_HEIGHT = 'var(--line-height)';
const TABLE_HEADER_HEIGHT = 'var(--height) + var(--border-width)';
const TABLE_MARGIN = 'var(--margin) / 2';
const FOOTER_HEIGHT = 'var(--height)';

export const PageHeaderHolder = styled(PageHeaderHolderContainer)`
	grid-template-columns : auto auto 1fr;
`;

export const PickerDialogBody = styled(DialogBody)`
	flex-direction : column;
	margin-bottom  : calc(${TABLE_MARGIN});
`;

export const PickerTableHeader = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 60px 100px 1fr;
	border-bottom         : var(--border);
	height                : calc(${TABLE_HEADER_HEIGHT});
	min-height            : calc(${TABLE_HEADER_HEIGHT});
`;
export const PickerTableHeaderCell = styled.div`
	display      : flex;
	align-items  : center;
	height       : var(--height);
	font-weight  : var(--font-bold);
	font-variant : petite-caps;
	padding      : 0 calc(var(--margin) / 4);
	> div[data-checked=true] {
		color        : var(--primary-color);
		border-color : var(--primary-color);
	}
	> div[data-checked=false] {
		color        : var(--warn-color);
		border-color : var(--warn-color);
	}
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
	max-height : calc(${PICKER_DIALOG_HEIGHT} - ${DIALOG_MARGIN} - ${DIALOG_LABEL_HEIGHT} - (${TABLE_HEADER_HEIGHT}) - ${TABLE_MARGIN} - ${FOOTER_HEIGHT});
`;
export const PickerTableBodyRow = styled.div.attrs<{ columns?: number }>(({columns = 4}) => {
	return {
		style: {
			gridTemplateColumns: columns === 4 ? '40px 60px 120px 1fr' : '40px 60px 120px 1fr auto'
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
	position    : relative;
	align-items : center;
	height      : var(--height);
	padding     : 0 calc(var(--margin) / 4);
	> div[data-checked=true] {
		color        : var(--primary-color);
		border-color : var(--primary-color);
	}
	> div[data-checked=false] {
		color        : var(--warn-color);
		border-color : var(--warn-color);
	}
`;
export const SubItemPrefix = styled.div`
	display  : block;
	position : relative;
	width    : calc(var(--height) / 2);
	height   : var(--height);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 50%;
		left             : 0;
		height           : 1px;
		width            : 40%;
		background-color : var(--waive-color);
	}
`;
export const ImportTypes = styled.div`
	display     : flex;
	position    : relative;
	align-items : center;
	flex-grow   : 1;
`;
export const ImportTypesLabel = styled.div`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	white-space  : nowrap;
`;
export const ImportType = styled.div`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : start;
	cursor          : pointer;
	transition      : color 300ms ease-in-out;
	&:not(:first-child) {
		margin-left : calc(var(--margin) / 4);
	}
	&:hover {
		color : var(--primary-color);
	}
	> span:last-child {
		margin-left : calc(var(--margin) / 4);
		white-space : nowrap;
	}
`;
export const ExportOptionBar = styled.div`
	display     : flex;
	position    : relative;
	flex-grow   : 1;
	align-items : center;
`;
export const ExportOptionLabel = styled.span`
	margin-right : calc(var(--margin) / 2);
`;
