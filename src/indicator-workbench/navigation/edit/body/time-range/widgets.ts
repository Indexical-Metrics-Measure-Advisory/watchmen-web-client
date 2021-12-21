import styled from 'styled-components';
import {CurveRect} from '../types';
import {NavigationBlock, NavigationBlockPairCurve} from '../widgets';

export const TimeRangeNodeContainer = styled.div.attrs({'data-widget': 'time-range-node-container'})`
	display     : flex;
	position    : relative;
	align-items : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const TimeRangeNode = styled(NavigationBlock).attrs({'data-widget': 'time-range-node'})`
	display               : grid;
	grid-template-columns : repeat(6, auto);
	grid-column-gap       : calc(var(--margin) / 4);
	border-color          : var(--navigation-time-range-color);
	color                 : var(--navigation-time-range-color);
	&:before {
		background-color : var(--navigation-time-range-color);
	}
	&:hover {
		> div[data-widget=dropdown] {
			border-color : var(--navigation-time-range-color);
		}
	}
	> div[data-widget=dropdown] {
		border-color : transparent;
		> div[data-widget=dropdown-options-container] {
			border-color : var(--navigation-time-range-color);
		}
	}
	> div[data-widget=checkbox] {
		border-color : var(--navigation-time-range-color);
	}
`;
export const TimeRangeCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'time-range-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-time-range-color);
	}
`;
