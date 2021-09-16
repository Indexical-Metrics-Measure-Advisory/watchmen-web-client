import styled from 'styled-components';

export const SubjectNoReport = styled.div.attrs({'data-widget': 'subject-no-report'})`
	display         : flex;
	position        : relative;
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
export const SubjectNoReportCreateButton = styled.span.attrs({'data-widget': 'subject-no-report-create'})`
	text-decoration : underline;
	cursor          : pointer;
`;