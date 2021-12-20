import styled from 'styled-components';
import {NavigationBlock, NavigationBlockPairCurve} from '../widgets';

export const IndicatorCandidateCurve = styled(NavigationBlockPairCurve).attrs({
	'data-widget': 'indicator-candidate-curve'
})`
	> g > path {
		stroke : var(--navigation-candidate-color);
	}
`;
export const IndicatorCandidateContainer = styled.div.attrs({'data-widget': 'indicator-candidate-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(7, auto);
	align-items           : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorCandidateNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-candidate'})`
	border-color : var(--navigation-candidate-color);
	color        : var(--navigation-candidate-color);
	transition   : padding-right 300ms ease-in-out;
	&:before {
		background-color : var(--navigation-candidate-color);
	}
	&:hover {
		padding-right : calc(var(--margin) / 2);
		> span[data-widget=use-indicator-candidate] {
			opacity        : 1;
			pointer-events : auto;
			margin-left    : calc(var(--margin) / 2);
			transition     : background-color 300ms ease-in-out, color 300ms ease-in-out, margin-left 300ms ease-in-out, opacity 150ms ease-in-out 150ms;
		}
	}
`;
export const UseIndicatorCandidate = styled.span.attrs({'data-widget': 'use-indicator-candidate'})`
	display          : flex;
	position         : relative;
	align-items      : center;
	justify-content  : center;
	color            : var(--navigation-candidate-color);
	background-color : var(--bg-color);
	height           : var(--height);
	width            : var(--height);
	margin-left      : calc((var(--height)) * -1);
	border-radius    : calc(var(--border-radius) * 2);
	border           : var(--border);
	border-color     : var(--navigation-candidate-color);
	text-transform   : uppercase;
	font-size        : 1.1em;
	cursor           : pointer;
	opacity          : 0;
	pointer-events   : none;
	transition       : background-color 300ms ease-in-out, color 300ms ease-in-out, margin-left 300ms ease-in-out, opacity 150ms ease-in-out;
	&:hover {
		color            : var(--invert-color);
		background-color : var(--navigation-candidate-color);
	}
`;
