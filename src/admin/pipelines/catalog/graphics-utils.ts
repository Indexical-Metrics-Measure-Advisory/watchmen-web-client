import {BlockFrame} from '@/services/data/graphics/graphics-types';
import {PipelineBlockGraphicsRect, PipelinesGraphics, TopicGraphics} from '@/services/data/tuples/pipeline-types';
import {Topic, TopicId, TopicType} from '@/services/data/tuples/topic-types';
import {isDistinctTopic, isMetaTopic, isRawTopic} from '@/services/data/tuples/topic-utils';
import {getCurrentTime} from '@/services/data/utils';
import {
	BLOCK_FULL_PADDING_HORIZONTAL,
	BLOCK_FULL_PADDING_VERTICAL,
	BLOCK_GAP_HORIZONTAL,
	BLOCK_GAP_VERTICAL,
	BLOCK_HEIGHT_MIN,
	BLOCK_MARGIN_HORIZONTAL,
	BLOCK_MARGIN_VERTICAL,
	BLOCK_NAME_OFFSET_Y,
	BLOCK_WIDTH_MIN,
	SELECTION_FULL_GAP,
	SELECTION_GAP
} from './constants';
import {AssembledPipelinesGraphics, AssembledTopicGraphics, GraphicsRole} from './types';

const dependRectData = (rect: PipelineBlockGraphicsRect): PipelineBlockGraphicsRect => {
	const {
		coordinate: {x: coordinateX = 0, y: coordinateY = 0} = {x: 0, y: 0},
		frame: {
			x: frameX = 0,
			y: frameY = 0,
			width: frameWidth = BLOCK_WIDTH_MIN,
			height: frameHeight = BLOCK_HEIGHT_MIN
		} = {x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN},
		name: {x: nameX = BLOCK_WIDTH_MIN / 2, y: nameY = BLOCK_HEIGHT_MIN / 2} = {
			x: BLOCK_WIDTH_MIN / 2,
			y: BLOCK_HEIGHT_MIN / 2
		}
	} = rect;
	return {
		coordinate: {x: coordinateX, y: coordinateY},
		frame: {x: frameX, y: frameY, width: frameWidth, height: frameHeight},
		name: {x: nameX, y: nameY}
	};
};

export const createInitTopicRect = () => {
	return {
		coordinate: {x: 0, y: 0},
		frame: {x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN},
		name: {x: BLOCK_WIDTH_MIN / 2, y: BLOCK_HEIGHT_MIN / 2}
	};
};

