import styled from 'styled-components';

export const FixWidthPage = styled.div.attrs({ 'data-widget': 'fix-width-page' })`
	flex-grow      : 1;
	display        : flex;
	position       : relative;
	flex-direction : column;
	max-width      : 1000px;
	min-width      : 1000px;
	margin         : var(--margin) auto;
`;
