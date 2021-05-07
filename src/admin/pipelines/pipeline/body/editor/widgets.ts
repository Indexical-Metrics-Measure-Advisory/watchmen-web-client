import styled from 'styled-components';

export const PipelineEditor = styled.div.attrs({'data-widget': 'pipeline-editor', 'data-v-scroll': ''})`
	display        : flex;
	position       : relative;
	flex-grow      : 1;
	flex-direction : column;
	padding        : calc(var(--margin) / 2) var(--margin);
	overflow-y     : auto;
	max-height     : 100%;
`;
