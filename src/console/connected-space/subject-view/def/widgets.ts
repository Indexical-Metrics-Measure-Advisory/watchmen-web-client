import styled from 'styled-components';

export const SubjectDefContainer = styled.div.attrs({ 'data-widget': 'connected-space-subject-def' })`
	display   : grid;
	grid-template-columns: 1fr 40px 40px 40px 40px;
	position  : relative;
	flex-grow : 1;
	overflow  : hidden;
`;
