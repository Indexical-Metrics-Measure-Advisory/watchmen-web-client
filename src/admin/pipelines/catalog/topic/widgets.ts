import styled from 'styled-components';
import { BlockCoordinate, BlockFrame, BlockName } from '../../../../services/graphics/graphics-types';
import { TopicType } from '../../../../services/tuples/topic-types';

const STROKES: { [key in TopicType]: string } = {
	[TopicType.SYSTEM]: 'var(--system-topic-color)',
	[TopicType.DISTINCT]: 'var(--distinct-topic-color)',
	[TopicType.RAW]: 'var(--raw-topic-color)',
	[TopicType.TIME]: 'var(--time-topic-color)',
	[TopicType.AGGREGATE]: 'var(--aggregate-topic-color)',
	[TopicType.RATIO]: 'var(--ratio-topic-color)'
};
export const TopicContainer = styled.g.attrs<{ coordinate: BlockCoordinate }>(({ coordinate: { x, y } }) => {
	return { transform: `translate(${x}, ${y})` };
})<{ coordinate: BlockCoordinate }>``;

export const TopicBlock = styled.rect.attrs<{ frame: BlockFrame, dnd: boolean, topicType: TopicType }>(
	({ frame: { x, y, width, height }, dnd, topicType }) => {
		return {
			x, y, width, height, rx: 6, ry: 6,
			cursor: dnd ? 'move' : 'pointer',
			style: {
				stroke: STROKES[topicType]
			}
		};
	})<{ frame: BlockFrame, dnd: boolean, topicType: TopicType }>`
	stroke       : var(--primary-color);
	stroke-width : 2px;
	fill         : var(--invert-color);
`;

export const TopicNameText = styled.text.attrs<{ dnd: boolean, pos: BlockName }>(
	({ dnd, pos: { x, y } }) => {
		return { x, y, cursor: dnd ? 'move' : 'pointer' };
	})<{ dnd: boolean, pos: BlockName }>`
	fill        : var(--font-color);
	text-anchor : middle;
	font-family : var(--title-font-family);
	font-size   : 1.2em;
	user-select : none;
`;
