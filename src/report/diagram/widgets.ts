import styled from 'styled-components';

export const DiagramContainer = styled.div.attrs({ 'data-widget': 'chart-diagram' })`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;
export const DiagramLoading = styled.div.attrs({ 'data-widget': 'chart-diagram-loading' })`
	display         : flex;
	align-items     : center;
	justify-content : center;
	font-size       : 8em;
	height          : 100%;
	opacity         : 0.1;
`;
export const EChartDiagramContainer = styled.div.attrs({ 'data-widget': 'echart-diagram' })`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;