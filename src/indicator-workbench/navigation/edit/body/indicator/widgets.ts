import styled from 'styled-components';
import {CurveRect} from '../types';
import {NavigationBlock, NavigationBlockPairCurve} from '../widgets';

export const IndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-indicator-color);
	}
`;
export const IndicatorNodeContainer = styled.div.attrs({'data-widget': 'indicator-root-node-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(7, auto);
	align-items           : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-root-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	&:before {
		background-color : var(--navigation-indicator-color);
	}
	> span:not(:last-child) {
		margin-right : calc(var(--margin) / 4);
	}
	> svg:not(:last-child) {
		margin-right : calc(var(--margin) / 4);
	}
`;
