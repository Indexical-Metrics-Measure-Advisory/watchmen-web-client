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
	grid-template-columns : auto auto auto;
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
export const NavigationBlockPairLine = styled.span.attrs<{ error?: boolean; warn?: boolean }>(
	({error, warn}) => {
		return {
			'data-error': error ? 'true' : (void 0),
			'data-warn': warn ? 'true' : (void 0)
		};
	})<{ error?: boolean; warn?: boolean }>`
	&[data-warn=true] {
		background-color : var(--warn-color);
	}
	&[data-error=true] {
		background-color : var(--danger-color);
	}
`;

export const NavigationRootNode = styled(NavigationBlock).attrs({'data-widget': 'navigation-root-node'})`
	flex-direction : column;
	border-color   : var(--navigation-root-color);
	color          : var(--navigation-root-color);
	&:before {
		background-color : var(--navigation-root-color);
	}
	> div {
		display         : flex;
		position        : relative;
		align-items     : center;
		justify-content : center;
		min-height      : var(--height);
		width           : 100%;
		font-weight     : var(--font-bold);
	}
`;
export const IndicatorPartRelationLine = styled(NavigationBlockPairLine).attrs({'data-widget': 'indicator-part-relation-line'})`
	display          : block;
	position         : relative;
	width            : 64px;
	height           : 2px;
	background-color : var(--navigation-indicator-color);
	opacity          : 0.5;
`;
// export const MissedDefinitionIcon = styled.span.attrs({'data-widget': 'missed-def-icon'})`
// 	color         : var(--danger-color);
// 	border-radius : 100%;
// 	margin-top    : 2px;
// 	z-index       : 1;
// 	cursor        : pointer;
// 	overflow      : hidden;
// `;