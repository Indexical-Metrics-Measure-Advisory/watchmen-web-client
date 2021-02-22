import styled from 'styled-components';
import { ChartSettings } from '../../services/tuples/chart-types';

export const DiagramContainer = styled.div.attrs<{ settings?: ChartSettings }>(({ settings = {} }) => {
	return {
		'data-widget': 'chart-diagram',
		style: {
			color: settings?.font?.color || 'var(--font-color)',
			fontFamily: settings?.font?.family || 'var(--font-family)',
			fontSize: settings?.font?.size || 'var(--font-size)',
			fontWeight: settings?.font?.weight || 'var(--font-normal)',
			fontStyle: settings?.font?.style || (void 0),
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