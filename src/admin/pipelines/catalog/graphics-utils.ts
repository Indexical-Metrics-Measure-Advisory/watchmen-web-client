import { BLOCK_GAP_HORIZONTAL } from '../../../console/connected-space/catalog/constants';
import { BlockFrame } from '../../../services/graphics/graphics-types';
import {
	PipelineBlockGraphics,
	PipelineBlockGraphicsRect,
	PipelinesGraphics,
	TopicGraphics
} from '../../../services/tuples/pipeline-types';
import { Topic, TopicType } from '../../../services/tuples/topic-types';
import {
	BLOCK_FULL_PADDING_HORIZONTAL,
	BLOCK_FULL_PADDING_VERTICAL,
	BLOCK_GAP_VERTICAL,
	BLOCK_HEIGHT_MIN,
	BLOCK_MARGIN_HORIZONTAL,
	BLOCK_MARGIN_VERTICAL,
	BLOCK_NAME_OFFSET_Y,
	BLOCK_WIDTH_MIN,
	SELECTION_FULL_GAP,
	SELECTION_GAP
} from './constants';
import { AssembledPipelinesGraphics, AssembledTopicGraphics, GraphicsRole, RelationCurvePoints } from './types';

const dependRectData = (rect: PipelineBlockGraphicsRect): PipelineBlockGraphicsRect => {
	const {
		coordinate: { x: coordinateX = 0, y: coordinateY = 0 } = { x: 0, y: 0 },
		frame: {
			x: frameX = 0,
			y: frameY = 0,
			width: frameWidth = BLOCK_WIDTH_MIN,
			height: frameHeight = BLOCK_HEIGHT_MIN
		} = { x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN },
		name: { x: nameX = BLOCK_WIDTH_MIN / 2, y: nameY = BLOCK_HEIGHT_MIN / 2 } = {
			x: BLOCK_WIDTH_MIN / 2,
			y: BLOCK_HEIGHT_MIN / 2
		}
	} = rect;
	return {
		coordinate: { x: coordinateX, y: coordinateY },
		frame: { x: frameX, y: frameY, width: frameWidth, height: frameHeight },
		name: { x: nameX, y: nameY }
	};
};

export const createInitGraphics = (options: {
	topics: Array<Topic>;
	graphics?: PipelinesGraphics
}): AssembledPipelinesGraphics => {
	const {
		topics,
		graphics: { topics: topicGraphics = [] } = { topics: [] }
	} = options;

	const topicGraphicsMap: Map<string, TopicGraphics> = topicGraphics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, TopicGraphics>());

	return {
		topics: topics.map(topic => {
			const graphics = topicGraphicsMap.get(topic.topicId);
			return graphics && graphics.rect ? {
				topic,
				rect: dependRectData(JSON.parse(JSON.stringify(graphics.rect)))
			} : {
				topic,
				rect: {
					coordinate: { x: 0, y: 0 },
					frame: { x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN },
					name: { x: BLOCK_WIDTH_MIN / 2, y: BLOCK_HEIGHT_MIN / 2 }
				}
			};
		})
	};
};

export const asTopicGraphicsMap = (graphics: AssembledPipelinesGraphics) => {
	return graphics.topics.reduce((map, topicGraphics) => {
		map.set(topicGraphics.topic.topicId, topicGraphics);
		return map;
	}, new Map<string, AssembledTopicGraphics>());
};

/** topic frame size */
export const computeBlockFrameSize = (nameRect: DOMRect) => {
	return {
		width: Math.max(nameRect.width + BLOCK_FULL_PADDING_HORIZONTAL, BLOCK_WIDTH_MIN),
		height: nameRect.height + BLOCK_FULL_PADDING_VERTICAL
	};
};
/** topic name position relative to topic rect */
export const computeBlockNamePosition = (frame: BlockFrame) => {
	return { x: frame.width / 2, y: frame.height / 2 + BLOCK_NAME_OFFSET_Y };
};

