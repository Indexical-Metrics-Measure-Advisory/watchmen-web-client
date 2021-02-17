import styled from 'styled-components';

export const Dsl = styled.code.attrs({ 'data-widget': 'dsl' })`
	display     : block;
	position    : relative;
	line-height : 2em;
	margin-top  : -40px;
`;
export const EmptyLine = styled.span.attrs({ 'data-widget': 'dsl-empty-line' })`
	display     : block;
	float       : left;
	clear       : both;
	font-weight : 600;
	opacity     : 0;
	height      : 2em;
`;
export const LineComment = styled.span.attrs<{ indent?: number }>(({ indent = 0 }) => {
	return {
		'data-widget': 'dsl-line-comment',
		style: { marginLeft: indent * 16 }
	};
})<{ indent?: number }>`
	display      : block;
	float        : left;
	clear        : both;
	font-weight  : 600;
	font-variant : petite-caps;
	opacity      : 0.7;
	&:before {
		content      : '#';
		margin-right : 2px;
	}
`;
export const PropName = styled.span.attrs<{ indent?: number }>(({ indent = 0 }) => {
	return {
		'data-widget': 'dsl-prop-name',
		style: { marginLeft: indent * 16 }
	};
})<{ indent?: number }>`
	display      : block;
	float        : left;
	clear        : both;
	color        : var(--info-color);
	font-weight  : var(--font-bold);
	margin-right : calc(var(--margin) / 4);
	&:after {
		content : ':';
	}
`;
export const PropNameInListFirst = styled(PropName)`
	&:before {
		content : '- ';
	}
`;
export const PropValue = styled.span.attrs<{ 'data-widget'?: string }>(({ 'data-widget': widget }) => {
	return { 'data-widget': widget || 'dsl-prop-value' };
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
`;
export const TopicName = styled(PropValue).attrs({ 'data-widget': 'dsl-topic-name' })`
	color           : var(--warn-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'Topic?';
		}
	}
`;
export const FactorName = styled(PropValue).attrs({ 'data-widget': 'dsl-topic-name' })`
	color           : var(--warn-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'factor?';
		}
	}
`;
export const VariableName = styled(PropValue).attrs({ 'data-widget': 'dsl-topic-name' })`
	color           : var(--success-color);
	font-weight     : var(--font-boldest);
	text-decoration : underline;
	&:empty {
		:after {
			content : 'Variable?';
		}
	}
`;
export const BooleanValue = styled(PropValue).attrs({ 'data-widget': 'dsl-boolean-value' })`
	color : var(--danger-color);
`;
export const EnumValue = styled(PropValue)`
	text-transform : uppercase;
	font-variant   : petite-caps;
	color          : var(--primary-color);
`;
export const TriggerOn = styled(EnumValue).attrs({ 'data-widget': 'dsl-trigger-on' })``;
export const ActionType = styled(EnumValue).attrs({ 'data-widget': 'dsl-action-type' })``;
export const ParamFrom = styled(EnumValue).attrs({ 'data-widget': 'dsl-parameter-from' })``;
export const ComputeType = styled(EnumValue).attrs({ 'data-widget': 'dsl-compute-type' })``;