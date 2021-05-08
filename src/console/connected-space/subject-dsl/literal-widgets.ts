import styled from 'styled-components';

export const DotNode = styled.span.attrs({'data-widget': 'dot'})`
	line-height : var(--line-height);
`;
export const CommaNode = styled.span.attrs({'data-widget': 'comma'})`
	line-height   : var(--line-height);
	padding-right : calc(var(--margin) / 4);
`;
export const OnNode = styled.span.attrs({'data-widget': 'on'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const AsNode = styled.span.attrs({'data-widget': 'as'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const JoinAndNode = styled.span.attrs({'data-widget': 'join-and'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	margin-left    : calc(var(--margin) * 4);
	color          : var(--info-color);
`;
export const JointAndNode = styled.span.attrs<{ indent: number }>(({indent}) => {
	return {
		'data-widget': 'joint-and',
		style: {marginLeft: `calc(var(--margin) / 2 * ${indent + 1})`}
	};
})<{ indent: number }>`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	margin-left    : calc(var(--margin) / 2);
	color          : var(--info-color);
`;
export const JointOrNode = styled.span.attrs<{ indent: number }>(({indent}) => {
	return {
		'data-widget': 'joint-or',
		style: {marginLeft: `calc(var(--margin) / 2 * ${indent + 1})`}
	};
})<{ indent: number }>`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	margin-left    : calc(var(--margin) / 2);
	color          : var(--info-color);
`;
export const NewLineNode = styled.br.attrs({'data-widget': 'new-line'})`
	+ span[data-widget="join-type"] {
		margin-left : calc(var(--margin) * 2);
	}
`;
export const JoinNode = styled.span.attrs({'data-widget': 'join-type'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const EqualsNode = styled.span.attrs({'data-widget': 'equals'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const TopicNode = styled.span.attrs({'data-widget': 'topic-name'})`
	line-height : var(--line-height);
	font-weight : var(--font-demi-bold);
`;
export const FactorNode = styled.span.attrs({'data-widget': 'factor-name'})`
	line-height : var(--line-height);
	font-weight : var(--font-demi-bold);
`;
export const NamePair = styled.span.attrs({'data-widget': 'name-pair'})`
`;
export const AliasNode = styled.span.attrs({'data-widget': 'alias-name'})`
	line-height : var(--line-height);
	font-weight : var(--font-demi-bold);
`;
export const ConstantNode = styled.span.attrs({'data-widget': 'constant'})`
	color : var(--primary-color);
`;
export const UnknownParameterNode = styled.span.attrs({'data-widget': 'unknown-parameter'})`
	font-variant     : petite-caps;
	font-weight      : var(--font-boldest);
	color            : var(--danger-color);
	transform        : scale(1.2);
	transform-origin : bottom;
`;
export const UnknownFilterNode = styled.span.attrs({'data-widget': 'unknown-filter'})`
	font-variant     : petite-caps;
	font-weight      : var(--font-boldest);
	color            : var(--danger-color);
	transform        : scale(1.2);
	transform-origin : bottom;
`;
export const NoStatementNode = styled.span.attrs({'data-widget': 'no-statement'})`
	font-variant     : petite-caps;
	font-weight      : var(--font-boldest);
	color            : var(--danger-color);
	transform        : scale(1.2);
	transform-origin : bottom;
`;
export const ComputeStatementTypeNode = styled.span.attrs({'data-widget': 'compute'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
export const BracketNode = styled.span.attrs({'data-widget': 'bracket'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 8);
	color          : var(--info-color);
`;
export const ExoticNode = styled.span.attrs({'data-widget': 'exotic'})`
	text-decoration : line-through;
	color           : var(--danger-color);
`;
export const UnknownNode = styled.span.attrs({'data-widget': 'unknown'})`
	font-variant     : petite-caps;
	font-weight      : var(--font-boldest);
	color            : var(--danger-color);
	transform        : scale(1.2);
	transform-origin : bottom;
`;
export const FilterExpressionOperatorNode = styled.span.attrs({'data-widget': 'filter-expression-operator'})`
	line-height    : var(--line-height);
	font-variant   : petite-caps;
	font-weight    : var(--font-demi-bold);
	text-transform : capitalize;
	padding        : 0 calc(var(--margin) / 4);
	color          : var(--info-color);
`;
