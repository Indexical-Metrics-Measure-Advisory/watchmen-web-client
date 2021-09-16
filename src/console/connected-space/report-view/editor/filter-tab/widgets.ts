import styled from 'styled-components';

export const ReportFilterContainer = styled.div.attrs({
	'data-widget': 'report-filter',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100% - var(--height) * 1.5 - 1px);
	overflow       : auto;
`;
export const ReportNoFilter = styled.div.attrs({'data-widget': 'report-no-filter'})`
	display         : flex;
	position        : absolute;
	align-items     : center;
	justify-content : center;
	top             : 0;
	left            : 0;
	width           : 100%;
	height          : 100%;
	font-family     : var(--title-font-family);
	font-size       : 2em;
	opacity         : 0.7;
`;
export const ReportNoFilterCreateButton = styled.span.attrs({'data-widget': 'report-no-filter-create'})`
	text-decoration : underline;
	cursor          : pointer;
`;