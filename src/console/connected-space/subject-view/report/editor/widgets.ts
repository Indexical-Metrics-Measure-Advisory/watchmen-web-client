import styled from 'styled-components';
import { ReportRect } from '../../../../../services/tuples/report-types';

export const EditorContainer = styled.div.attrs({ 'data-widget': 'report-editor' })`
	display               : grid;
	position              : sticky;
	top                   : 0;
	width                 : 100%;
	height                : 100%;
	grid-template-columns : 1fr 400px;
	background-color      : var(--bg-color);
`;
export const EditChartContainer = styled.div.attrs({ 'data-widget': 'report-chart-editor' })`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
`;
export const ChartWrapper = styled.div.attrs<{ rect: ReportRect }>(({ rect: { width, height } }) => {
	return {
		'data-widget': 'report-chart-wrapper',
		style: { width: width + 2, height: height + 2 }
	};
})<{ rect: ReportRect }>`
	display       : block;
	position      : relative;
	border-radius : var(--border-radius);
	box-shadow    : var(--param-border);
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;