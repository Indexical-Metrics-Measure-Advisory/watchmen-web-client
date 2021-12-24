import styled from 'styled-components';

export const SearchResultContainer = styled.div.attrs({'data-widget': 'catalog-result'})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
`;
export const SearchResultTargetLabel = styled.div.attrs({'data-widget': 'catalog-result-target'})`
	display       : flex;
	align-items   : center;
	font-size     : 1.4em;
	font-weight   : var(--font-bold);
	font-variant  : petite-caps;
	height        : 40px;
	padding       : 0 var(--margin);
	border-bottom : var(--border);
	> span:first-child {
		flex-grow : 1;
	}
	> div[data-widget=dropdown] {
		width        : unset;
		min-width    : 200px;
		max-width    : 300px;
		font-size    : var(--font-size);
		font-variant : none;
		font-weight  : normal;
	}
	> button {
		margin-left : calc(var(--margin) / 4);
	}
`;
export const SearchResultHeader = styled.div.attrs({'data-widget': 'catalog-result-header'})`
	display               : grid;
	grid-template-columns : 40px 350px 120px 200px 200px;
	grid-auto-rows        : var(--height);
	border-bottom         : var(--border);
	border-bottom-width   : 2px;
	overflow-x            : hidden;
`;
export const SearchResultHeaderCell = styled.div.attrs({'data-widget': 'catalog-result-header-cell'})`
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
	'data-widget': 'catalog-result-body',
	'data-v-scroll': ''
})`
	display        : flex;
	flex-direction : column;
	flex-grow      : 1;
	height         : calc(100vh - var(--page-header-height) - 45px - 40px - var(--height) - 2px);
	overflow-y     : auto;
	overflow-x     : hidden;
`;
export const NoData = styled.div`
	display       : flex;
	position      : absolute;
	grid-column   : 1 / span 5;
	align-items   : center;
	height        : var(--height);
	width         : 100%;
	padding       : 0 calc(var(--margin) / 2);
	border-bottom : var(--border);
`;
export const CatalogRowContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 350px 120px 200px 200px;
	min-height            : calc(var(--height) + 1px);
	border-bottom         : var(--border);
	&[data-changed=true] {
		&:before {
			content          : '';
			display          : block;
			position         : absolute;
			top              : 0;
			left             : 0;
			width            : 100%;
			height           : 100%;
			background-color : var(--danger-color);
			opacity          : 0.1;
			z-index          : -2;
		}
	}
	:hover {
		background-color : var(--hover-color);
	}
`;
export const CatalogCell = styled.div`
	display       : flex;
	align-items   : center;
	height        : var(--height);
	padding       : 0 calc(var(--margin) / 2);
	border-right  : var(--border);
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	> div[data-widget=checkbox] {
		border : 0;
	}
	> div[data-widget=dropdown] {
		border  : 0;
		margin  : calc(var(--margin) / -2);
		padding : 0 calc(var(--margin) / 2);
		width   : calc(100% + var(--margin));
		span[data-widget="dropdown-option"] {
			padding : 0 calc(var(--margin) / 2);
		}
	}
`;
export const CatalogSeqCell = styled(CatalogCell)`
	padding : 0 calc(var(--margin) / 4);
`;