export const createInitGraphics = (options: {
	topics: Array<Topic>;
	graphics: PipelinesGraphics;
	renderAll: boolean;
}): AssembledPipelinesGraphics => {
	const {topics, graphics, renderAll} = options;
	const {topics: topicGraphics = []} = graphics;

	const topicGraphicsMap: Map<string, TopicGraphics> = topicGraphics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, TopicGraphics>());

	const renderTopics = renderAll ? topics : topics.filter(topic => topicGraphicsMap.has(topic.topicId));

	return {
		pipelineGraphId: graphics.pipelineGraphId,
		name: graphics.name,
		topics: renderTopics.map(topic => {
			const graphics = topicGraphicsMap.get(topic.topicId);
			return graphics && graphics.rect ? {
				topic,
				rect: dependRectData(JSON.parse(JSON.stringify(graphics.rect)))
			} : {
				topic,
				rect: createInitTopicRect()
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
	return {x: frame.width / 2, y: frame.height / 2 + BLOCK_NAME_OFFSET_Y};
};

const computeTopicsGraphics = (graphics: AssembledPipelinesGraphics, svg: SVGSVGElement) => {
	// compute topic size
	const topicMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.TOPIC}]`)).forEach(topicRect => {
		const topicId = topicRect.getAttribute('data-topic-id')!;
		const name = topicRect.querySelector(`text[data-role='${GraphicsRole.TOPIC_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = topicMap.get(topicId)?.rect;
		if (rect) {
			rect.frame = {...rect.frame, ...computeBlockFrameSize(nameRect)};
			rect.name = computeBlockNamePosition(rect.frame);
		}
	});
	const allTopics = Array.from(topicMap.values());
	const rawOrMetaTopics = allTopics.filter(({topic}) => isRawTopic(topic) || isMetaTopic(topic));
	const distinctTopics = allTopics.filter(({topic}) => isDistinctTopic(topic));
	const aggregateTopics = allTopics.filter(({topic}) => topic.type === TopicType.AGGREGATE);
	const timeTopics = allTopics.filter(({topic}) => topic.type === TopicType.TIME);
	const ratioTopics = allTopics.filter(({topic}) => topic.type === TopicType.RATIO);

	const replace = (topics: Array<AssembledTopicGraphics>, leftX: number) => {
		topics.filter(graphics => graphics.rect.coordinate.x === 0)
			.sort((t1, t2) => t1.topic.name.toLowerCase().localeCompare(t2.topic.name.toLowerCase()))
			.reduce((top, topicGraphics) => {
				topicGraphics.rect.coordinate = {x: leftX, y: top};
				top += topicGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
				return top;
			}, BLOCK_MARGIN_VERTICAL);
	};
	replace(rawOrMetaTopics, BLOCK_MARGIN_HORIZONTAL);
	replace(distinctTopics, rawOrMetaTopics.reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(aggregateTopics, [...rawOrMetaTopics, ...distinctTopics].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(timeTopics, [...rawOrMetaTopics, ...distinctTopics, ...aggregateTopics].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);
	replace(ratioTopics, [...rawOrMetaTopics, ...distinctTopics, ...aggregateTopics, ...timeTopics].reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.coordinate.x + topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, 0) + BLOCK_GAP_HORIZONTAL);

	return topicMap;
};

export const computeGraphics = (options: {
	graphics: AssembledPipelinesGraphics;
	svg: SVGSVGElement;
}) => {
	const {graphics, svg} = options;
	computeTopicsGraphics(graphics, svg);
	const {width: svgWidth, height: svgHeight} = svg.getBoundingClientRect();
	const {width, height} = [...graphics.topics].reduce<{ width: number, height: number }>(
		(size, frameGraphics) => {
			const {coordinate: {x, y}, frame: {width, height}} = frameGraphics.rect;
			return {width: Math.max(size.width, x + width), height: Math.max(size.height, y + height)};
		}, {width: svgWidth - BLOCK_MARGIN_HORIZONTAL, height: svgHeight - BLOCK_MARGIN_VERTICAL});
	return {width: width + BLOCK_MARGIN_HORIZONTAL, height: height + BLOCK_MARGIN_VERTICAL};
};

export const computeTopicSelection = (options: { topicId: TopicId; graphics: AssembledPipelinesGraphics }) => {
	const {graphics, topicId} = options;

	// eslint-disable-next-line
	const topicGraphics = graphics.topics.find(({topic}) => topic.topicId == topicId)!;
	return {
		x: topicGraphics.rect.coordinate.x - SELECTION_GAP,
		y: topicGraphics.rect.coordinate.y - SELECTION_GAP,
		width: topicGraphics.rect.frame.width + SELECTION_FULL_GAP,
		height: topicGraphics.rect.frame.height + SELECTION_FULL_GAP
	};
};

export const transformGraphicsToSave = (graphics: AssembledPipelinesGraphics): PipelinesGraphics => {
	return {
		pipelineGraphId: graphics.pipelineGraphId,
		name: graphics.name,
		topics: graphics.topics.map(graphics => {
			return {
				topicId: graphics.topic.topicId,
				rect: JSON.parse(JSON.stringify(graphics.rect))
			};
		}),
		createTime: '',
		lastModified: getCurrentTime()
	};
};