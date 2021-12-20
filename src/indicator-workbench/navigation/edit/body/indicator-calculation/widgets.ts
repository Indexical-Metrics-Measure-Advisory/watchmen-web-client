import styled from 'styled-components';
import {NavigationBlock} from '../widgets';

export const IndicatorCalculationNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-calculation-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	&:before {
		background-color : var(--navigation-indicator-color);
	}
`;
export const IndicatorCalculationVariableName = styled.span.attrs<{ compact?: boolean }>(
	({compact = false}) => {
		return {
			'data-widget': 'indicator-calculation-variable-name',
			style: {
				paddingRight: compact ? 'calc(var(--margin) / 4)' : (void 0)
			}
		};
	})<{ compact?: boolean }>`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-variant : petite-caps;
`;
export const IndicatorCalculationValue = styled.span.attrs({'data-widget': 'indicator-calculation-value'})`
	display     : flex;
	position    : relative;
	align-items : center;
	color       : var(--navigation-indicator-value-color);
	font-weight : var(--font-bold);
`;
export const IndicatorCalculationFormulaContainer = styled.div.attrs({'data-widget': 'indicator-calculation-formula'})`
	
`;