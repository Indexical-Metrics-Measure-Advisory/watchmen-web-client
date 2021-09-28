import styled from 'styled-components';

export const Dsl = styled.code.attrs({'data-widget': 'dsl'})`
	display       : block;
	position      : relative;
	line-height   : 2em;
	margin-top    : -40px;
	counter-reset : section;
	padding-top   : calc(var(--margin) / 2);
	padding-left  : calc(var(--margin) * 3);
	border        : var(--border);
	border-radius : var(--param-height);
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : calc(var(--margin) * 2.5);
		height           : 100%;
		background-color : var(--border-color);
		border-radius    : calc(var(--param-height) - 1px) 0 0 calc(var(--param-height) - 1px);
		opacity          : 0.2;
		z-index          : -1;
	}
`;
export const EmptyLine = styled.span.attrs({'data-widget': 'dsl-empty-line'})`
	display     : block;
	position    : relative;
	float       : left;
	clear       : both;
	font-weight : 600;
	height      : 2em;
	&:before {
		content           : counter(section);
		counter-increment : section;
		display           : block;
		position          : absolute;
		top               : 0;
		right             : calc(100% - var(--margin) * -1);
		color             : var(--info-color);
		opacity           : 0.7;
	}
`;
export const Whitespace = styled.span.attrs({'data-widget': 'dsl-whitespace'})`
	display     : block;
	float       : left;
	font-weight : 600;
	opacity     : 0;
	height      : 2em;
	width       : 8px;
`;
export const LineComment = styled.span.attrs<{ indent?: number }>(({indent = 0}) => {
	return {
		'data-widget': 'dsl-line-comment',
		style: {paddingLeft: indent * 16}
	};
})<{ indent?: number }>`
	display      : block;
	position     : relative;
	float        : left;
	clear        : both;
	font-weight  : 600;
	font-variant : petite-caps;
	&:after {
		content           : counter(section);
		counter-increment : section;
		display           : block;
		position          : absolute;
		top               : 0;
		right             : calc(100% - var(--margin) * -1);
		color             : var(--info-color);
		opacity           : 0.7;
	}
	&:before {
		content      : '#';
		margin-right : 2px;
	}
`;
export const PropName = styled.span.attrs<{ indent?: number }>(({indent = 0}) => {
	return {
		'data-widget': 'dsl-prop-name',
		style: {paddingLeft: indent * 16}
	};
})<{ indent?: number }>`
	display      : block;
	position     : relative;
	float        : left;
	clear        : both;
	color        : var(--info-color);
	font-weight  : var(--font-bold);
	margin-right : calc(var(--margin) / 4);
	&:before {
		content           : counter(section);
		counter-increment : section;
		display           : block;
		position          : absolute;
		top               : 0;
		right             : calc(100% - var(--margin) * -1);
		color             : var(--info-color);
		opacity           : 0.7;
	}
	&:after {
		content : ':';
	}
`;
export const PropNameInListFirst = styled(PropName).attrs({'data-widget': 'dsl-prop-name-in-1st-line'})``;
export const PropValue = styled.span.attrs<{ 'data-widget'?: string }>(({'data-widget': widget}) => {
	return {'data-widget': widget || 'dsl-prop-value'};
})`
	display       : block;
	float         : left;
	white-space   : nowrap;
	overflow      : hidden;
	text-overflow : ellipsis;
	&:empty {
		text-decoration : none;
		:after {
			content          : '?';
			font-weight      : var(--font-boldest);
			color            : var(--invert-color);
			background-color : red;
			padding          : 0 4px;
			border-radius    : var(--border-radius);
		}
	}
	&[data-incorrect=true] {
		font-weight : var(--font-boldest);
		color       : red;
	}
`;
export const TopicName = styled(PropValue).attrs({'data-widget': 'dsl-topic-name'})`
	color           : var(--warn-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'topic?';
		}
	}
`;
export const FactorName = styled(PropValue).attrs({'data-widget': 'dsl-factor-name'})`
	color           : var(--warn-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'factor?';
		}
	}
`;
export const ExternalWriterName = styled(PropValue).attrs({'data-widget': 'dsl-external-writer-name'})`
	color           : var(--warn-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'writer?';
		}
	}
`;
export const VariableName = styled(PropValue).attrs({'data-widget': 'dsl-variable-name'})`
	color           : var(--success-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'variable?';
		}
	}
`;
export const BooleanValue = styled(PropValue).attrs({'data-widget': 'dsl-boolean-value'})`
	color : var(--danger-color);
`;
export const EnumValue = styled(PropValue).attrs({'data-widget': 'dsl-enum-value'})`
	text-transform : uppercase;
	font-variant   : petite-caps;
	color          : var(--primary-color);
`;
export const TriggerOn = styled(EnumValue).attrs({'data-widget': 'dsl-trigger-on'})``;
export const ActionType = styled(EnumValue).attrs({'data-widget': 'dsl-action-type'})``;
export const ParamFrom = styled(EnumValue).attrs({'data-widget': 'dsl-parameter-from'})``;
export const ComputeType = styled(EnumValue).attrs({'data-widget': 'dsl-compute-type'})``;
export const ExpressionOperator = styled(EnumValue).attrs({'data-widget': 'dsl-expression-operator'})`
	text-transform : uppercase;
`;
export const ConjunctionWord = styled(EnumValue).attrs({'data-widget': 'dsl-conjunction-word'})`
	color       : var(--info-color);
	font-weight : var(--font-boldest);
`;
export const AggregateArithmeticValue = styled(EnumValue).attrs({'data-widget': 'dsl-aggregate-arithmetic'})`
	font-weight : var(--font-boldest);
`;
export const Bracket = styled(EnumValue).attrs({'data-widget': 'dsl-bracket'})`
	color       : var(--danger-color);
	font-weight : var(--font-boldest);
`;
export const JointContainer = styled.div.attrs({'data-widget': 'dsl-joint'})``;