import styled from 'styled-components';

export const DataContainer = styled.div.attrs({'data-widget': 'inspection-data'})`
	display       : block;
	position      : relative;
	height        : 500px;
	border        : var(--border);
	border-radius : var(--border-radius);
	overflow      : hidden;
`;
// export const DataToolbar = styled.div.attrs({'data-widget': 'inspection-data-toolbar'})`
// `;
// export const ChartContainer = styled.div.attrs({'data-widget': 'inspection-chart'})`
// `;
// export const GridContainer = styled.div.attrs({'data-widget': 'inspection-grid'})`
// `;