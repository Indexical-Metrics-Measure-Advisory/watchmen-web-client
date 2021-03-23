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
	grid-template-columns : 40px 280px 280px 200px 200px 200px;
	grid-auto-rows        : var(--height);
	border-bottom         : var(--border);
	border-bottom-width   : 2px;
	overflow-x            : hidden;
	> div {
		display      : flex;
		align-items  : center;
		font-variant : petite-caps;
		font-weight  : var(--font-demi-bold);
		height       : var(--height);
		padding      : 0 calc(var(--margin) / 2);
		border-right : var(--border);
		&:first-child {
			display         : flex;
			justify-content : flex-end;
			grid-column     : 1 / span 7;
			border-bottom   : var(--border);
			> div > span:not(:nth-child(4)) {
				margin-right : 4px;
			}
			> div > span:nth-child(2) {
				display : inline-block;
				> div[data-widget=dropdown] {
					height : calc(var(--height) * 0.6);
				}
			}
		}
		&:nth-child(2) {
			padding : 0 calc(var(--margin) / 4);
		}
	}
`;
export const SearchResultBody = styled.div.attrs({
	'data-widget': 'monitor-logs-result-body',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100vh - 57px - 81px - var(--height) * 2);
	overflow-y     : auto;
	overflow-x     : hidden;
`;
export const SearchResultBodyRow = styled.div.attrs({ 'data-widget': 'monitor-logs-result-body-row' })`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 280px 280px 200px 200px 200px;
	height                : var(--height);
	border-bottom         : var(--border);
	cursor                : pointer;
	&:hover {
		background-color : var(--hover-color);
		&:before,
		&:after {
			content          : '';
			display          : block;
			position         : absolute;
			width            : 100%;
			height           : 1px;
			background-color : var(--invert-color);
			top              : 0;
			left             : 0;
		}
		&:after {
			top    : unset;
			bottom : 0;
		}
		> div {
			border-right-color : var(--invert-color);
		}
	}
	> div {
		display      : flex;
		align-items  : center;
		padding      : 0 calc(var(--margin) / 2);
		border-right : var(--border);
		&:first-child {
			padding : 0 calc(var(--margin) / 4);
		}
		&:nth-child(5) {
			text-transform : uppercase;
		}
		> span {
			overflow-x    : hidden;
			white-space   : nowrap;
			text-overflow : ellipsis;
		}
	}
`;