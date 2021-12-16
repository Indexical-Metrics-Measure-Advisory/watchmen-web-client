import styled from 'styled-components';
import {CurveRect} from './types';

export const BodyContainer = styled.div.attrs({
	'data-widget': 'navigation-edit',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display          : flex;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : scroll;
`;

export const BodyPalette = styled.div.attrs({'data-widget': 'navigation-edit-palette'})`
	display               : grid;
	position              : relative;
	flex-wrap             : nowrap;
	grid-template-columns : repeat(100, auto);
`;

export const PaletteColumn = styled.div.attrs({'data-widget': 'navigation-palette-column'})`
	display         : flex;
	position        : relative;
	flex-direction  : column;
	padding         : calc(var(--margin) * 2);
	align-items     : flex-start;
	justify-content : center;
`;

export const NavigationBlock = styled.div.attrs(() => {
	return {};
})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	min-height      : var(--header-height);
	min-width       : 150px;
	padding         : 0 var(--margin);
	border          : var(--border);
	border-width    : calc(var(--border-width) * 2);
	border-radius   : calc(var(--border-radius) * 2);
	border-color    : var(--primary-color);
	color           : var(--primary-color);
	font-size       : 1.2em;
	font-variant    : petite-caps;
	white-space     : nowrap;
	text-overflow   : ellipsis;
	overflow        : hidden;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.1;
	}
`;
export const NavigationBlockPairCurve = styled.svg.attrs<{ rect: CurveRect }>(({rect}) => {
	return {
		'xmlns': 'http://www.w3.org/2000/svg',
		style: {
			top: rect.top,
			left: 0 - rect.width,
			width: rect.width,
			height: rect.height
		}
	};
})<{ rect: CurveRect }>`
	display  : block;
	position : absolute;
	> g > path {
		stroke-width : 2px;
		fill         : transparent;
		opacity      : 0.5;
	}
`;

export const NavigationRootNode = styled(NavigationBlock).attrs({'data-widget': 'navigation-root-node'})`
`;
export const IndicatorCategoryContainer = styled.div.attrs({'data-widget': 'indicator-category-container'})`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	flex-wrap : nowrap;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorCategoryColumn = styled(PaletteColumn).attrs({'data-widget': 'indicator-category-column'})`
	padding-top    : 0;
	padding-bottom : 0;
	&:first-child {
		padding-left : 0;
	}
	&:last-child {
		padding-right : 0;
	}
`;
export const IndicatorCategoryNodeContainer = styled.div.attrs({'data-widget': 'indicator-category-node-container'})`
	display  : block;
	position : relative;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorCategoryNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-category-node'})`
	text-transform : capitalize;
	border-color   : var(--info-color);
	color          : var(--info-color);
	&:before {
		background-color : var(--info-color);
	}
`;
export const IndicatorCategoryCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-category-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--info-color);
	}
`;
export const IndicatorRootNodeContainer = styled.div.attrs({'data-widget': 'indicator-root-node-container'})`
	display  : block;
	position : relative;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorRootNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-root-node'})`
	border-color : var(--success-color);
	color        : var(--success-color);
	&:before {
		background-color : var(--success-color);
	}
`;
export const IndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--success-color);
	}
`;
export const MoreIndicatorsContainer = styled.div.attrs({'data-widget': 'more-indicators-container'})`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	flex-wrap : nowrap;
	&:not(:first-child) {
		margin-top : calc(var(--margin) / 2);
	}
`;
export const MoreIndicatorsColumn = styled(PaletteColumn).attrs({'data-widget': 'more-indicators-column'})`
	padding-top    : 0;
	padding-bottom : 0;
	&:first-child {
		padding-left : 0;
	}
	&:last-child {
		padding-right : 0;
	}
`;
export const MoreIndicatorsNodeContainer = styled.div.attrs({'data-widget': 'more-indicators-node-container'})`
	display  : block;
	position : relative;
`;
export const MoreIndicatorsNode = styled(NavigationBlock).attrs({'data-widget': 'more-indicators-node'})`
	justify-content : center;
	width           : var(--header-height);
	min-width       : var(--header-height);
	height          : var(--header-height);
	padding         : 0;
	border-radius   : 100%;
	color           : var(--info-color);
	border-color    : var(--info-color);
	font-size       : 1.4em;
	cursor          : pointer;
	&:before {
		background-color : var(--info-color);
	}
`;
export const MoreIndicatorsCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'more-indicators-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--info-color);
	}
`;
