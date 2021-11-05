import styled from 'styled-components';

export const MeasuresItemsContainer = styled.div.attrs({'data-widget': 'measures-items'})`
	display       : flex;
	position      : relative;
	border-bottom : var(--border);
`;
export const MeasuresItemsTitle = styled.span.attrs({'data-widget': 'measures-items-title'})`
	display       : flex;
	position      : relative;
	align-items   : center;
	padding-right : var(--margin);
	height        : calc(var(--height) * 1.2);
	font-size     : 1.2em;
	font-weight   : var(--font-demi-bold);
	white-space   : nowrap;
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
	padding        : 0 calc(var(--margin) / 2);
	margin-left    : calc(var(--margin) / 2);
	height         : calc(var(--height) * 1.2);
	border-radius  : var(--border-radius);
	text-transform : capitalize;
	font-size      : 1.1em;
`;