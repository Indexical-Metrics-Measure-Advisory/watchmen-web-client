import styled from 'styled-components';
import {ItemBlock} from '../widgets';

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
export const MeasureMethodItem = styled(ItemBlock).attrs({'data-widget': 'measure-method-item'})`
	&:after {
		background-color : var(--primary-color);
	}
`;
export const MeasureFactors = styled.div.attrs({'data-widget': 'measure-factors'})`
	display   : flex;
	position  : relative;
	flex-wrap : wrap;
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
export const AggregateItem = styled(ItemBlock).attrs({'data-widget': 'aggregate-item'})`
	&:after {
		background-color : var(--warn-color);
	}
`;