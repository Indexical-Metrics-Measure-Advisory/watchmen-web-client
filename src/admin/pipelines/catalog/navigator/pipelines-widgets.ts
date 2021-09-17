import {TooltipButton} from '@/widgets/basic/tooltip-button';
import styled from 'styled-components';

export const PipelinesBodyContainer = styled.div.attrs<{ visible: boolean }>(({visible}) => {
	return {
		'data-widget': 'pipelines-navigator-pipelines',
		'data-v-scroll': '',
		style: {
			height: visible ? (void 0) : 0,
			flexGrow: visible ? 1 : 0,
			borderBottom: visible ? 'var(--border)' : 0
		}
	};
})<{ visible: boolean }>`
	display       : block;
	position      : relative;
	align-content : start;
	overflow-y    : auto;
`;
export const PipelinesWrapper = styled.div``;
export const PipelineRowContainer = styled.div.attrs({'data-widget': 'pipelines-navigator-pipeline'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr auto;
	grid-column-gap       : calc(var(--margin) / 2);
	align-self            : start;
	min-height            : var(--tall-height);
	transition            : background-color 300ms ease-in-out;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		width            : 100%;
		height           : 1px;
		top              : calc(100% - 1px);
		left             : 0;
		background-color : var(--border-color);
		opacity          : 0.5;
	}
`;
export const PipelineName = styled.div.attrs({'data-widget': 'pipelines-navigator-pipeline-name'})`
	display     : flex;
	position    : relative;
	align-items : center;
	min-height  : var(--tall-height);
	padding     : 0 calc(var(--margin) / 2);
	grid-column : 1 / span 2;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 100%;
		left             : calc(var(--margin) / 2);
		width            : calc(100% - var(--margin) / 2 + 24px);
		height           : 1px;
		background-color : var(--border-color);
		opacity          : 0.5;
		z-index          : 1;
	}
`;
export const PipelineNameLabel = styled.span.attrs({'data-widget': 'pipelines-navigator-pipeline-name-label'})`
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const PipelineButton = styled(TooltipButton)`
	padding      : 0;
	margin-right : calc(var(--margin) / 2);
	height       : 24px;
	width        : 24px;
	align-self   : center;
	margin-left  : calc(var(--margin) / -2);
`;
export const PipelineDirection = styled.div.attrs<{ rows: number }>(({rows}) => {
	return {
		'data-widget': 'pipelines-navigator-pipeline-direction',
		style: {
			gridRow: `2 / span ${Math.max(rows, 1)}`
		}
	};
})<{ rows: number }>`
	display      : flex;
	position     : relative;
	align-items  : center;
	height       : var(--height);
	padding-left : calc(var(--margin) / 2);
	grid-column  : 1;
	font-variant : petite-caps;
	opacity      : 0.7;
`;
export const PipelineTopic = styled.div.attrs({'data-widget': 'pipelines-navigator-pipeline-topic'})`
	display      : flex;
	position     : relative;
	grid-column  : 2 / span 2;
	align-items  : center;
	height       : var(--height);
	padding      : 0 calc(var(--margin) / 2);
	font-variant : petite-caps;
	opacity      : 0.7;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 1px;
		height           : 100%;
		background-color : var(--border-color);
		opacity          : 0.5;
		z-index          : 1;
	}
`;
export const PipelineTopicLabel = styled.span.attrs({'data-widget': 'pipelines-navigator-pipeline-topic-label'})`
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
`;
export const NoPipelines = styled.div.attrs({'data-widget': 'pipelines-navigator-no-pipelines'})`
	display      : flex;
	align-items  : center;
	height       : var(--tall-height);
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	padding      : 0 calc(var(--margin) / 2);
	opacity      : 0.7;
`;