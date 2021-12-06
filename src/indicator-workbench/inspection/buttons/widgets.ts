import styled from 'styled-components';

export const ButtonsContainer = styled.div.attrs({'date-widget': 'inspection-buttons'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
`;
