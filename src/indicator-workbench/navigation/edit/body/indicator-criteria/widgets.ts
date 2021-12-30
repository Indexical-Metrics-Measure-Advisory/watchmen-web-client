import styled from 'styled-components';
import {NavigationBlock} from '../widgets';

export const IndicatorCriteriaNodeContainer = styled.div.attrs({'data-widget': 'indicator-criteria-node-container'})`
	display  : block;
	position : relative;
`;
export const IndicatorCriteriaNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-criteria-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	overflow     : visible;
	&:before {
		background-color : var(--navigation-indicator-color);
	}
`;
export const IndicatorCriteriaEditContentContainer = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		'data-widget': 'indicator-criteria-content',
		style: {
			clipPath: expanded ? 'polygon(0 -300px, 0 calc(100% + 300px), 150% calc(100% + 300px), 150% -300px)' : (void 0),
			zIndex: expanded ? 2 : (void 0)
		}
	};
})<{ expanded: boolean }>`
	display               : grid;
	position              : absolute;
	grid-template-columns : 1fr;
	grid-auto-rows        : calc(var(--header-height) - var(--border-width) * 2);
	grid-row-gap          : calc(var(--border-width) * 2);
	align-items           : center;
	min-height            : var(--header-height);
	top                   : 0;
	left                  : 0;
	padding               : 0 var(--margin);
	border                : var(--border);
	border-width          : calc(var(--border-width) * 2);
	border-radius         : calc(var(--border-radius) * 2);
	border-color          : var(--navigation-indicator-color);
	color                 : var(--navigation-indicator-color);
	background-color      : var(--bg-color);
	font-size             : 1.2em;
	white-space           : nowrap;
	text-overflow         : ellipsis;
	overflow              : hidden;
	clip-path             : polygon(0 0, 0 0, 0 0, 0 0);
	transition            : clip-path 300ms ease-in-out;
	z-index               : 1;
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--navigation-indicator-bg-color);
		z-index          : -1;
	}
`;
export const IndicatorName = styled.div.attrs({'data-widget': 'indicator-name'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	align-items           : center;
	> span {
		font-variant : petite-caps;
	}
	> input {
		font-size : 1em;
		color     : var(--navigation-indicator-color);
	}
`;
export const IndicatorCriteriaRow = styled.div.attrs({'data-widget': 'indicator-criteria-row'})`
	display               : grid;
	grid-template-columns : 32px 250px 220px 200px auto;
	grid-column-gap       : calc(var(--margin) / 4);
	align-items           : center;
	&:hover {
		span[data-widget=indicator-criteria-button] {
			opacity        : 1;
			pointer-events : auto;
		}
	}
`;
export const IndicatorCriteriaIndex = styled.span.attrs({'data-widget': 'indicator-criteria-index'})`
	font-size : 0.8em;
`;
export const IndicatorCriteriaFactor = styled.div.attrs({'data-widget': 'indicator-criteria-factor'})`
	> span {
		font-variant : petite-caps;
	}
	> div[data-widget=dropdown] {
		width : 100%;
		//border-color : var(--navigation-indicator-color);
		//> div[data-widget=dropdown-options-container] {
		//border-color : var(--navigation-indicator-color);
		//}
	}
`;
export const IndicatorCriteriaArithmetic = styled.div.attrs({'data-widget': 'indicator-criteria-arithmetic'})`
	> div[data-widget=dropdown] {
		width : 100%;
		//border-color : var(--navigation-indicator-color);
		//> div[data-widget=dropdown-options-container] {
		//	border-color : var(--navigation-indicator-color);
		//}
	}
`;
export const IndicatorCriteriaValue = styled.div.attrs({'data-widget': 'indicator-criteria-value'})`
	> div[data-widget=dropdown] {
		width : 100%;
		//border-color : var(--navigation-indicator-color);
		//> div[data-widget=dropdown-options-container] {
		//	border-color : var(--navigation-indicator-color);
		//}
	}
	> input {
		width     : 100%;
		font-size : 1em;
		color     : var(--navigation-indicator-color);
		//border-color : var(--navigation-indicator-color);
	}
`;
export const IndicatorCriteriaButtons = styled.div.attrs({'data-widget': 'indicator-criteria-buttons'})`
	display  : flex;
	position : relative;
`;
export const IndicatorCriteriaButton = styled.span.attrs({'data-widget': 'indicator-criteria-button'})`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	height          : var(--height);
	width           : calc(var(--height) * 1.2);
	border          : var(--border);
	border-radius   : calc(var(--border-radius) * 2);
	border-color    : var(--danger-color);
	color           : var(--danger-color);
	transition      : background-color 300ms ease-in-out, color 300ms ease-in-out, opacity 300ms ease-in-out;
	cursor          : pointer;
	opacity         : 0;
	pointer-events  : none;
	&:hover {
		background-color : var(--danger-color);
		color            : var(--invert-color);
	}
`;
