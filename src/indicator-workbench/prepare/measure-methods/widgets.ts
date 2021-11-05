import styled from 'styled-components';

export const MeasureItemsContainer = styled.div.attrs({'data-widget': 'measure-items'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
`;
export const MeasureItemsTitle = styled.span.attrs({'data-widget': 'measure-items-title'})`
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
		content : ':';
	}
`;
export const MeasureItemsBlock = styled.div.attrs({'data-widget': 'measure-items-block'})`
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
	font-variant   : petite-caps;
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
export const AggregateItemsTitle = MeasureItemsTitle;
export const AggregateItemsBlock = MeasureItemsBlock;
export const AggregateItem = styled(MeasureItem)`
	&:after {
		background-color : var(--success-color);
	}
`;