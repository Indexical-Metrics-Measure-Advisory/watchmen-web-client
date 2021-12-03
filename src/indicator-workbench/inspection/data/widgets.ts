import styled from 'styled-components';

export const DataContainer = styled.div.attrs({'data-widget': 'inspection-data'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
`;
export const DataToolbar = styled.div.attrs({'data-widget': 'inspection-data-toolbar'})`
`;
export const ChartContainer = styled.div.attrs({'data-widget': 'inspection-chart'})`
`;
export const GridContainer = styled.div.attrs({'data-widget': 'inspection-grid'})`
`;