import styled from 'styled-components';

export const DotNode = styled.span.attrs({ 'data-widget': 'dot' })`
	line-height : var(--line-height);
`;
export const OnNode = styled.span.attrs({ 'data-widget': 'dot' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
`;
export const JoinNode = styled.span.attrs({ 'data-widget': 'join-type' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
`;
export const EqualsNode = styled.span.attrs({ 'data-widget': 'equals' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
`;

export const TopicNode = styled.span.attrs({ 'data-widget': 'topic-name' })`
	line-height : var(--line-height);
`;
export const FactorNode = styled.span.attrs({ 'data-widget': 'factor-name' })`
	line-height : var(--line-height);
`;
export const NamePair = styled.span.attrs({ 'data-widget': 'name-pair' })`
`;
export const ExoticNode = styled.span.attrs({ 'data-widget': 'exotic' })`
	text-decoration : line-through;
	color           : var(--danger-color);
`;
export const UnknownNode = styled.span.attrs({ 'data-widget': 'unknown' })`
	font-variant : petite-caps;
	font-weight  : var(--font-demi-bold);
	color        : var(--danger-color);
`;