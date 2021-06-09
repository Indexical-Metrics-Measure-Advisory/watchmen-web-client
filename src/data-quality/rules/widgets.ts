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
export const SearchResultContainer = styled.div.attrs({'data-widget': 'rules-result'})`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
`;
export const SearchResultTargetLabel = styled.div.attrs({'data-widget': 'rules-result-target'})`
	display: flex;
	align-items: center;
	font-size: 1.4em;
	font-weight: var(--font-bold);
	font-variant: petite-caps;
	height: calc(var(--height) * 1.4);
	padding: 0 var(--margin);
	border-bottom: var(--border);
`;
export const SearchResultHeader = styled.div.attrs<{ onTopic: boolean }>(({onTopic}) => {
	return {
		'data-widget': 'rules-result-header',
		style: {
			gridTemplateColumns: onTopic ? '40px 280px 280px 120px 400px' : (void 0)
		}
	};
})<{ onTopic: boolean }>`
	display: grid;
	grid-template-columns: 40px 280px 120px 400px;
	grid-auto-rows: var(--height);
	border-bottom: var(--border);
	border-bottom-width: 2px;
	overflow-x: hidden;
`;
export const SearchResultHeaderCell = styled.div.attrs({'data-widget': 'rules-result-header-cell'})`
	display: flex;
	align-items: center;
	font-variant: petite-caps;
	font-weight: var(--font-demi-bold);
	height: var(--height);
	padding: 0 calc(var(--margin) / 2);
	border-right: var(--border);
`;
export const SearchResultHeaderSeqCell = styled(SearchResultHeaderCell)`
	padding: 0 calc(var(--margin) / 4);
`;
export const SearchResultBody = styled.div.attrs({
	'data-widget': 'rules-result-body',
	'data-v-scroll': ''
})`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	height: calc(100vh - 57px - 45px - var(--height) - 2px);
	overflow-y: auto;
	overflow-x: hidden;
`;
