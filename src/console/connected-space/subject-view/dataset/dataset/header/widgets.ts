import styled from 'styled-components';

export const DataSetGridHeaderContainer = styled.div.attrs({ 'data-widget': 'subject-dataset-grid-header' })`
	display       : flex;
	align-items   : center;
	height        : var(--header-height);
	padding       : 0 calc(var(--margin) / 2);
	border-bottom : var(--border);
	transition    : all 300ms ease-in-out;
	> button {
		width       : 24px;
		height      : 24px;
		margin-left : calc(var(--margin) / 8);
	}
`;
export const DataSetGridPagination = styled.div.attrs({ 'data-widget': 'subject-dataset-grid-pagination' })`
	flex-grow       : 1;
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	font-family     : var(--console-title-font-family);
	font-size       : 0.8em;
	margin-right    : var(--margin);
	> div {
		padding      : 0 calc(var(--margin) / 4);
		font-variant : petite-caps;
		> span {
			font-variant : unicase;
		}
	}
	> button {
		font-weight : normal;
		color       : inherit;
		width       : 24px;
		height      : 24px;
	}
	> button[data-visible=false] {
		display : none;
	}
`;
