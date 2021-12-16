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
	border-color : var(--navigation-root-color);
	color        : var(--navigation-root-color);
	&:before {
		background-color : var(--navigation-root-color);
	}
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
	padding : 0 var(--margin);
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
	border-color   : var(--navigation-category-color);
	color          : var(--navigation-category-color);
	&:before {
		background-color : var(--navigation-category-color);
	}
`;
export const IndicatorCategoryCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-category-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-category-color);
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
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	&:before {
		background-color : var(--navigation-indicator-color);
	}
`;
export const IndicatorCandidateRootNode = styled(IndicatorRootNode)`
	border-color : var(--navigation-candidate-color);
	color        : var(--navigation-candidate-color);
	transition   : padding-right 300ms ease-in-out;
	&:before {
		background-color : var(--navigation-candidate-color);
	}
	&:hover {
		padding-right : calc(var(--margin) / 2);
		> span[data-widget=use-indicator-candidate] {
			opacity        : 1;
			pointer-events : auto;
			margin-left    : calc(var(--margin) / 2);
			transition     : background-color 300ms ease-in-out, color 300ms ease-in-out, margin-left 300ms ease-in-out, opacity 150ms ease-in-out 150ms;
		}
	}
`;
export const UseIndicatorCandidate = styled.span.attrs({'data-widget': 'use-indicator-candidate'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	color            : var(--navigation-candidate-color);
	background-color : var(--bg-color);
	height           : var(--height);
	width            : var(--height);
	margin-left      : calc((var(--height)) * -1);
	border-radius    : calc(var(--border-radius) * 2);
	border           : var(--border);
	border-color     : var(--navigation-candidate-color);
	text-transform   : uppercase;
	font-size        : 1.1em;
	cursor           : pointer;
	opacity          : 0;
	pointer-events   : none;
	transition       : background-color 300ms ease-in-out, color 300ms ease-in-out, margin-left 300ms ease-in-out, opacity 150ms ease-in-out;
	&:hover {
		color            : var(--invert-color);
		background-color : var(--navigation-candidate-color);
	}
`;
export const IndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-indicator-color);
	}
`;
export const IndicatorCandidateCurve = styled(IndicatorCurve).attrs({
	'data-widget': 'indicator-candidate-curve'
})`
	> g > path {
		stroke : var(--navigation-candidate-color);
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
	padding : 0 var(--margin);
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
	color           : var(--navigation-category-color);
	border-color    : var(--navigation-category-color);
	font-size       : 1.4em;
	cursor          : pointer;
	&:before {
		background-color : var(--navigation-category-color);
	}
`;
export const MoreIndicatorsCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'more-indicators-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-category-color);
	}
`;
