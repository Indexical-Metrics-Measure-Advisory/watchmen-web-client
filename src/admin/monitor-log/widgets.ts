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
	border-bottom         : var(--border);
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
export const SearchResultContainer = styled.div.attrs({ 'data-widget': 'monitor-logs-result' })`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
`;
export const SearchResultHeader = styled.div.attrs({ 'data-widget': 'monitor-logs-result-header' })`
	display               : grid;
	grid-template-columns : 40px 280px 200px 200px 200px 200px;
	height                : var(--height);
	border-bottom         : var(--border);
	border-bottom-width   : 2px;
	> div {
		display      : flex;
		align-items  : center;
		font-variant : petite-caps;
		font-weight  : var(--font-demi-bold);
		padding      : 0 calc(var(--margin) / 2);
		border-right : var(--border);
	}
`;
export const SearchResultBody = styled.div.attrs({
	'data-widget': 'monitor-logs-result-body',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100vh - 57px - 81px - var(--height));
	overflow       : auto;
`;
export const SearchResultBodyRow = styled.div.attrs({ 'data-widget': 'monitor-logs-result-body-row' })`
	display               : grid;
	grid-template-columns : 40px 280px 200px 200px 200px 200px;
	height                : var(--height);
	border-bottom         : var(--border);
	> div {
		display      : flex;
		align-items  : center;
		padding      : 0 calc(var(--margin) / 2);
		border-right : var(--border);
		> span {
			overflow-x    : hidden;
			white-space   : nowrap;
			text-overflow : ellipsis;
		}
	}
`;