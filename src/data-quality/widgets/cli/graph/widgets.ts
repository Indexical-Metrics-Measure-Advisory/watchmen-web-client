import {Button} from '@/widgets/basic/button';
import styled from 'styled-components';

export const GraphContainer = styled.div.attrs({'data-widget': 'cli-graph'})`
	display: block;
	position: relative;
	width: 100%;
	height: 600px;
	max-height: 70vh;
	margin: calc(var(--margin) / 2) 0 calc(var(--margin) / 2);
`;
export const FullscreenButton = styled(Button)`
	position: absolute;
	right: 4px;
	top: 4px;
	z-index: 1;
	border-radius: calc(var(--border-radius) * 3.5);
`;
export const ChartContainer = styled.div.attrs({'data-widget': 'cli-chart'})`
	display: block;
	position: relative;
	width: 100%;
	height: 100%;
	border-radius: calc(var(--border-radius) * 3.5);
	overflow: hidden;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--invert-color);
		filter: brightness(0.95);
		z-index: -1;
	}
`;