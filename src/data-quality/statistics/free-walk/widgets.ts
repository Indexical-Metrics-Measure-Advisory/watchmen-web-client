import styled from 'styled-components';

export const DataPanelCriteria = styled.div.attrs({'data-widget': 'data-panel-criteria'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr auto 1fr auto 1fr auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
	padding               : calc(var(--margin) / 4) calc(var(--margin) / 2);
`;
export const DataPanelCriteriaLabel = styled.div.attrs({'data-widget': 'data-panel-criteria-label'})`
	display     : flex;
	position    : relative;
	align-items : center;
	height      : var(--height);
`;
