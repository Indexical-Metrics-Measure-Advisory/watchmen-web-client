import styled from 'styled-components';

export const GridScrollVerticalShade = styled.div
	.attrs<{ width: number, heightOffset: number, visible: boolean }>(
		({width, heightOffset, visible}) => {
			return {
				'data-widget': 'scroll-shade-vertical',
				style: {
					width,
					height: `calc(100% - ${heightOffset}px)`,
					display: visible ? 'block' : 'none'
				}
			};
		})<{ width: number, heightOffset: number, visible: boolean }>`
	position   : absolute;
	top        : 0;
	right      : 0;
	height     : 100%;
	z-index    : 15;
	overflow-x : hidden;
	overflow-y : scroll;
`;

export const GridScrollHorizontalShade = styled.div
	.attrs<{ left: number, height: number, widthOffset: number, visible: boolean }>(
		({left, height, widthOffset, visible}) => {
			return {
				'data-widget': 'scroll-shade-horizontal',
				style: {
					display: visible ? 'block' : 'none',
					left,
					width: `calc(100% - ${left}px - ${widthOffset}px)`,
					height
				}
			};
		})<{ left: number, height: number, widthOffset: number, visible: boolean }>`
	position   : absolute;
	bottom     : 0;
	left       : 0;
	z-index    : 15;
	overflow-y : hidden;
	overflow-x : scroll;
`;
export const GridBottomLeftPaster = styled.div.attrs<{ visible: boolean, width: number, height: number }>(
	({visible, width, height}) => {
		return {
			'data-widget': 'grid-shade-bottom-left-paster',
			style: {display: visible ? 'block' : 'none', width, height}
		};
	})<{ visible: boolean, width: number, height: number }>`
	position         : absolute;
	bottom           : 0;
	left             : 0;
	border-top       : var(--border);
	background-color : var(--bg-color);
`;
export const GridBottomRightPaster = styled.div.attrs<{ visible: boolean, width: number, height: number }>(
	({visible, width, height}) => {
		return {
			'data-widget': 'grid-shade-bottom-right-paster',
			style: {display: visible ? 'block' : 'none', width, height}
		};
	})<{ visible: boolean, width: number, height: number }>`
	position         : absolute;
	bottom           : 0;
	right            : 0;
	background-color : var(--bg-color);
`;