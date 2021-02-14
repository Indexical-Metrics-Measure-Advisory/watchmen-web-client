import styled from 'styled-components';

export const PipelineBodyContainer = styled.div.attrs({ 'data-widget': 'pipeline-body' })`
	display        : flex;
	position       : relative;
	flex-direction : column;
	flex-grow      : 1;
	padding        : calc(var(--margin) / 2) var(--margin);
`;
