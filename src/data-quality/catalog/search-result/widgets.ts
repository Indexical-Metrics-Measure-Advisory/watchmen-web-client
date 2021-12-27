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
	grid-template-columns : 40px 350px 120px 200px 200px 1fr;
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
	&:last-child {
		border-right : 0;
	}
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
	height         : calc(100vh - var(--page-header-height) - 81px - 40px - var(--height) - 2px);
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
	> svg {
		margin-right : calc(var(--margin) / 4);
	}
`;
export const CatalogRowContainer = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : 40px 350px 120px 200px 200px 1fr;
	min-height            : calc(var(--height) + 1px);
	border-bottom         : var(--border);
	cursor                : pointer;
	&[data-expanded=true]:hover {
		min-height       : unset;
		background-color : unset;
		cursor           : default;
	}
	&:hover {
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
	> input {
		border  : 0;
		margin  : calc(var(--margin) / -2);
		padding : 0 calc(var(--margin) / 2);
		width   : calc(100% + var(--margin));
	}
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
export const CatalogEditCell = styled.div`
	display               : grid;
	position              : relative;
	grid-column           : 1 / span 6;
	align-items           : center;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	height                : 0;
	overflow              : hidden;
	&[data-expanded=true] {
		border-top : var(--border);
		height     : auto;
		padding    : calc(var(--margin) / 4) var(--margin) calc(var(--margin) / 4) calc(var(--margin) / 4 + 40px);
	}
	> div[data-widget=tuple-property-item-picker] {
		grid-template-rows : var(--height) 1fr;
		> div[data-widget=tuple-property-item-picker-picked-items] {
			margin-top     : 0;
			padding-bottom : 0;
		}
	}
`;
export const CatalogEditLabel = styled.div`
	display      : flex;
	position     : relative;
	align-items  : center;
	align-self   : start;
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	height       : var(--height);
`;
export const CatalogEditButtons = styled.div`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto auto auto 1fr;
	align-items           : center;
	height                : var(--height);
	> button:first-child,
	> button:nth-child(3) {
		margin-right : calc(var(--margin) / 4);
		&:hover {
			z-index : 1;
		}
	}
	> button:nth-child(2):not(:last-child) {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
	}
	> button:nth-child(3) {
		border-top-left-radius    : 0;
		border-bottom-left-radius : 0;
		&:after {
			content          : '';
			display          : block;
			position         : absolute;
			left             : 0;
			top              : 30%;
			width            : 1px;
			height           : 40%;
			background-color : var(--invert-color);
			opacity          : 0.7;
		}
	}
`;
