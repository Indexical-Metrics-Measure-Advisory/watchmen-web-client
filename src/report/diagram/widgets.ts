import styled from 'styled-components';
import { ChartSettings } from '../../services/tuples/chart-types';

export const DiagramContainer = styled.div.attrs<{ settings?: ChartSettings }>(({ settings = {} }) => {
	return {
		'data-widget': 'chart-diagram',
		style: {
			color: settings?.fontColor || 'var(--font-color)',
			fontFamily: settings?.fontFamily || 'var(--font-family)',
			fontSize: settings?.fontSize || 'var(--font-size)',
			fontWeight: settings?.fontWeight || 'var(--font-normal)',
			fontStyle: settings?.fontStyle || (void 0),
			backgroundColor: settings?.backgroundColor || 'var(--bg-color)',
			borderStyle: settings?.borderStyle || 'none',
			borderWidth: settings?.borderWidth || 0,
			borderColor: settings?.borderColor || 'var(--border-color)',
			borderRadius: settings?.borderRadius || 0
		}
	};
})<{ settings?: ChartSettings }>`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;
export const DiagramLoading = styled.div.attrs({ 'data-widget': 'chart-diagram-loading' })`
	display         : flex;
	align-items     : center;
	justify-content : center;
	font-size       : 112px;
	height          : 100%;
	opacity         : 0.1;
`;
export const EChartDiagramContainer = styled.div.attrs({ 'data-widget': 'echart-diagram' })`
	display  : block;
	position : relative;
	width    : 100%;
	height   : 100%;
`;