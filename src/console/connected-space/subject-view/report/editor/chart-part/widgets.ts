import styled from 'styled-components';
import { BODY_MAX_HEIGHT_ON_HEADER_NAME_EDITOR } from '../../../../../../admin/pipelines/pipeline/header/widgets';
import { ReportRect } from '../../../../../../services/tuples/report-types';

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
export const ChartWrapper = styled.div.attrs<{ rect: ReportRect }>(({ rect: { width, height } }) => {
	return {
		'data-widget': 'report-chart-wrapper',
		style: { width: width + 2, height: height + 2 }
	};
})<{ rect: ReportRect }>`
	display       : block;
	position      : absolute;
	border-radius : var(--border-radius);
	box-shadow    : var(--param-border);
	overflow      : auto;
	&:hover {
		box-shadow : var(--hover-shadow);
	}
`;