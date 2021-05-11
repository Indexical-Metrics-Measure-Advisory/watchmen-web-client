import styled from 'styled-components';
import {DROPDOWN_Z_INDEX} from '../constants';
import {ButtonInk} from '../types';
import {PALETTE_WIDTH} from './constants';
import {IndicatorState, State} from './types';

export const ColorPickerContainer = styled.div.attrs<{ 'data-widget'?: string, active: boolean, atBottom: boolean }>(
	({'data-widget': widget, active, atBottom}) => {
		return {
			'data-widget': widget || 'color-picker',
			style: {
				borderTopLeftRadius: (active && !atBottom) ? 0 : (void 0),
				borderTopRightRadius: (active && !atBottom) ? 0 : (void 0),
				borderBottomLeftRadius: (active && atBottom) ? 0 : (void 0),
				borderBottomRightRadius: (active && atBottom) ? 0 : (void 0)
			}
		};
	})<{ active: boolean, atBottom: boolean }>`
	display          : flex;
	position         : relative;
	align-items      : center;
	padding          : 0 var(--input-indent);
	outline          : none;
	appearance       : none;
	border           : var(--border);
	border-radius    : var(--border-radius);
	height           : var(--height);
	background-color : transparent;
	transition       : all 300ms ease-in-out;
	cursor           : pointer;
	width            : 100%;
`;
export const ColorBar = styled.div.attrs<{ color: string }>(({color}) => {
	return {
		'data-widget': 'color-bar',
		style: {backgroundColor: color}
	};
})<{ color: string }>`
	display       : block;
	flex-grow     : 1;
	align-self    : center;
	justify-self  : stretch;
	height        : 50%;
	border-radius : calc(var(--border-radius) * 2);
`;
export const ColorDropdownContainer = styled.div.attrs<State>(
	({active, atBottom, top, left, height}) => {
		return {
			'data-widget': 'color-picker-dropdown',
			style: {
				opacity: active ? 1 : (void 0),
				pointerEvents: active ? 'auto' : (void 0),
				top: atBottom ? (top + height) : (void 0),
				bottom: atBottom ? (void 0) : `calc(100vh - ${top}px)`,
				left,
				borderTopLeftRadius: atBottom ? 0 : 'var(--border-radius)',
				borderTopRightRadius: atBottom ? 0 : 'var(--border-radius)',
				borderBottomLeftRadius: atBottom ? 'var(--border-radius)' : 0,
				borderBottomRightRadius: atBottom ? 'var(--border-radius)' : 0
			}
		};
	})<State>`
	display               : grid;
	position              : fixed;
	grid-template-columns : var(--margin) ${PALETTE_WIDTH}px;
	grid-column-gap       : calc(var(--margin) / 2);
	grid-row-gap          : calc(var(--margin) / 4);
	padding               : 0 calc(var(--margin) / 2);
	width                 : 200px;
	background-color      : var(--bg-color);
	border                : var(--border);
	cursor                : default;
	transition            : opacity 300ms ease-in-out;
	z-index               : ${DROPDOWN_Z_INDEX};
	opacity               : 0;
	pointer-events        : none;
`;
export const ColorOverviewContainer = styled.div.attrs<{ color: string }>(({color}) => {
	return {
		'data-widget': 'color-picker-select',
		style: {
			backgroundColor: color || 'red'
		}
	};
})<{ color: string }>`
	display      : block;
	position     : relative;
	grid-column  : 1 / span 2;
	justify-self : stretch;
	height       : ${PALETTE_WIDTH}px;
	margin       : 4px calc(var(--margin) / -2 + 6px) calc(var(--margin) / 4) calc(var(--margin) / -2 + 4px);
	cursor       : crosshair;
	overflow     : hidden;
	background   : linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), linear-gradient(to left, rgba(0, 0, 0, 0), rgba(255, 255, 255, 1));
`;
export const ColorIndicator = styled.div.attrs<IndicatorState>(({x, y}) => {
	return {
		'data-widget': 'color-picker-indicator',
		style: {transform: `translate(${x}px, ${y}px)`}
	};
})<IndicatorState>`
	position      : relative;
	left          : -6px;
	top           : -6px;
	width         : 12px;
	height        : 12px;
	border-radius : 50%;
	border        : 1px solid white;
`;
export const ColorPreviewContainer = styled.div.attrs<{ color: string }>(({color}) => {
	return {
		'data-widget': 'color-picker-preview',
		style: {
			background: `linear-gradient(${color}, ${color}) 0 0 / cover, linear-gradient(45deg, rgba(0,0,0,0.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,0.25) 0) 0 0 / 12px 12px, linear-gradient(45deg, rgba(0,0,0,0.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,0.25) 0) 6px 6px / 12px 12px`
		}
	};
})<{ color: string }>`
	grid-row      : 2 / span 2;
	align-self    : center;
	height        : var(--margin);
	border-radius : 100%;
	border        : 1px solid #EEEEEE;
`;
const ColorPaletteContainer = styled.div.attrs({'data-widget': 'color-picker-palette'})`
	position      : relative;
	justify-self  : stretch;
	background    : darkblue;
	height        : 12px;
	border-radius : 1px;
	cursor        : pointer;
`;
export const HueColorPalette = styled(ColorPaletteContainer)`
	background : linear-gradient(to left, hsl(0, 100%, 50%) 0%, hsl(30, 100%, 50%) 8.33%, hsl(60, 100%, 50%) 16.67%, hsl(90, 100%, 50%) 25%, hsl(120, 100%, 50%) 33.33%, hsl(150, 100%, 50%) 41.67%, hsl(180, 100%, 50%) 50%, hsl(210, 100%, 50%) 58.33%, hsl(240, 100%, 50%) 66.67%, hsl(270, 100%, 50%) 75%, hsl(300, 100%, 50%) 83.33%, hsl(330, 100%, 50%) 91.67%, hsl(0, 100%, 50%) 100%);
`;
export const AlphaColorPalette = styled(ColorPaletteContainer).attrs<{ color: string }>(({color}) => {
	return {
		'data-widget': 'color-picker-palette',
		style: {
			background: `linear-gradient(to right, rgba(0,0,0,0), ${color}) 0 0 / cover, linear-gradient(45deg, rgba(0,0,0,0.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,0.25) 0) 0 0 / 12px 12px, linear-gradient(45deg, rgba(0,0,0,0.25) 25%, transparent 0, transparent 75%, rgba(0,0,0,0.25) 0) 6px 6px / 12px 12px`
		}
	};
})<{ color: string }>`
	grid-column : 2;
`;
export const ColorSlider = styled.div.attrs<{ x: number }>(({x}) => {
	return {
		'data-widget': 'color-picker-slider',
		style: {transform: `translateX(${x}px)`}
	};
})<{ x: number }>`
	position      : relative;
	left          : -8px;
	top           : -2px;
	width         : 16px;
	height        : 16px;
	border-radius : 50%;
	background    : var(--bg-color);
	filter        : drop-shadow(2px 2px 3px rgba(0, 0, 0, .2));
`;
export const ColorResult = styled.h5.attrs({'data-widget': 'color-picker-result'})`
	display     : flex;
	align-items : center;
	font-weight : normal;
	grid-column : 1 / span 2;
	&:not(:last-child) {
		margin-top : calc(var(--margin) / 4);
	}
	> span:first-child {
		font-family  : var(--title-font-family);
		font-weight  : var(--font-demi-bold);
		margin-right : calc(var(--margin) / 4);
		min-width    : var(--margin);
	}
`;
export const ColorButtons = styled.div.attrs({'data-widget': 'color-picker-buttons'})`
	display         : flex;
	justify-content : flex-end;
	grid-column     : 1 / span 2;
	margin-right    : calc(var(--margin) / -4);
	margin-bottom   : calc(var(--margin) / 8);
`;
export const ColorConfirmButton = styled.div.attrs<{ ink: ButtonInk }>(({ink}) => {
	return {
		'data-widget': 'color-picker-button',
		style: {
			backgroundColor: ink === ButtonInk.PRIMARY ? 'var(--primary-color)' : 'var(--danger-color)'
		}
	};
})<{ ink: ButtonInk }>`
	display       : flex;
	align-items   : center;
	height        : var(--button-height-in-form);
	padding       : 0 calc(var(--margin) / 2);
	margin-left   : calc(var(--margin) / 4);
	border-radius : var(--border-radius);
	color         : var(--invert-color);
	font-variant  : petite-caps;
	cursor        : pointer;
	transition    : box-shadow 300ms ease-in-out;
	&:hover {
		box-shadow : ${({ink}) => ink === ButtonInk.PRIMARY ? 'var(--primary-hover-shadow)' : 'var(--danger-hover-shadow)'};
	}
`;