import {BlockCoordinate, BlockFrame, BlockName} from '@/services/data/graphics/graphics-types';
import styled from 'styled-components';

export const TopicContainer = styled.g.attrs<{ coordinate: BlockCoordinate }>(({coordinate: {x, y}}) => {
	return {transform: `translate(${x}, ${y})`};
})<{ coordinate: BlockCoordinate }>``;

export const TopicBlock = styled.rect.attrs<{ frame: BlockFrame, dnd: boolean }>(
	({frame: {x, y, width, height}, dnd}) => {
		return {x, y, width, height, rx: 6, ry: 6, cursor: dnd ? 'move' : 'pointer'};
	})<{ frame: BlockFrame, dnd: boolean }>`
	stroke       : var(--primary-color);
	stroke-width : 2px;
	fill         : var(--invert-color);
`;

export const TopicNameText = styled.text.attrs<{ dnd: boolean, pos: BlockName }>(
	({dnd, pos: {x, y}}) => {
		return {x, y, cursor: dnd ? 'move' : 'pointer'};
	})<{ dnd: boolean, pos: BlockName }>`
	fill        : var(--font-color);
	text-anchor : middle;
	font-family : var(--title-font-family);
	font-size   : 1.2em;
	user-select : none;
`;
