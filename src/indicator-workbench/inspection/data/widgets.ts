import styled from 'styled-components';

export const DataContainer = styled.div.attrs({'data-widget': 'inspection-data'})`
	display  : block;
	position : relative;
`;
export const DataGridContainer = styled.div.attrs({'data-widget': 'inspection-grid'})`
	display        : flex;
	position       : relative;
	flex-direction : column;
`;
export const DataGridHeader = styled.div.attrs({'data-widget': 'inspection-grid-header'})`
`;
export const DataGridBody = styled.div.attrs({'data-widget': 'inspection-grid-body'})`
	display    : flex;
	position   : relative;
	flex-grow  : 1;
	max-height : calc(var(--grid-row-height) * 20);
`;