const computeTopicsGraphics = (graphics: AssembledPipelinesGraphics, svg: SVGSVGElement) => {
	// compute topic size
	const topicMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.TOPIC}]`)).forEach(topicRect => {
		const topicId = topicRect.getAttribute('data-topic-id')!;
		const name = topicRect.querySelector(`text[data-role='${GraphicsRole.TOPIC_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = topicMap.get(topicId)!.rect;
		rect.frame = { ...rect.frame, ...computeBlockFrameSize(nameRect) };
		rect.name = computeBlockNamePosition(rect.frame);
	});
	const allTopics = Array.from(topicMap.values());
	const rawTopics = allTopics.filter(({ topic }) => topic.type === TopicType.RAW);
	const distinctTopics = allTopics.filter(({ topic }) => topic.type === TopicType.DISTINCT);
	const aggregateTopics = allTopics.filter(({ topic }) => topic.type === TopicType.AGGREGATE);
	const timeTopics = allTopics.filter(({ topic }) => topic.type === TopicType.TIME);
	const ratioTopics = allTopics.filter(({ topic }) => topic.type === TopicType.RATIO);
	const systemTopics = allTopics.filter(({ topic }) => topic.type === TopicType.SYSTEM);

	const replace = (topics: Array<AssembledTopicGraphics>, leftX: number) => {
		topics.filter(graphics => graphics.rect.coordinate.x === 0)
			.sort((t1, t2) => t1.topic.name.toLowerCase().localeCompare(t2.topic.name.toLowerCase()))
			.reduce((top, topicGraphics) => {
				topicGraphics.rect.coordinate = { x: leftX, y: top };
				top += topicGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
				return top;
			}, BLOCK_MARGIN_VERTICAL);
	};
	replace(rawTopics, BLOCK_MARGIN_HORIZONTAL);
	replace(distinctTopics, rawTopics.reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(aggregateTopics, [ ...rawTopics, ...distinctTopics ].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(timeTopics, [ ...rawTopics, ...distinctTopics, ...aggregateTopics ].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(ratioTopics, [ ...rawTopics, ...distinctTopics, ...aggregateTopics, ...timeTopics ].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(systemTopics, [ ...rawTopics, ...distinctTopics, ...aggregateTopics, ...timeTopics, ...ratioTopics ].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);

	return topicMap;
};

export const computeGraphics = (options: {
	graphics: AssembledPipelinesGraphics;
	svg: SVGSVGElement;
}) => {
	const { graphics, svg } = options;
	computeTopicsGraphics(graphics, svg);
	const { width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
	const { width, height } = [ ...graphics.topics ].reduce<{ width: number, height: number }>(
		(size, frameGraphics) => {
			const { coordinate: { x, y }, frame: { width, height } } = frameGraphics.rect;
			return { width: Math.max(size.width, x + width), height: Math.max(size.height, y + height) };
		}, { width: svgWidth - BLOCK_MARGIN_HORIZONTAL, height: svgHeight - BLOCK_MARGIN_VERTICAL });
	return { width: width + BLOCK_MARGIN_HORIZONTAL, height: height + BLOCK_MARGIN_VERTICAL };
};

export const computeTopicSelection = (options: { topicId: string; graphics: AssembledPipelinesGraphics }) => {
	const { graphics, topicId } = options;

	// eslint-disable-next-line
	const topicGraphics = graphics.topics.find(({ topic }) => topic.topicId == topicId)!;
	return {
		x: topicGraphics.rect.coordinate.x - SELECTION_GAP,
		y: topicGraphics.rect.coordinate.y - SELECTION_GAP,
		width: topicGraphics.rect.frame.width + SELECTION_FULL_GAP,
		height: topicGraphics.rect.frame.height + SELECTION_FULL_GAP
	};
};

const computeFramePoints = (frameGraphics: PipelineBlockGraphics) => {
	const { rect: { coordinate, frame } } = frameGraphics;
	return {
		top: { x: coordinate.x + frame.x + frame.width / 2, y: coordinate.y + frame.y },
		right: { x: coordinate.x + frame.x + frame.width, y: coordinate.y + frame.y + frame.height / 2 },
		bottom: { x: coordinate.x + frame.x + frame.width / 2, y: coordinate.y + frame.y + frame.height },
		left: { x: coordinate.x + frame.x, y: coordinate.y + frame.y + frame.height / 2 }
	};
};

export const computeRelationPoints = (options: { source: PipelineBlockGraphics; target: PipelineBlockGraphics; }): RelationCurvePoints => {
	const { source, target } = options;

	// to find the start and end point position
	const sourcePoints = computeFramePoints(source);
	const targetPoints = computeFramePoints(target);

	let drawn = `M${sourcePoints.top.x},${(sourcePoints.top.y + sourcePoints.bottom.y) / 2} L${targetPoints.top.x},${(targetPoints.top.y + targetPoints.bottom.y) / 2}`;
	// noinspection DuplicatedCode
	switch (true) {
		case targetPoints.left.x - sourcePoints.right.x <= 200 && targetPoints.left.x - sourcePoints.right.x >= 0:
			// target on right of source, no overlap, small distance
			switch (true) {
				case  sourcePoints.bottom.y <= targetPoints.top.y:
					// target on bottom right, no overlap
					drawn = `M${sourcePoints.bottom.x},${sourcePoints.bottom.y} Q${sourcePoints.bottom.x},${targetPoints.left.y} ${targetPoints.left.x},${targetPoints.left.y}`;
					break;
				case sourcePoints.top.y >= targetPoints.bottom.y:
					// target on bottom top, no overlap
					drawn = `M${sourcePoints.top.x},${sourcePoints.top.y} Q${sourcePoints.top.x},${targetPoints.left.y} ${targetPoints.left.x},${targetPoints.left.y}`;
					break;
				default:
					// vertical has overlap
					drawn = `M${sourcePoints.right.x},${sourcePoints.right.y} L${targetPoints.left.x},${targetPoints.left.y}`;
			}
			break;
		case targetPoints.left.x - sourcePoints.right.x > 200:
			// target on right of source, no overlap, large distance
			switch (true) {
				case sourcePoints.bottom.y <= targetPoints.top.y:
				case sourcePoints.top.y >= targetPoints.bottom.y:
					// target on bottom/top right, no overlap
					drawn = [
						`M${sourcePoints.right.x},${sourcePoints.right.y}`,
						`C${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 6},${sourcePoints.right.y}`,
						`${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 3},${sourcePoints.right.y}`,
						`${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 2},${(sourcePoints.right.y + targetPoints.left.y) / 2}`,
						`C${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 3 * 2},${targetPoints.left.y}`,
						`${sourcePoints.right.x + (targetPoints.left.x - sourcePoints.right.x) / 6 * 5},${targetPoints.left.y}`,
						`${targetPoints.left.x},${targetPoints.left.y}`
					].join(' ');
					break;
				default:
					// vertical has overlap
					drawn = `M${sourcePoints.right.x},${sourcePoints.right.y} L${targetPoints.left.x},${targetPoints.left.y}`;
			}
			break;
		case sourcePoints.left.x - targetPoints.right.x <= 200 && sourcePoints.left.x - targetPoints.right.x >= 0:
			// target on left of source, no overlap, small distance
			switch (true) {
				case  sourcePoints.bottom.y <= targetPoints.top.y:
					// target on bottom left, no overlap
					drawn = `M${sourcePoints.bottom.x},${sourcePoints.bottom.y} Q${sourcePoints.bottom.x},${targetPoints.right.y} ${targetPoints.right.x},${targetPoints.right.y}`;
					break;
				case sourcePoints.top.y >= targetPoints.bottom.y:
					// target on bottom top, no overlap
					drawn = `M${sourcePoints.top.x},${sourcePoints.top.y} Q${sourcePoints.top.x},${targetPoints.right.y} ${targetPoints.right.x},${targetPoints.right.y}`;
					break;
				default:
					// vertical has overlap
					drawn = `M${sourcePoints.left.x},${sourcePoints.left.y} L${targetPoints.right.x},${targetPoints.right.y}`;
			}
			break;
		case sourcePoints.left.x - targetPoints.right.x > 200:
			// target on left of source, no overlap, large distance
			switch (true) {
				case sourcePoints.bottom.y <= targetPoints.top.y:
				case sourcePoints.top.y >= targetPoints.bottom.y:
					// target on bottom/top right, no overlap
					drawn = [
						`M${sourcePoints.left.x},${sourcePoints.left.y}`,
						`C${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 6 * 5},${sourcePoints.left.y}`,
						`${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 3 * 2},${sourcePoints.left.y}`,
						`${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 2},${(sourcePoints.left.y + targetPoints.right.y) / 2}`,
						`C${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 3},${targetPoints.right.y}`,
						`${targetPoints.right.x + (sourcePoints.left.x - targetPoints.right.x) / 6},${targetPoints.right.y}`,
						`${targetPoints.right.x},${targetPoints.right.y}`
					].join(' ');
					break;
				default:
					// vertical has overlap
					drawn = `M${sourcePoints.left.x},${sourcePoints.left.y} L${targetPoints.right.x},${targetPoints.right.y}`;
			}
			break;
		case targetPoints.top.y - sourcePoints.bottom.y <= 100 && targetPoints.top.y - sourcePoints.bottom.y >= 0:
		case sourcePoints.top.y - targetPoints.bottom.y <= 100 && sourcePoints.top.y - targetPoints.bottom.y >= 0:
			// target on top/bottom of source, has horizontal overlap and no vertical overlap, small distance
			const controlX = Math.min(sourcePoints.left.x, targetPoints.left.x) - 150;
			let useRightSide = false;
			if (controlX <= 5) {
				useRightSide = true;
			}
			if (useRightSide) {
				drawn = [
					`M${sourcePoints.right.x},${sourcePoints.right.y}`,
					`Q${Math.min(sourcePoints.right.x, targetPoints.right.x) + 150},${(sourcePoints.right.y + targetPoints.right.y) / 2}`,
					`${targetPoints.right.x},${targetPoints.right.y}`
				].join(' ');
			} else {
				drawn = [
					`M${sourcePoints.left.x},${sourcePoints.left.y}`,
					`Q${controlX},${(sourcePoints.left.y + targetPoints.left.y) / 2}`,
					`${targetPoints.left.x},${targetPoints.left.y}`
				].join(' ');
			}
			break;
		case targetPoints.top.y - sourcePoints.bottom.y > 100:
			// target on top of source, has horizontal overlap and no vertical overlap, large distance
			drawn = `M${sourcePoints.bottom.x},${sourcePoints.bottom.y} L${targetPoints.top.x},${targetPoints.top.y}`;
			break;
		case sourcePoints.top.y - targetPoints.bottom.y > 100:
			// target on bottom of source, has horizontal overlap and no vertical overlap, large distance
			drawn = `M${sourcePoints.top.x},${sourcePoints.top.y} L${targetPoints.bottom.x},${targetPoints.bottom.y}`;
			break;
		case targetPoints.top.y >= sourcePoints.top.y:
			// overlap anyway
			drawn = [
				`M${sourcePoints.top.x},${sourcePoints.top.y}`,
				`C${sourcePoints.top.x - 300},${sourcePoints.top.y - 300}`,
				`${targetPoints.bottom.x - 300},${targetPoints.bottom.y + 300}`,
				`${targetPoints.bottom.x},${targetPoints.bottom.y}`
			].join(' ');
			break;
		case targetPoints.top.y < sourcePoints.top.y:
			drawn = [
				`M${sourcePoints.bottom.x},${sourcePoints.bottom.y}`,
				`C${sourcePoints.bottom.x + 300},${sourcePoints.bottom.y + 300}`,
				`${targetPoints.top.x + 300},${targetPoints.top.y - 300}`,
				`${targetPoints.top.x},${targetPoints.top.y}`
			].join(' ');
			break;
	}
	return { drawn };
};

export const transformGraphicsToSave = (graphics: AssembledPipelinesGraphics): PipelinesGraphics => {
	return {
		topics: graphics.topics.map(graphics => {
			return {
				topicId: graphics.topic.topicId,
				rect: JSON.parse(JSON.stringify(graphics.rect))
			};
		})
	};
};