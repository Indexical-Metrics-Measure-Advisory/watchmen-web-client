import {BlockCoordinate, BlockFrame, BlockName} from '@/services/data/graphics/graphics-types';
import {TopicKind, TopicType} from '@/services/data/tuples/topic-types';
import styled from 'styled-components';

const STROKES: Record<TopicType, string> = {
	[TopicType.DISTINCT]: 'var(--distinct-topic-color)',
	[TopicType.META]: 'var(--meta-topic-color)',
	[TopicType.RAW]: 'var(--raw-topic-color)',
	[TopicType.TIME]: 'var(--time-topic-color)',
	[TopicType.AGGREGATE]: 'var(--aggregate-topic-color)',
	[TopicType.RATIO]: 'var(--ratio-topic-color)'
};
export const TopicContainer = styled.g.attrs<{ coordinate: BlockCoordinate }>(({coordinate: {x, y}}) => {
	return {transform: `translate(${x}, ${y})`};
})<{ coordinate: BlockCoordinate }>``;

export const TopicBlock = styled.rect.attrs<{ frame: BlockFrame, dnd: boolean, topicType: TopicType, topicKind: TopicKind }>(
	({frame: {x, y, width, height}, dnd, topicType, topicKind}) => {
		return {
			x, y, width, height, rx: 6, ry: 6,
			cursor: dnd ? 'move' : 'pointer',
			style: {
				stroke: STROKES[topicType],
				strokeDasharray: topicKind === TopicKind.SYSTEM ? '4 6' : (void 0),
				strokeLinecap: topicKind === TopicKind.SYSTEM ? 'round' : (void 0)
			}
		};
	})<{ frame: BlockFrame, dnd: boolean, topicType: TopicType, topicKind: TopicKind }>`
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
