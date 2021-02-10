import styled from 'styled-components';
import { Button } from '../../../../../../basic-widgets/button';
import { TooltipButton } from '../../../../../../basic-widgets/tooltip-button';

export const DataSetHeaderContainer = styled.div.attrs({ 'data-widget': 'subject-dataset-header' })`
	display       : flex;
	align-items   : center;
	height        : var(--header-height);
	padding       : 0 calc(var(--margin) / 2);
	border-bottom : var(--border);
	transition    : all 300ms ease-in-out;
`;
export const DataSetHeaderButton = styled(Button)`
	height       : var(--button-height-in-form);
	margin-right : calc(var(--margin) / 4);
`;
export const DataSetHeaderPagination = styled.div.attrs({ 'data-widget': 'subject-dataset-pagination' })`
	flex-grow       : 1;
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	font-family     : var(--title-font-family);
	font-size       : 0.8em;
`;
export const DataSetHeaderPaginationLabel = styled.div.attrs({ 'data-widget': 'subject-dataset-pagination-label' })`
	padding      : 0 calc(var(--margin) / 4);
	font-variant : petite-caps;
`;
export const DataSetHeaderPaginationLabelBlank = styled.span.attrs({ 'data-widget': 'subject-dataset-pagination-label-blank' })`
	display      : inline-block;
	font-variant : unicase;
	min-width    : 0.5em;
`;
export const DataSetHeaderPaginationButton = styled(TooltipButton)`
	width       : 24px;
	height      : 24px;
	margin-left : calc(var(--margin) / 8);
`;
