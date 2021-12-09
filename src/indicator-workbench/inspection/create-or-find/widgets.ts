import styled from 'styled-components';

export const CreateOrFindContainer = styled.div.attrs({'data-widget': 'inspection-create-or-find'})`
	display               : grid;
	position              : relative;
	grid-template-columns : 200px auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	> div[data-widget=inspection-dropdown] {
		min-width : 250px;
	}
`;
