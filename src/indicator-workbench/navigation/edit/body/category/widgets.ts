import styled from 'styled-components';
import {CurveRect} from '../types';
import {NavigationBlock, NavigationBlockPairCurve, PaletteColumn} from '../widgets';

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
