import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import styled from 'styled-components';

export const Container = styled.g.attrs<{ visible: boolean }>(({visible}) => {
	return {style: {display: visible ? 'block' : 'none'}};
})<{ visible: boolean }>``;

export const Rect = styled.rect.attrs<{ rect: GraphicsPosition & GraphicsSize }>(
	({rect: {x, y, width, height}}) => {
		return {x, y, rx: 8, ry: 8, width, height};
	})<{ rect: GraphicsPosition & GraphicsSize }>`
	stroke           : var(--waive-color);
	stroke-width     : 2px;
	stroke-dasharray : 3px 3px;
	fill             : transparent;
	z-index          : -1;
	pointer-events   : none;
`;
