import styled from 'styled-components';

export const DotNode = styled.span.attrs({ 'data-widget': 'dot' })`
	line-height : var(--line-height);
`;
export const CommaNode = styled.span.attrs({ 'data-widget': 'comma' })`
	line-height : var(--line-height);
`;
export const OnNode = styled.span.attrs({ 'data-widget': 'on' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const AndNode = styled.span.attrs({ 'data-widget': 'and' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	margin-left    : calc(var(--margin) * 4);
	color          : var(--info-color);
`;
export const NewLineNode = styled.br.attrs({ 'data-widget': 'new-line' })`
	+ span[data-widget="join-type"] {
		margin-left : calc(var(--margin) * 2);
	}
`;
export const JoinNode = styled.span.attrs({ 'data-widget': 'join-type' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const EqualsNode = styled.span.attrs({ 'data-widget': 'equals' })`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;

export const TopicNode = styled.span.attrs({ 'data-widget': 'topic-name' })`
	line-height : var(--line-height);
	font-weight : var(--font-demi-bold);
`;
export const FactorNode = styled.span.attrs({ 'data-widget': 'factor-name' })`
	line-height : var(--line-height);
	font-weight : var(--font-demi-bold);
`;
export const NamePair = styled.span.attrs({ 'data-widget': 'name-pair' })`
`;
export const ExoticNode = styled.span.attrs({ 'data-widget': 'exotic' })`
	text-decoration : line-through;
	color           : var(--danger-color);
`;
export const UnknownNode = styled.span.attrs({ 'data-widget': 'unknown' })`
	font-variant     : petite-caps;
	font-weight      : var(--font-boldest);
	color            : var(--danger-color);
	transform        : scale(1.2);
	transform-origin : bottom;
`;