import styled from 'styled-components';
import {CurveRect} from './types';

export const BodyContainer = styled.div.attrs({
	'data-widget': 'navigation-edit',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display          : flex;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : scroll;
`;

export const BodyPalette = styled.div.attrs({'data-widget': 'navigation-edit-palette'})`
	display               : grid;
	position              : relative;
	grid-template-columns : auto auto;
`;

export const PaletteColumn = styled.div.attrs({'data-widget': 'navigation-palette-column'})`
	display         : flex;
	position        : relative;
	flex-direction  : column;
	padding         : calc(var(--margin) * 2);
	align-items     : flex-start;
	justify-content : center;
`;

export const NavigationBlock = styled.div.attrs<{ error?: boolean; warn?: boolean }>(
	({error, warn}) => {
		return {
			'data-error': error ? 'true' : (void 0),
			'data-warn': warn ? 'true' : (void 0)
		};
	})<{ error?: boolean; warn?: boolean }>`
	display         : flex;
	position        : relative;
	align-items     : center;
	justify-content : center;
	min-height      : var(--header-height);
	min-width       : 150px;
	padding         : 0 var(--margin);
	border          : var(--border);
	border-width    : calc(var(--border-width) * 2);
	border-radius   : calc(var(--border-radius) * 2);
	border-color    : var(--primary-color);
	color           : var(--primary-color);
	font-size       : 1.2em;
	font-variant    : petite-caps;
	white-space     : nowrap;
	text-overflow   : ellipsis;
	overflow        : hidden;
	&[data-warn=true] {
		border-color : var(--warn-color);
		color        : var(--warn-color);
		&:before {
			background-color : var(--warn-color);
		}
		~ svg > g > path {
			stroke : var(--warn-color);
		}
	}
	&[data-error=true] {
		border-color : var(--danger-color);
		color        : var(--danger-color);
		&:before {
			background-color : var(--danger-color);
		}
		~ svg > g > path {
			stroke : var(--danger-color);
		}
	}
	&:before {
		content          : '';
		display          : block;
		position         : absolute;
		top              : 0;
		left             : 0;
		width            : 100%;
		height           : 100%;
		background-color : var(--primary-color);
		opacity          : 0.1;
		z-index          : -1;
	}
`;
export const NavigationBlockPairCurve = styled.svg.attrs<{ rect: CurveRect }>(({rect}) => {
	return {
		'xmlns': 'http://www.w3.org/2000/svg',
		style: {
			top: rect.top,
			left: 0 - rect.width,
			width: rect.width,
			height: rect.height
		}
	};
})<{ rect: CurveRect }>`
	display  : block;
	position : absolute;
	> g > path {
		stroke-width : 2px;
		fill         : transparent;
		opacity      : 0.5;
	}
`;

export const NavigationRootNode = styled(NavigationBlock).attrs({'data-widget': 'navigation-root-node'})`
	border-color : var(--navigation-root-color);
	color        : var(--navigation-root-color);
	&:before {
		background-color : var(--navigation-root-color);
	}
`;
export const TimeRangeNodeContainer = styled.div.attrs({'data-widget': 'time-range-node-container'})`
	display     : flex;
	position    : relative;
	align-items : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const TimeRangeNode = styled(NavigationBlock).attrs({'data-widget': 'time-range-node'})`
	display               : grid;
	grid-template-columns : repeat(5, auto);
	grid-column-gap       : calc(var(--margin) / 4);
	border-color          : var(--navigation-time-range-color);
	color                 : var(--navigation-time-range-color);
	&:before {
		background-color : var(--navigation-time-range-color);
	}
	&:hover {
		> div[data-widget=dropdown] {
			border-color : var(--navigation-time-range-color);
		}
	}
	> div[data-widget=dropdown] {
		border-color : transparent;
		> div[data-widget=dropdown-options-container] {
			border-color : var(--navigation-time-range-color);
		}
	}
	> div[data-widget=checkbox] {
		border-color : var(--navigation-time-range-color);
	}
`;
export const TimeRangeCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'time-range-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-time-range-color);
	}
`;
export const IndicatorCategoryContainer = styled.div.attrs({'data-widget': 'indicator-category-container'})`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	flex-wrap : nowrap;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorCategoryColumn = styled(PaletteColumn).attrs({'data-widget': 'indicator-category-column'})`
	padding : 0 var(--margin);
	&:first-child {
		padding-left : 0;
	}
	&:last-child {
		padding-right : 0;
	}
`;
export const IndicatorCategoryNodeContainer = styled.div.attrs({'data-widget': 'indicator-category-node-container'})`
	display  : block;
	position : relative;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorCategoryNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-category-node'})`
	text-transform : capitalize;
	border-color   : var(--navigation-category-color);
	color          : var(--navigation-category-color);
	&:before {
		background-color : var(--navigation-category-color);
	}
`;
export const IndicatorCategoryCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-category-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-category-color);
	}
`;
export const IndicatorRootNodeContainer = styled.div.attrs({'data-widget': 'indicator-root-node-container'})`
	display               : grid;
	position              : relative;
	grid-template-columns : repeat(7, auto);
	align-items           : center;
	&:not(:last-child) {
		margin-bottom : calc(var(--margin) / 2);
	}
`;
export const IndicatorRootNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-root-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	&:before {
		background-color : var(--navigation-indicator-color);
	}
	> span:not(:last-child) {
		margin-right : calc(var(--margin) / 4);
	}
	> svg:not(:last-child) {
		margin-right : calc(var(--margin) / 4);
	}
`;
export const IndicatorPartRelationLine = styled.span.attrs({'data-widget': 'indicator-part-relation-line'})`
	display          : block;
	position         : relative;
	width            : 64px;
	height           : 2px;
	background-color : var(--navigation-indicator-color);
	opacity          : 0.5;
`;
export const IndicatorCriteriaNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-criteria-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	overflow     : visible;
	&:before {
		background-color : var(--navigation-indicator-color);
	}
`;
export const IndicatorCriteriaContent = styled.div.attrs<{ expanded: boolean }>(({expanded}) => {
	return {
		'data-widget': 'indicator-criteria-content',
		style: {
			clipPath: expanded ? 'polygon(0 -250px, 0 calc(100% + 250px), calc(100% + 200px) calc(100% + 250px), calc(100% + 200px) -250px)' : (void 0)
		}
	};
})<{ expanded: boolean }>`
	display               : grid;
	position              : absolute;
	grid-template-columns : 1fr;
	grid-column-gap       : 0;
	grid-auto-rows        : calc(var(--header-height) - var(--border-width) * 2);
	grid-row-gap          : calc(var(--border-width) * 2);
	align-items           : center;
	min-height            : var(--header-height);
	top                   : calc(var(--border-width) * -2);
	left                  : calc(var(--border-width) * -2);
	padding               : 0 var(--margin);
	border                : var(--border);
	border-width          : calc(var(--border-width) * 2);
	border-radius         : calc(var(--border-radius) * 2);
	border-color          : var(--navigation-indicator-color);
	color                 : var(--navigation-indicator-color);
	background-color      : var(--bg-color);
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
	> div[data-widget=dropdown] {
		width        : 100%;
		border-color : var(--navigation-indicator-color);
		> div[data-widget=dropdown-options-container] {
			border-color : var(--navigation-indicator-color);
		}
	}
`;
export const IndicatorCriteriaArithmetic = styled.div.attrs({'data-widget': 'indicator-criteria-arithmetic'})`
	> div[data-widget=dropdown] {
		width        : 100%;
		border-color : var(--navigation-indicator-color);
		> div[data-widget=dropdown-options-container] {
			border-color : var(--navigation-indicator-color);
		}
	}
`;
export const IndicatorCriteriaValue = styled.div.attrs({'data-widget': 'indicator-criteria-value'})`
	> div[data-widget=dropdown] {
		width        : 100%;
		border-color : var(--navigation-indicator-color);
		> div[data-widget=dropdown-options-container] {
			border-color : var(--navigation-indicator-color);
		}
	}
	> input {
		width        : 100%;
		font-size    : 1em;
		color        : var(--navigation-indicator-color);
		border-color : var(--navigation-indicator-color);
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
export const IndicatorCalculationNode = styled(NavigationBlock).attrs({'data-widget': 'indicator-calculation-node'})`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	&:before {
		background-color : var(--navigation-indicator-color);
	}
`;
export const IndicatorCalculationVariableName = styled.span.attrs<{ compact?: boolean }>(
	({compact = false}) => {
		return {
			'data-widget': 'indicator-calculation-variable-name',
			style: {
				paddingRight: compact ? 'calc(var(--margin) / 4)' : (void 0)
			}
		};
	})<{ compact?: boolean }>`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-variant : petite-caps;
`;
export const IndicatorCalculationValue = styled.span.attrs({'data-widget': 'indicator-calculation-value'})`
	display     : flex;
	position    : relative;
	align-items : center;
	color       : var(--navigation-indicator-value-color);
	font-weight : var(--font-bold);
`;
export const IndicatorCandidateRootNode = styled(IndicatorRootNode)`
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
export const IndicatorCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'indicator-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-indicator-color);
	}
