import styled from 'styled-components';

export const NoVariable = styled.div.attrs({'data-widget': 'script-no-vars'})`
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
	> span {
		margin-top : -10%;
	}
`;