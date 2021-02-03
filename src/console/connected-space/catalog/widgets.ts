import styled from 'styled-components';
import { GraphicsSize } from './types';

export const CatalogContainer = styled.div.attrs({ 'data-widget': 'connected-space-catalog' })`
	display          : flex;
	position         : relative;
	flex-grow        : 1;
	background-image : radial-gradient(var(--waive-color) 1px, transparent 0);
	background-size  : 48px 48px;
	overflow         : hidden;
`;
export const CatalogSvgContainer = styled.div.attrs({
	'data-widget': 'connected-space-catalog-svg-container',
	'data-v-scroll': '',
	'data-h-scroll': ''
})`
	display   : block;
	position  : relative;
	flex-grow : 1;
	overflow  : scroll;
`;
export const CatalogSvgWrapper = styled.div.attrs<Partial<GraphicsSize>>(
	({ width, height }) => {
		return {
			'data-widget': 'connected-space-catalog-svg-wrapper',
			style: { width, height }
		};
	})<Partial<GraphicsSize>>`
	display    : flex;
	position   : relative;
	min-width  : 100%;
	min-height : 100%;
`;
export const CatalogSvg = styled.svg.attrs({ 'data-widget': 'connected-space-catalog-svg' })`
	display   : block;
	flex-grow : 1;
`;
