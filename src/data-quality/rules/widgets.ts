import styled from 'styled-components';

export const Body = styled.div.attrs({'data-widget': 'rules-body'})`
	display: flex;
	flex-direction: column;
`;
export const SearchCriteriaContainer = styled.div.attrs({'data-widget': 'rules-search'})`
	display: grid;
	grid-template-columns: auto 1fr auto 1fr auto 1fr auto;
	grid-column-gap: var(--margin);
	grid-row-gap: calc(var(--margin) / 4);
	padding: calc(var(--margin) / 4) var(--margin);
	border-bottom: var(--border);
	align-items: center;
	//> button {
	//	justify-self: end;
	//	grid-column: span 2;
	//}
`;
export const GradePickerContainer = styled.div.attrs({'data-widget': 'rules-search-grade'})`
	display: flex;
	align-items: center;
	> button {
		border-radius: calc(var(--height) / 2);
		&:first-child {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}
		&:last-child {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
		> svg {
			margin-left: calc(var(--margin) / 4);
		}
	}
`;
export const SearchLabel = styled.div.attrs({'data-widget': 'rules-search-label'})`
	font-variant: petite-caps;
	font-size: 1.2em;
`;
