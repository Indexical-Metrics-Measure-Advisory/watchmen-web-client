import styled from 'styled-components';
import {ItemBlock} from '../widgets';

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
export const MeasureFactorItem = styled(ItemBlock).attrs({'data-widget': 'measure-factor'})`
	&:after {
		background-color : var(--info-color);
	}
	> svg {
		margin-top : 2px;
	}
`;
