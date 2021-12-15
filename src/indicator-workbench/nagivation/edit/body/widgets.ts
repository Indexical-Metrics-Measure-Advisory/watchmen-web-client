import styled from 'styled-components';

export const BodyContainer = styled.div.attrs({'data-widget': 'navigation-edit'})`
	display          : flex;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : hidden;
`;

export const BodyPalette = styled.div.attrs({
	'data-widget': 'navigation-edit-palette',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	flex-wrap : nowrap;
	overflow  : scroll;
`;

export const PaletteColumn = styled.div.attrs({'data-widget': 'navigation-palette-column'})`
	display         : flex;
	position        : relative;
	flex-direction  : column;
	padding         : var(--margin);
	align-items     : center;
	justify-content : center;
`;

export const NavigationBlock = styled.div.attrs(() => {
	return {};
})`
	display       : flex;
	position      : relative;
	align-items   : center;
	min-height    : var(--header-height);
	padding       : 0 var(--margin);
	border        : var(--border);
	border-width  : calc(var(--border-width) * 2);
	border-radius : calc(var(--border-radius) * 2);
	border-color  : var(--primary-color);
	font-size     : 1.2em;
	font-variant  : petite-caps;
	transition    : top 300ms ease-in-out, left 300ms ease-in-out, width 300ms ease-in-out, height 300ms ease-in-out;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 0;
		height           : 0;
		background-color : var(--primary-color);
		opacity          : 0.3;
	}
`;

export const NavigationRootNode = styled(NavigationBlock).attrs({'data-widget': 'navigation-root-node'})`
`;
export const IndicatorCategoryNode = styled(NavigationBlock).attrs({'data-widget': 'category-node'})`
	border-color : var(--info-color);
	&:before {
		background-color : var(--info-color);
	}
`;
export const IndicatorRootNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-root-node'})`
	border-color : var(--success-color);
	&:before {
		background-color : var(--success-color);
	}
`;
export const MoreIndicatorsNode = styled(NavigationBlock).attrs({'data-widget': 'more-indicators'})`
	justify-content : center;
	width           : var(--header-height);
	height          : var(--header-height);
	padding         : 0;
	border-radius   : 100%;
	color           : var(--primary-color);
	font-size       : 1.4em;
	cursor          : pointer;
`;