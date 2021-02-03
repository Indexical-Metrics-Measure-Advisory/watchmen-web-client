import styled from 'styled-components';
import { TopicCoordinate, TopicFrame, TopicName } from '../types';

export const TopicContainer = styled.g.attrs<{ coordinate: TopicCoordinate }>(({ coordinate: { x, y } }) => {
	return { transform: `translate(${x}, ${y})` };
})<{ coordinate: TopicCoordinate }>``;

export const TopicBlock = styled.rect.attrs<{ frame: TopicFrame, dnd: boolean }>(
	({ frame: { x, y, width, height }, dnd }) => {
		return { x, y, width, height, rx: 6, ry: 6, cursor: dnd ? 'move' : 'pointer' };
	})<{ frame: TopicFrame, dnd: boolean }>`
	stroke       : var(--success-color);
	stroke-width : 2px;
	fill         : var(--invert-color);
`;

export const TopicNameText = styled.text.attrs<{ dnd: boolean, pos: TopicName }>(
	({ dnd, pos: { x, y } }) => {
		return { x, y, cursor: dnd ? 'move' : 'pointer' };
	})<{ dnd: boolean, pos: TopicName }>`
	fill        : var(--font-color);
	text-anchor : middle;
	font-family : var(--title-font-family);
	font-size   : 1.2em;
	user-select : none;
`;
