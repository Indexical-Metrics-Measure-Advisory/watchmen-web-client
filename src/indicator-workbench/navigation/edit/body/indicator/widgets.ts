import styled from 'styled-components';
import {CurveRect} from '../types';
import {NavigationBlock, NavigationBlockPairCurve} from '../widgets';

export const IndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-indicator-color);
	}
`;
export const IndicatorNodeContainer = styled.div.attrs({'data-widget': 'indicator-node-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(7, auto);
	align-items           : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	overflow     : visible;
	transition   : border-radius 300ms ease-in-out;
	&:before {
		background-color : var(--navigation-indicator-color);
	}
	&:hover {
		border-top-right-radius    : 0;
		border-bottom-right-radius : 0;
		> span[data-widget=indicator-remover] {
			clip-path : polygon(0 0, 0 100%, calc(100% + 1px) 100%, calc(100% + 1px) 0);
		}
	}
	&[data-warn=true] > span[data-widget=indicator-remover] {
		border-color      : var(--warn-color);
		border-left-color : transparent;
		color             : var(--warn-color);
		&:before {
			background-color : var(--warn-color);
		}
		> span {
			color        : var(--warn-color);
			border-color : var(--warn-color);
			&:hover {
				border-color : var(--danger-color);
				color        : var(--invert-color);
			}
		}
	}
	&[data-error=true] > span[data-widget=indicator-remover] {
		border-color      : var(--danger-color);
		border-left-color : transparent;
		color             : var(--danger-color);
		&:before {
			background-color : var(--danger-color);
		}
		> span {
			color        : var(--danger-color);
			border-color : var(--danger-color);
			&:hover {
				color : var(--invert-color);
			}
		}
	}
`;
export const IndicatorNodeIndex = styled.span`
	margin-right : calc(var(--margin) / 4);
`;
export const IndicatorNodeName = styled.span`
`;
export const IndicatorNodeRemover = styled.span.attrs({'data-widget': 'indicator-remover'})`
	display           : flex;
	position          : absolute;
	align-items       : center;
	justify-content   : start;
	left              : calc(100% - var(--border-radius) * 2);
	height            : var(--header-height);
	width             : var(--header-height);
	border            : var(--border);
	border-width      : calc(var(--border-width) * 2);
	border-radius     : 0 calc(var(--border-radius) * 2) calc(var(--border-radius) * 2) 0;
	border-color      : var(--navigation-indicator-color);
	border-left-color : transparent;
	clip-path         : polygon(0 0, 0 100%, 0 100%, 0 0);
	transition        : clip-path 300ms ease-in-out;
	z-index           : 1;
	overflow          : hidden;
	&:before,
	&:after {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--navigation-indicator-color);
		opacity          : 0.1;
		z-index          : -1;
	}
	&:after {
		background-color : var(--bg-color);
		z-index          : -2;
		opacity          : 1;
	}
	> span {
		display          : flex;
		position         : relative;
		align-items      : center;
		justify-content  : center;
		height           : var(--height);
		width            : var(--height);
		border-radius    : calc(var(--border-radius) * 2);
		border           : var(--border);
		border-width     : calc(var(--border-width) * 2);
		color            : var(--navigation-indicator-color);
		border-color     : var(--navigation-indicator-color);
		background-color : var(--bg-color);
		cursor           : pointer;
		transition       : color 300ms ease-in-out, background-color 300ms ease-in-out, border-color 300ms ease-in-out;
		&:hover {
			color            : var(--invert-color);
			background-color : var(--danger-color);
			border-color     : var(--danger-color);
		}
	}
`;