`;
export const IndicatorCandidateCurve = styled(IndicatorCurve).attrs({
	'data-widget': 'indicator-candidate-curve'
})`
	> g > path {
		stroke : var(--navigation-candidate-color);
	}
`;
export const MoreIndicatorsContainer = styled.div.attrs({'data-widget': 'more-indicators-container'})`
	display   : flex;
	position  : relative;
	flex-grow : 1;
	flex-wrap : nowrap;
	&:not(:first-child) {
		margin-top : calc(var(--margin) / 2);
	}
`;
export const MoreIndicatorsColumn = styled(PaletteColumn).attrs({'data-widget': 'more-indicators-column'})`
	padding : 0 var(--margin);
	&:first-child {
		padding-left : 0;
	}
	&:last-child {
		padding-right : 0;
	}
`;
export const MoreIndicatorsNodeContainer = styled.div.attrs({'data-widget': 'more-indicators-node-container'})`
	display  : block;
	position : relative;
`;
export const MoreIndicatorsNode = styled(NavigationBlock).attrs({'data-widget': 'more-indicators-node'})`
	justify-content : center;
	width           : var(--header-height);
	min-width       : var(--header-height);
	height          : var(--header-height);
	padding         : 0;
	border-radius   : 100%;
	color           : var(--navigation-category-color);
	border-color    : var(--navigation-category-color);
	font-size       : 1.4em;
	cursor          : pointer;
	&:before {
		background-color : var(--navigation-category-color);
	}
`;
export const MoreIndicatorsCurve = styled(NavigationBlockPairCurve).attrs<{ rect: CurveRect }>({
	'data-widget': 'more-indicators-curve'
})<{ rect: CurveRect }>`
	> g > path {
		stroke : var(--navigation-category-color);
	}
`;
export const MissedDefinitionIcon = styled.span.attrs({'data-widget': 'missed-def-icon'})`
	color         : var(--danger-color);
	border-radius : 100%;
	margin-top    : 2px;
	z-index       : 1;
	cursor        : pointer;
	overflow      : hidden;
`;