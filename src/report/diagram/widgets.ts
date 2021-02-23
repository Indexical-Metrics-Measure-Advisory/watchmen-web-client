import styled from 'styled-components';
import { ChartSettings } from '../../services/tuples/chart-types';

export const DiagramContainer = styled.div.attrs<{ settings?: ChartSettings }>(({ settings = {} }) => {
	return {
		'data-widget': 'chart-diagram',
		style: {
			backgroundColor: settings?.backgroundColor || 'var(--bg-color)',
			borderStyle: settings?.border?.style || 'none',
			borderWidth: settings?.border?.width || 0,
			borderColor: settings?.border?.color || 'var(--border-color)',
			borderRadius: settings?.border?.radius || 0
		}
	};
})<{ settings?: ChartSettings }>`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
	overflow : hidden;
`;
export const DiagramLoading = styled.div.attrs({ 'data-widget': 'chart-diagram-loading' })`
	display         : flex;
	align-items     : center;
	justify-content : center;
	font-size       : 112px;
	height          : 100%;
	color           : var(--font-color);
	opacity         : 0.1;
`;
export const EChartDiagramContainer = styled.div.attrs({ 'data-widget': 'echart-diagram' })`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;