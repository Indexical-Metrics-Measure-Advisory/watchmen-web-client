import styled from 'styled-components';

export const LeadKeyword = styled.div.attrs({'data-widget': 'lead-keyword'})`
	font-family  : var(--title-font-family);
	font-size    : 2em;
	font-variant : petite-caps;
`;
export const PartContent = styled.div.attrs({'data-widget': 'part-content'})`
	margin-top : calc(var(--margin) / 2 - 2px);
`;
export const EmptyPart = styled.div.attrs({'data-widget': 'part-content-empty'})`
	font-variant : petite-caps;
	opacity      : 0.7;
`;
export const JoinPart = styled.div.attrs({'data-widget': 'join-part'})`
`;