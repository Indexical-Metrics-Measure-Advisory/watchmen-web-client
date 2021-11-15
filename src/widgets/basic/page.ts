import styled from 'styled-components';

export const FixWidthPage = styled.div.attrs({'data-widget': 'fix-width-page'})`
	flex-grow      : 1;
	display        : flex;
	position       : relative;
	flex-direction : column;
	max-width      : 80%;
	min-width      : 1000px;
	margin         : var(--margin) auto;
`;

export const SettingsPage = styled(FixWidthPage)`
	max-width : 1000px;
`;

export const FullWidthPage = styled.div.attrs({'data-widget': 'full-width-page'})`
	flex-grow      : 1;
	display        : flex;
	position       : relative;
	flex-direction : column;
`;
