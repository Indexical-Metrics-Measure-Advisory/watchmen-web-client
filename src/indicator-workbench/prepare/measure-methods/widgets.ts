import styled from 'styled-components';

export const MeasuresItemsContainer = styled.div.attrs({'data-widget': 'measures-items'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	margin                : calc(var(--margin) / 2) 0;
`;
export const MeasuresItemsTitle = styled.span.attrs({'data-widget': 'measures-items-title'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	padding-right   : var(--margin);
	height          : calc(var(--height) * 1.2);
	font-size       : 1.2em;
	font-weight     : var(--font-bold);
	font-variant    : petite-caps;
	text-decoration : underline;
	white-space     : nowrap;
	&:after {
		content: ':';
	}
`;
export const MeasuresItemsBlock = styled.div.attrs({'data-widget': 'measures-items-block'})`
	display     : flex;
	position    : relative;
	flex-wrap   : wrap;
	margin-left : calc(var(--margin) / -2);
`;
export const MeasureItem = styled.span.attrs({'data-widget': 'measure-item'})`
	display        : flex;
	position       : relative;
	align-items    : center;
	//color          : var(--invert-color);
	padding        : 0 calc(var(--margin) / 2);
	margin         : calc(var(--height) * 0.2) 0 calc(var(--height) * 0.2) calc(var(--margin) / 2);
	height         : calc(var(--height) * 0.8);
	border-radius  : var(--border-radius);
	text-transform : capitalize;
	font-size      : 1.1em;
	overflow       : hidden;
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.3;
		z-index          : -1;
	}
`;