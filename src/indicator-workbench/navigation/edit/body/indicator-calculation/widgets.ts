import styled from 'styled-components';
import {NavigationBlock} from '../widgets';

export const IndicatorCalculationNodeContainer = styled.div.attrs({'data-widget': 'indicator-calculation-node-container'})`
	display  : block;
	position : relative;
`;
export const IndicatorCalculationNode = styled(NavigationBlock).attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'indicator-calculation-node',
			style: {
				borderBottomLeftRadius: expanded ? 0 : (void 0),
				borderBottomRightRadius: expanded ? 0 : (void 0)
			}
		};
	})<{ expanded: boolean }>`
	border-color : var(--navigation-indicator-color);
	color        : var(--navigation-indicator-color);
	overflow     : visible;
	transition   : border-radius 300ms ease-in-out;
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
export const IndicatorCalculationFormulaContainer = styled.div.attrs<{ expanded: boolean }>(
	({expanded}) => {
		return {
			'data-widget': 'indicator-calculation-formula',
			style: {
				clipPath: expanded ? 'polygon(-1px 0, -1px calc(100% + 250px), calc(100% + 1px) calc(100% + 250px), calc(100% + 1px) 0)' : (void 0)
			}
		};
	})<{ expanded: boolean }>`
	display               : grid;
	position              : absolute;
	align-items           : center;
	grid-template-columns : auto 1fr;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-auto-rows        : minmax(calc(var(--header-height) - var(--border-width) * 2), auto);
	grid-row-gap          : calc(var(--border-width) * 2);
	min-height            : var(--header-height);
	top                   : calc(100% - var(--border-width) * 2);
	left                  : 0;
	width                 : 100%;
	min-width             : 600px;
	padding               : calc(var(--margin) / 4) var(--margin);
	border                : var(--border);
	border-width          : calc(var(--border-width) * 2);
	border-radius         : 0 0 calc(var(--border-radius) * 2) calc(var(--border-radius) * 2);
	border-color          : var(--navigation-indicator-color);
	color                 : var(--navigation-indicator-color);
	background-color      : var(--bg-color);
	font-size             : 1.2em;
	clip-path             : polygon(0 0, 0 0, 100% 0, 100% 0);
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
	> textarea {
		font-size : 1em;
		height    : calc(var(--height) * 5);
		color     : var(--navigation-indicator-color);
		&::placeholder {
			opacity : 0.5;
		}
	}
`;
export const IndicatorCalculationFormulaLabel = styled.span.attrs({'data-widget': 'indicator-calculation-aggregation-label'})`
	display      : flex;
	position     : relative;
	align-items  : center;
	font-variant : petite-caps;
`;