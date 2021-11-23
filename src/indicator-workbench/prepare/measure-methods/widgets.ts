import styled from 'styled-components';

export const MeasureItemsContainer = styled.div.attrs({'data-widget': 'measure-items'})`
	display               : grid;
	grid-template-columns : auto 1fr auto 1fr;
	position              : relative;
	padding-right         : var(--margin);
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
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	align-content         : start;
	margin-left           : calc(var(--margin) / -2);
`;
export const MeasureItem = styled.span.attrs({'data-widget': 'measure-item'})`
	display        : flex;
	position       : relative;
	align-items    : center;
	justify-self   : start;
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
	> svg {
		margin-right : calc(var(--margin) / 4);
		font-size    : 0.7em;
		opacity      : 0.7;
	}
`;
export const MeasureFactors = styled.div.attrs({'data-widget': 'measure-factors'})`
	display   : flex;
	position  : relative;
	flex-wrap : wrap;
`;
export const MeasureFactorTooltip = styled.div.attrs({'data-widget': 'measure-factor-tooltip'})`
	display               : grid;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	padding               : 0 calc(var(--margin) / 4);
	> span:first-child {
		grid-column     : 1 / span 2;
		font-variant    : petite-caps;
		font-size       : 1.2em;
		text-decoration : underline;
		margin-bottom   : calc(var(--margin) / 4);
	}
`;
export const MeasureFactorLabel = styled.span.attrs({'data-widget': 'measure-factor'})`
	display        : flex;
	position       : relative;
	align-items    : center;
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
		background-color : var(--info-color);
		opacity          : 0.3;
		z-index          : -1;
	}
	> svg {
		margin-top   : 2px;
		margin-right : calc(var(--margin) / 4);
		font-size    : 0.7em;
		opacity      : 0.7;
	}
`;
export const AggregateItemsTitle = styled(MeasureItemsTitle).attrs({'data-widget': 'aggregate-items-title'})`
	grid-column : 1;
`;
export const AggregateItemsBlock = styled.div.attrs({'data-widget': 'aggregate-items-block'})`
	display     : flex;
	position    : relative;
	grid-column : 2 / span 3;
	flex-wrap   : wrap;
	margin-left : calc(var(--margin) / -2);
`;
export const AggregateItem = styled(MeasureItem).attrs({'data-widget': 'aggregate-item'})`
	&:after {
		background-color : var(--warn-color);
	}
`;