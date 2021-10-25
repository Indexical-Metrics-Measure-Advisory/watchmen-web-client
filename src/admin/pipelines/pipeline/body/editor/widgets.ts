import styled from 'styled-components';

export const PipelineEditor = styled.div.attrs({'data-widget': 'pipeline-editor', 'data-v-scroll': ''})`
	display    : block;
	padding    : calc(var(--margin) / 2) var(--margin);
	overflow-y : auto;
	max-height : 100%;
`;
