import styled from 'styled-components';

export const SearchCriteriaContainer = styled.div.attrs({'data-widget': 'catalog-search'})`
	display               : grid;
	grid-template-columns : auto 1fr auto 1fr auto 1fr 1fr;
	grid-column-gap       : var(--margin);
	grid-row-gap          : calc(var(--margin) / 4);
	padding               : calc(var(--margin) / 4) var(--margin);
	border-bottom         : var(--border);
	align-items           : center;
	> input {
		grid-column: span 3;
	}
	> input + div {
		grid-column: 1;
	}
	> button:last-child {
		justify-self : start;
	}
`;
export const SearchLabel = styled.div.attrs({'data-widget': 'catalog-search-label'})`
	font-variant : petite-caps;
`;
