import styled from 'styled-components';

export const PipelineBodyContainer = styled.div.attrs({ 'data-widget': 'pipeline-body' })`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	padding   : calc(var(--margin) / 2) var(--margin);
`;
export const LeadLabel = styled.div.attrs({ 'data-widget': 'pipeline-editor-lead-label' })`
	display         : flex;
	align-items     : center;
	justify-content : flex-end;
	height          : var(--height);
	align-self      : start;
	font-variant    : petite-caps;
	font-weight     : var(--font-demi-bold);
	cursor          : default;
`;