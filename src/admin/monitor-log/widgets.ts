import {DwarfButton} from '@/widgets/basic/button';
import {Dropdown} from '@/widgets/basic/dropdown';
import styled from 'styled-components';

export const Body = styled.div.attrs({'data-widget': 'monitor-logs-body'})`
	display        : flex;
	flex-direction : column;
`;
export const SearchCriteriaContainer = styled.div.attrs({'data-widget': 'monitor-logs-search'})`
	display               : grid;
	grid-template-columns : auto auto 1fr auto 1fr auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	padding               : calc(var(--margin) / 4) var(--margin);
	border-bottom         : var(--border);
	align-items           : center;
	> button {
		min-width    : 200px;
		justify-self : flex-start;
		grid-column  : 3 / span 6;
	}
`;
export const SearchLabel = styled.div.attrs({'data-widget': 'monitor-logs-search-label'})`
	font-variant : petite-caps;
	&:first-child {
		font-weight : var(--font-bold);
		font-size   : 1.2em;
	}
	&:nth-child(8) {
		grid-column : 2;
	}
`;
export const SearchResultContainer = styled.div.attrs({'data-widget': 'monitor-logs-result'})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
`;
export const SearchResultHeader = styled.div.attrs({'data-widget': 'monitor-logs-result-header'})`
	display               : grid;
	grid-template-columns : 40px 280px 280px 280px 200px 200px 200px;
	grid-auto-rows        : var(--height);
	border-bottom         : var(--border);
	border-bottom-width   : 2px;
	overflow-x            : hidden;
`;
export const SearchResultHeaderOperators = styled.div.attrs({'data-widget': 'monitor-logs-result-header-operators'})`
	display         : flex;
	position        : relative;
	grid-column     : 1 / span 8;
	justify-content : flex-end;
	height          : var(--height);
	padding         : 0 calc(var(--margin) / 2);
	border-bottom   : var(--border);
`;
export const SearchResultHeaderPagination = styled.div.attrs({'data-widget': 'monitor-logs-result-header-pagination'})`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
`;
export const SearchResultHeaderPaginationLabel = styled.span.attrs({'data-widget': 'monitor-logs-result-header-pagination-label'})`
	margin-right : 4px;
	white-space  : nowrap;
`;
export const SearchResultHeaderPaginationDropdown = styled(Dropdown)`
	margin-right : 4px;
	height       : calc(var(--height) * 0.6);
`;
export const SearchResultHeaderButton = styled(DwarfButton)`
	align-self  : center;
	margin-left : calc(var(--margin) / 4);
`;
export const SearchResultHeaderCell = styled.div.attrs({'data-widget': 'monitor-logs-result-header-cell'})`
	display      : flex;
	align-items  : center;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	height       : var(--height);
	padding      : 0 calc(var(--margin) / 2);
	border-right : var(--border);
`;
export const SearchResultHeaderSeqCell = styled(SearchResultHeaderCell)`
	padding : 0 calc(var(--margin) / 4);
`;
export const SearchResultBody = styled.div.attrs({
	'data-widget': 'monitor-logs-result-body',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100vh - var(--page-header-height) - var(--height) * 3 - var(--margin) - var(--height) * 2);
	padding-bottom : 4px;
	overflow-y     : auto;
	overflow-x     : hidden;
`;
