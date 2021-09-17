import {Input} from '@/widgets/basic/input';
import styled from 'styled-components';

export const ColumnsContainer = styled.div.attrs<{ active: boolean }>(({active}) => {
	return {
		'data-widget': 'subject-def-columns',
		'data-v-scroll': '',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display        : flex;
	position       : relative;
	flex-direction : column;
	overflow-y     : auto;
	overflow-x     : hidden;
	border-right   : var(--border);
`;
export const ColumnsEditContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'subject-def-columns-edit',
		style: {
			display: visible ? (void 0) : 'none'
		}
	};
})<{ visible: boolean }>`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin) 0 0;
`;
export const ColumnsBottomGap = styled.div.attrs({'data-widget': 'subject-def-columns-bottom-gap'})`
	width      : 100%;
	height     : var(--margin);
	min-height : var(--margin);
`;
export const ColumnEditContainer = styled.div.attrs({'data-widget': 'subject-def-column-edit'})`
	display               : grid;
	grid-template-columns : var(--margin) 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding-bottom        : calc(var(--margin) / 4);
`;
export const ColumnIndex = styled.span.attrs({'data-widget': 'subject-def-column-index'})`
	justify-self : end;
	line-height  : var(--param-height);
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
`;
export const ColumnEditWrapper = styled.div.attrs<{ shorten: boolean }>(({shorten}) => {
	return {
		'data-widget': 'subject-def-column-edit-wrapper',
		style: {
			gridTemplateColumns: shorten ? 'auto auto auto 1fr' : (void 0)
		}
	};
})<{ shorten: boolean }>`
	display               : grid;
	grid-template-columns : auto 1fr auto auto;
	grid-row-gap          : calc(var(--margin) / 4);
	position              : relative;
	align-self            : stretch;
	justify-self          : stretch;
	> div[data-widget="parameter-from-edit"] {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
`;
export const AliasEdit = styled.div.attrs({'data-widget': 'subject-def-column-alias-edit'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	align-self   : stretch;
	justify-self : stretch;
	height       : var(--param-height);
	margin-left  : calc(var(--margin) / 2);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		left             : calc(var(--margin) / -2);
		top              : 50%;
		height           : 1px;
		width            : calc(var(--margin) / 2);
		background-color : var(--param-bg-color);
	}
`;
export const AliasLabel = styled.div.attrs({'data-widget': 'subject-def-column-alias-edit-label'})`
	display          : flex;
	align-items      : center;
	align-self       : stretch;
	justify-self     : stretch;
	background-color : var(--param-bg-color);
	font-variant     : petite-caps;
	font-weight      : var(--font-bold);
	padding          : 0 calc(var(--margin) / 4);
	border-radius    : calc(var(--param-height) / 2) 0 0 calc(var(--param-height) / 2);
	box-shadow       : var(--param-top-border), var(--param-bottom-border);
	cursor           : pointer;
`;
export const AliasEditInput = styled(Input).attrs({'data-widget': 'subject-def-column-alias-edit-input'})`
	width         : 200px;
	height        : var(--param-height);
	border        : 0;
	border-radius : 0 calc(var(--param-height) / 2) calc(var(--param-height) / 2) 0;
	box-shadow    : var(--param-border);
	&:hover {
		z-index          : 1;
		background-color : var(--bg-color);
		box-shadow       : var(--primary-hover-shadow);
	}
`;