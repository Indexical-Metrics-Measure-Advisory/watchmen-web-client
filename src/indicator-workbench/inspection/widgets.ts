import styled from 'styled-components';

export const InspectionContainer = styled.div.attrs({'data-widget': 'inspection'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
	margin-top     : var(--margin);
	padding-bottom : var(--margin);
`;
