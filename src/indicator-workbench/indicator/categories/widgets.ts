import styled from 'styled-components';

export const CategoriesContainer = styled.div.attrs({'data-widget': 'categories'})`
	display               : grid;
	grid-template-columns : repeat(3, 33.333333%);
	position              : relative;
	padding-right         : var(--margin);
`;
export const CategoryContainer = styled.div.attrs({'data-widget': 'category'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	position              : relative;
	padding-right         : var(--margin);
	input[data-widget=search-input] {
		border-width : var(--border-width);
	}
	div[data-widget=search-popup] {
		border-width : var(--border-width);
	}
`;
export const CategoryIndexLabel = styled.span.attrs({'data-widget': 'category-index-label'})`
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
