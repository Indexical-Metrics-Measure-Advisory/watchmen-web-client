import {ReportRect} from '@/services/data/tuples/report-types';
import styled from 'styled-components';
import {BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR} from '../../header/widgets';

export const EditChartContainer = styled.div.attrs({
	'data-widget': 'report-chart-editor',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	overflow        : auto;
	max-height      : ${BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR};
`;
export const ChartWrapper = styled.div.attrs<{ rect: ReportRect, applyRect: boolean }>(
	({rect: {width, height}, applyRect}) => {
		return {
			'data-widget': 'report-chart-wrapper',
			// even border is applied, still use original width and height
			// since echarts detect size including border width.
			style: {
				width: applyRect ? width : '100%',
				height: applyRect ? height : '100%'
			}
		};
	})<{ rect: ReportRect, applyRect: boolean }>`
	display    : block;
	position   : absolute;
	//border-radius: var(--border-radius);
	box-shadow : var(--param-border);
	overflow   : auto;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;