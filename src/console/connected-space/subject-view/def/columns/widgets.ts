import styled from 'styled-components';

export const ColumnsContainer = styled.div.attrs<{ active: boolean }>(({ active }) => {
	return {
		'data-widget': 'subject-def-columns',
		style: {
			paddingRight: active ? (void 0) : 0,
			overflowY: active ? (void 0) : 'hidden'
		}
	};
}) <{ active: boolean }>`
	display      : flex;
	position     : relative;
	overflow-y   : auto;
	overflow-x   : hidden;
	border-right : var(--border);
`;
export const ColumnsEditContainer = styled.div.attrs<{ visible: boolean }>(({ visible }) => {
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
export const ColumnEditContainer = styled.div.attrs({ 'data-widget': 'subject-def-column-edit' })`
	display               : grid;
	grid-template-columns : var(--margin) 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;
export const ColumnIndex = styled.span.attrs({ 'data-widget': 'subject-def-column-index' })`
	justify-self : end;
	line-height  : var(--height);
	font-variant : petite-caps;
	font-weight  : var(--font-bold);
`;
