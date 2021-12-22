import styled from 'styled-components';
import {CurveRect} from '../types';
import {NavigationBlock, NavigationBlockPairCurve, PaletteColumn} from '../widgets';

export const MoreIndicatorsContainer = styled.div.attrs({'data-widget': 'more-indicators-container'})`
	display   : flex;
	position  : relative;
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
