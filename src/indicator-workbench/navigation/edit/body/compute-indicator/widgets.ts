import {
	IndicatorCriteriaEditContentContainer
} from '@/indicator-workbench/navigation/edit/body/indicator-criteria/widgets';
import styled from 'styled-components';
import {IndicatorNode, IndicatorNodeIndex, IndicatorNodeName, IndicatorNodeRemover} from '../indicator/widgets';
import {CurveRect} from '../types';
import {NavigationBlockPairCurve} from '../widgets';

export const ComputeIndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'compute-indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-indicator-color);
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
export const ComputeIndicatorNode = styled(IndicatorNode).attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'compute-indicator-node',
			style: {
				borderBottomLeftRadius: expanded ? 0 : (void 0),
				borderBottomRightRadius: expanded ? 0 : (void 0)
			}
		};
	}) <{ expanded: boolean }>`
	&:hover {
		> span[data-widget=compute-indicator-remover] {
			clip-path : polygon(0 0, 0 100%, calc(100% + 1px) 100%, calc(100% + 1px) 0);
		}
	}
`;
export const ComputeIndicatorNodeIndex = styled(IndicatorNodeIndex)``;
export const ComputeIndicatorNodeName = styled(IndicatorNodeName)``;
export const ComputeIndicatorNodeRemover = styled(IndicatorNodeRemover).attrs({'data-widget': 'compute-indicator-remover'})`
	border-bottom-right-radius : 0;
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
`;