import styled from 'styled-components';

export const IndicatorsContainer = styled.div.attrs({'data-widget': 'indicators'})`
	display  : flex;
	position : relative;
`;
export const IndicatorsHeaderContainer = styled.div.attrs({'data-widget': 'indicators-header'})`
	display               : grid;
	grid-template-columns : 1fr auto;
	margin-top            : var(--margin);
	margin-bottom         : calc(var(--margin) * 2);
	width                 : 100%;
`;

