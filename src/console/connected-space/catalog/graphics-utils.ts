import { Topic } from '../../../services/tuples/topic-types';
import {
	BLOCK_FULL_PADDING_HORIZONTAL,
	BLOCK_FULL_PADDING_VERTICAL,
	BLOCK_GAP_VERTICAL,
	BLOCK_HEIGHT_MIN,
	BLOCK_LEFT_INIT,
	BLOCK_NAME_OFFSET_Y,
	BLOCK_TOP_INIT,
	BLOCK_WIDTH_MIN
} from './constants';
import { ConnectedSpaceGraphics, GraphicsRole, TopicFrame, TopicGraphics } from './types';

export const createInitGraphics = (topics: Array<Topic>): ConnectedSpaceGraphics => {
	return {
		topics: topics.map(topic => {
			return {
				topic,
				rect: {
					coordinate: { x: 0, y: 0 },
					frame: { x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN },
					name: { x: BLOCK_WIDTH_MIN / 2, y: BLOCK_HEIGHT_MIN / 2 }
				}
			};
		})
		// topicRelations: topicRelations.map(relation => {
		// 	return {
		// 		relation,
		// 		points: { drawn: 'M0,0 L0,0' }
		// 	};
		// }),
		// topicSelection: {
		// 	visible: false,
		// 	rect: { x: 0, y: 0, width: 0, height: 0 }
		// }
	};
};

export const asTopicGraphicsMap = (graphics: ConnectedSpaceGraphics) => {
	return graphics.topics.reduce((map, topic) => {
		map.set(topic.topic.topicId, topic);
		return map;
	}, new Map<string, TopicGraphics>());
};

/** topic frame size */
export const computeTopicFrameSize = (topicNameRect: DOMRect) => {
	return {
		width: Math.max(topicNameRect.width + BLOCK_FULL_PADDING_HORIZONTAL, BLOCK_WIDTH_MIN),
		height: topicNameRect.height + BLOCK_FULL_PADDING_VERTICAL
	};
};
/** topic name position relative to topic rect */
export const computeTopicNamePosition = (topicFrame: TopicFrame) => {
	return { x: topicFrame.width / 2, y: topicFrame.height / 2 + BLOCK_NAME_OFFSET_Y };
};

export const computeGraphics = (options: {
	graphics: ConnectedSpaceGraphics;
	repaint: () => void;
	svg: SVGSVGElement;
}) => {
	const { graphics, repaint, svg } = options;

	// compute topic size
	const topicMap: Map<string, TopicGraphics> = asTopicGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.TOPIC}]`)).forEach(topicRect => {
		const topicId = topicRect.getAttribute('data-topic-id')!;
		const name = topicRect.querySelector(`text[data-role='${GraphicsRole.TOPIC_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = topicMap.get(topicId)!.rect;
		rect.frame = { ...rect.frame, ...computeTopicFrameSize(nameRect) };
		rect.name = computeTopicNamePosition(rect.frame);
	});
	Array.from(topicMap.values())
		.sort((t1, t2) => t1.topic.name.toLowerCase().localeCompare(t2.topic.name.toLowerCase()))
		.reduce((top, topicGraphics) => {
			topicGraphics.rect.coordinate = { x: BLOCK_LEFT_INIT, y: top };
			top += topicGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
			return top;
		}, BLOCK_TOP_INIT);

	// compute topic relations
	// graphics.topicRelations.forEach(relation => {
	// 	const { relation: { sourceTopicId, targetTopicId } } = relation;
	// 	relation.points = computeTopicRelationPoints({ graphics, sourceTopicId, targetTopicId });
	// });
	repaint();
};
