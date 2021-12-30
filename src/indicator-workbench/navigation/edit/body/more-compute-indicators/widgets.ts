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
	height          : var(--header-height);
	color           : var(--navigation-category-color);
	border-color    : var(--navigation-category-color);
	cursor          : pointer;
	&:before {
		background-color : var(--navigation-category-color);
	}
	> svg {
		margin-left  : calc(var(--margin) / -4);
		margin-right : calc(var(--margin) / 2);
	}
`;
export const MoreIndicatorsCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'more-indicators-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-category-color);
	}
`;
