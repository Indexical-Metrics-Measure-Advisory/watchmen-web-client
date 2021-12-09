import styled from 'styled-components';

export const PickIndicatorContainer = styled.div.attrs({'data-widget': 'inspection-pick-indicator'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto auto auto auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	> div[data-widget=inspection-dropdown] {
		min-width : 250px;
	}
`;
