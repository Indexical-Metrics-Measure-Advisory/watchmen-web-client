import styled from 'styled-components';
import { PageHeaderContainer, PageTitle } from '../../basic-widgets/page-header';

export const Header = styled(PageHeaderContainer)`
	border-bottom : var(--border);
	padding       : 0 calc(var(--margin) / 2);
`;
export const HeaderTitle = styled(PageTitle).attrs({ 'data-widgets': 'monitor-logs-header-title' })`
`;

export const Body = styled.div.attrs({ 'data-widget': 'monitor-logs-body' })`
	display        : flex;
	flex-direction : column;
`;
export const SearchCriteriaContainer = styled.div.attrs({ 'data-widget': 'monitor-logs-search' })`
	display               : grid;
	grid-template-columns : auto auto 300px auto 300px 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	padding               : calc(var(--margin) / 4) var(--margin);
	border-bottom: var(--border);
	align-items           : center;
	> button {
		justify-self : start;
		min-width    : 160px;
	}
`;
export const SearchLabel = styled.div.attrs({ 'data-widget': 'monitor-logs-search-label' })`
	font-variant : petite-caps;
	&:first-child {
		font-weight : var(--font-bold);
		font-size   : 1.2em;
	}
	&:nth-child(6) {
		grid-column : 2;
	}
`;