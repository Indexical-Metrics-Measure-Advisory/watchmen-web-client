import styled from 'styled-components';

export const NoVariable = styled.div.attrs({'data-widget': 'script-no-vars'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	padding-top     : calc(var(--margin) / 2);
	grid-column     : span 3;
	font-family     : var(--title-font-family);
	font-weight     : var(--font-demi-bold);
	font-size       : 1.4em;
`;