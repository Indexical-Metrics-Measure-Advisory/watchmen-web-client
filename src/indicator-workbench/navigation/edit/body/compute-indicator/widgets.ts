import styled from 'styled-components';
import {IndicatorCriteriaEditContentContainer} from '../indicator-criteria/widgets';
import {IndicatorNodeIndex, IndicatorNodeName, IndicatorNodeRemover} from '../indicator/widgets';
import {CurveRect} from '../types';
import {NavigationBlock, NavigationBlockPairCurve} from '../widgets';

export const ComputeIndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'compute-indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-compute-indicator-color);
	}
`;
export const ComputeIndicatorNodeContainer = styled.div.attrs({'data-widget': 'compute-indicator-node-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(7, auto);
	align-items           : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const ComputeIndicatorNode = styled(NavigationBlock).attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'compute-indicator-node',
			style: {
				borderBottomLeftRadius: expanded ? 0 : (void 0),
				borderBottomRightRadius: expanded ? 0 : (void 0)
			}
		};
	}) <{ expanded: boolean }>`
	border-color : var(--navigation-compute-indicator-color);
	color        : var(--navigation-compute-indicator-color);
	overflow     : visible;
	transition   : border-radius 300ms ease-in-out;
	&:before {
		background-color : var(--navigation-compute-indicator-color);
	}
	&:hover {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
		> span[data-widget=compute-indicator-remover] {
			clip-path : polygon(0 0, 0 100%, calc(100% + 1px) 100%, calc(100% + 1px) 0);
		}
	}
	&[data-warn=true] > span[data-widget=compute-indicator-remover] {
		border-color      : var(--warn-color);
		border-left-color : transparent;
		color             : var(--warn-color);
		&:before {
			background-color : var(--warn-color);
		}
		> span {
			color        : var(--warn-color);
			border-color : var(--warn-color);
			&:hover {
				border-color : var(--danger-color);
				color        : var(--invert-color);
			}
		}
	}
	&[data-error=true] > span[data-widget=compute-indicator-remover] {
		border-color      : var(--danger-color);
		border-left-color : transparent;
		color             : var(--danger-color);
		&:before {
			background-color : var(--danger-color);
		}
		> span {
			color        : var(--danger-color);
			border-color : var(--danger-color);
			&:hover {
				color : var(--invert-color);
			}
		}
	}
`;
export const ComputeIndicatorNodeIndex = styled(IndicatorNodeIndex)``;
export const ComputeIndicatorNodeName = styled(IndicatorNodeName)``;
export const ComputeIndicatorNodeRemover = styled(IndicatorNodeRemover).attrs({'data-widget': 'compute-indicator-remover'})`
	border-color               : var(--navigation-compute-indicator-color);
	border-left-color          : transparent;
	border-bottom-right-radius : 0;
	&:before {
		background-color : var(--navigation-compute-indicator-color);
	}
	> span {
		color        : var(--navigation-compute-indicator-color);
		border-color : var(--navigation-compute-indicator-color);
	}
`;
export const ComputeIndicatorNameEditContentContainer = styled(IndicatorCriteriaEditContentContainer)
	.attrs<{ expanded: boolean }>(({expanded}) => {
		return {
			'data-widget': 'compute-indicator-criteria-content',
			style: {
				clipPath: expanded ? 'polygon(-1px -300px, -1px calc(100% + 300px), 150% calc(100% + 300px), 150% -300px)' : (void 0)
			}
		};
	})<{ expanded: boolean }>`
	top                     : calc(100% - var(--border-width) * 2);
	width                   : 100%;
	min-width               : 500px;
	border-top-left-radius  : 0;
	border-top-right-radius : 0;
	border-color            : var(--navigation-compute-indicator-color);
	color                   : var(--navigation-compute-indicator-color);
`;