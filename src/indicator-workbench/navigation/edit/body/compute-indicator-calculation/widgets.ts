import styled from 'styled-components';
import {
	IndicatorCalculationFormulaContainer,
	IndicatorCalculationFormulaLabel,
	IndicatorCalculationNode,
	IndicatorCalculationValue,
	IndicatorCalculationVariableName
} from '../indicator-calculation/widgets';

export const ComputeIndicatorCalculationNodeContainer = styled.div.attrs({'data-widget': 'compute-indicator-calculation-node-container'})`
	display  : block;
	position : relative;
`;
export const ComputeIndicatorCalculationNode = styled(IndicatorCalculationNode).attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'indicator-calculation-node',
			style: {
				borderBottomLeftRadius: expanded ? 0 : (void 0),
				borderBottomRightRadius: expanded ? 0 : (void 0)
			}
		};
	})<{ expanded: boolean }>``;
export const ComputeIndicatorCalculationVariableName = styled(IndicatorCalculationVariableName)
	.attrs({'data-widget': 'compute-indicator-calculation-variable-name'})``;
export const ComputeIndicatorCalculationValue = styled(IndicatorCalculationValue).attrs({'data-widget': 'compute-indicator-calculation-value'})``;
export const ComputeIndicatorCalculationFormulaContainer = styled(IndicatorCalculationFormulaContainer).attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'compute-indicator-calculation-formula',
			style: {
				clipPath: expanded ? 'polygon(-1px 0, -1px calc(100% + 250px), calc(100% + 1px) calc(100% + 250px), calc(100% + 1px) 0)' : (void 0)
			}
		};
	})<{ expanded: boolean }>`
	> textarea {
		height : calc(var(--height) * 7);
	}
`;
export const ComputeIndicatorCalculationFormulaLabel = styled(IndicatorCalculationFormulaLabel).attrs({'data-widget': 'compute-indicator-calculation-aggregation-label'})``;