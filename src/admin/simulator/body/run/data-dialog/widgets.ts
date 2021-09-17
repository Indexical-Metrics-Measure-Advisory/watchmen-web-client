import {ButtonInk} from '@/widgets/basic/types';
import styled from 'styled-components';

export const DialogHeader = styled.div`
	display     : flex;
	position    : relative;
	padding     : 0 var(--margin);
	min-height  : calc(var(--header-height) * 1.5);
	margin      : calc(var(--margin) * -1) calc(var(--margin) * -1) 0;
	align-items : center;
`;
export const DialogTitle = styled.div`
	font-family : var(--title-font-family);
	font-size   : 2.5em;
`;
export const DialogBodyContent = styled.div.attrs({
	'data-widget': 'dialog-body-content',
	'data-v-scroll': ''
})`
	display       : block;
	position      : relative;
	height        : calc(100% - var(--margin) / 2);
	margin-right  : calc(var(--margin) / -4);
	padding-right : calc(var(--margin) / 4);
	overflow-y    : auto;
	overflow-x    : hidden;
`;

export const SectionTitle = styled.div.attrs<{ ink?: ButtonInk }>(({ink}) => {
	let color = '';
	switch (ink) {
		case ButtonInk.PRIMARY:
			color = 'var(--primary-color)';
			break;
		case ButtonInk.DANGER:
			color = 'var(--danger-color)';
			break;
		case ButtonInk.INFO:
			color = 'var(--info-color)';
			break;
		case ButtonInk.WARN:
			color = 'var(--warn-color)';
			break;
		case ButtonInk.SUCCESS:
			color = 'var(--success-color)';
			break;
	}
	return {
		'data-widget': 'data-table-section-title',
		style: {
			backgroundColor: color
		}
	};
})<{ ink?: ButtonInk }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	height           : 2.2em;
	font-size        : 1.5em;
	font-family      : var(--title-font-family);
	background-color : var(--primary-color);
	color            : var(--invert-color);
	padding-left     : 16px;
	border-radius    : calc(var(--border-radius) * 2) calc(var(--border-radius) * 2) 0 0;
`;
export const DataTable = styled.div.attrs({
	'data-widget': 'data-table',
	'data-h-scroll': ''
})`
	display               : grid;
	grid-template-columns : 1fr;
	margin-bottom         : calc(var(--margin) / 2);
	border-bottom         : var(--border);
	border-bottom-color   : var(--primary-color);
	overflow-x            : auto;
	overflow-y            : hidden;
	&:last-child {
		margin-bottom : 0;
	}
`;

export const DataTableHeader = styled.div.attrs<{ firstWidth?: number, columnCount: number }>(
	({firstWidth = 40, columnCount}) => {
		return {
			'data-widget': 'data-table-header',
			style: {
				gridTemplateColumns: `${firstWidth}px ${new Array(columnCount).fill('140px').join(' ')}`,
				minWidth: `${firstWidth + columnCount * 140}px`
			}
		};
	})<{ firstWidth?: number, columnCount: number }>`
	display       : grid;
	position      : sticky;
	top           : 0;
	border-bottom : var(--border);
	z-index       : 1;
`;
export const DataTableHeaderCell = styled.div.attrs({'data-widget': 'data-table-header-cell'})`
	display          : flex;
	align-items      : center;
	padding          : 0 calc(var(--margin) / 8);
	margin-bottom    : -1px;
	height           : var(--tall-height);
	font-weight      : var(--font-bold);
	font-size        : 1.2em;
	border-bottom    : var(--border);
	background-color : var(--bg-color);
	overflow         : hidden;
	white-space      : nowrap;
	text-overflow    : ellipsis;
`;
export const DataTableBodyRow = styled.div.attrs<{ firstWidth?: number, columnCount: number }>(
	({firstWidth = 40, columnCount}) => {
		return {
			'data-widget': 'data-table-body-row',
			style: {
				gridTemplateColumns: `${firstWidth}px ${new Array(columnCount).fill('140px').join(' ')}`,
				minWidth: `${firstWidth + columnCount * 140}px`
			}
		};
	})<{ firstWidth?: number, columnCount: number }>`
	display : grid;
	z-index : 0;
	&:nth-child(2n) {
		background-color : var(--grid-rib-bg-color);
	}
`;

export const DataTableBodyCell = styled.div.attrs({'data-widget': 'data-table-body-cell'})`
	display       : flex;
	align-items   : center;
	padding       : 0 calc(var(--margin) / 8);
	height        : var(--height);
	overflow      : hidden;
	white-space   : nowrap;
	text-overflow : ellipsis;
	&:hover > input {
		box-shadow : var(--primary-shadow);
	}
	> input {
		height       : 22px;
		border-color : transparent;
		margin-left  : calc(var(--input-indent) * -1);
		margin-right : calc(var(--margin) / 8);
		&:focus {
			box-shadow : var(--primary-hover-shadow);
		}
	}
`;
export const TriggerDataFirstHeaderCell = styled(DataTableBodyCell)`
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
	color        : var(--primary-color);
`;
export const TriggerDataNoOldCell = styled(DataTableBodyCell).attrs<{ columnCount: number }>(({columnCount}) => {
	return {style: {gridColumn: `span ${columnCount}`}};
})<{ columnCount: number }>`
	font-variant : petite-caps;
`;

export const AllDataNoDataCell = styled(DataTableBodyCell).attrs<{ columnCount: number }>(({columnCount}) => {
	return {style: {gridColumn: `span ${columnCount + 1}`}};
})<{ columnCount: number }>`
	font-variant : petite-caps;
`;
export const ChangedDataFirstHeaderCell = styled(DataTableBodyCell)`
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
	color        : var(--primary-color);
`;
export const ChangedDataNoDataCell = styled(DataTableBodyCell).attrs<{ columnCount: number }>(({columnCount}) => {
	return {style: {gridColumn: `span ${columnCount + 1}`}};
})<{ columnCount: number }>`
	font-variant : petite-caps;
`;

