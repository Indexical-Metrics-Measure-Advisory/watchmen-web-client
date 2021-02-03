import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';
import {
	BLOCK_FULL_PADDING_HORIZONTAL,
	BLOCK_FULL_PADDING_VERTICAL,
	BLOCK_GAP_HORIZONTAL,
	BLOCK_GAP_VERTICAL,
	BLOCK_HEIGHT_MIN,
	BLOCK_MARGIN_HORIZONTAL,
	BLOCK_NAME_OFFSET_Y,
	BLOCK_MARGIN_VERTICAL,
	BLOCK_WIDTH_MIN,
	SELECTION_FULL_GAP,
	SELECTION_GAP
} from './constants';
import {
	BlockFrame,
	ConnectedSpaceGraphics,
	FrameGraphics,
	GraphicsRole,
	RelationCurvePoints,
	SubjectGraphics,
	TopicGraphics
} from './types';

export const createInitGraphics = (options: {
	topics: Array<Topic>;
	subjects: Array<Subject>;
}): ConnectedSpaceGraphics => {
	const { topics, subjects } = options;

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
		}),
		subjects: subjects.map(subject => {
			return {
				subject,
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
	return graphics.topics.reduce((map, topicGraphics) => {
		map.set(topicGraphics.topic.topicId, topicGraphics);
		return map;
	}, new Map<string, TopicGraphics>());
};

export const asSubjectGraphicsMap = (graphics: ConnectedSpaceGraphics) => {
	return graphics.subjects.reduce((map, subjectGraphics) => {
		map.set(subjectGraphics.subject.subjectId, subjectGraphics);
		return map;
	}, new Map<string, SubjectGraphics>());
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

const computeTopicsGraphics = (graphics: ConnectedSpaceGraphics, svg: SVGSVGElement) => {
	// compute topic size
	const topicMap: Map<string, TopicGraphics> = asTopicGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.TOPIC}]`)).forEach(topicRect => {
		const topicId = topicRect.getAttribute('data-topic-id')!;
		const name = topicRect.querySelector(`text[data-role='${GraphicsRole.TOPIC_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = topicMap.get(topicId)!.rect;
		rect.frame = { ...rect.frame, ...computeBlockFrameSize(nameRect) };
		rect.name = computeBlockNamePosition(rect.frame);
	});
	Array.from(topicMap.values())
		.sort((t1, t2) => t1.topic.name.toLowerCase().localeCompare(t2.topic.name.toLowerCase()))
		.reduce((top, topicGraphics) => {
			topicGraphics.rect.coordinate = { x: BLOCK_MARGIN_HORIZONTAL, y: top };
			top += topicGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
			return top;
		}, BLOCK_MARGIN_VERTICAL);
	return topicMap;
};

const computeSubjectGraphics = (graphics: ConnectedSpaceGraphics, svg: SVGSVGElement) => {
	const leftX = graphics.topics.reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, BLOCK_MARGIN_HORIZONTAL) + BLOCK_GAP_HORIZONTAL;

	// compute subject size
	const subjectMap: Map<string, SubjectGraphics> = asSubjectGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.SUBJECT}]`)).forEach(subjectRect => {
		const subjectId = subjectRect.getAttribute('data-subject-id')!;
		const name = subjectRect.querySelector(`text[data-role='${GraphicsRole.SUBJECT_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = subjectMap.get(subjectId)!.rect;
		rect.frame = { ...rect.frame, ...computeBlockFrameSize(nameRect) };
		rect.name = computeBlockNamePosition(rect.frame);
	});
	Array.from(subjectMap.values())
		.sort((t1, t2) => t1.subject.name.toLowerCase().localeCompare(t2.subject.name.toLowerCase()))
		.reduce((top, subjectGraphics) => {
			subjectGraphics.rect.coordinate = { x: leftX, y: top };
			top += subjectGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
			return top;
		}, BLOCK_MARGIN_VERTICAL);
	return subjectMap;
};

export const computeGraphics = (options: {
	graphics: ConnectedSpaceGraphics;
	svg: SVGSVGElement;
}) => {
	const { graphics, svg } = options;
	computeTopicsGraphics(graphics, svg);
	computeSubjectGraphics(graphics, svg);
	// compute topic relations
	// graphics.topicRelations.forEach(relation => {
	// 	const { relation: { sourceTopicId, targetTopicId } } = relation;
	// 	relation.points = computeTopicRelationPoints({ graphics, sourceTopicId, targetTopicId });
	// });
	const { width: svgWidth, height: svgHeight } = svg.getBoundingClientRect();
	const { width, height } = [ ...graphics.topics, ...graphics.subjects ].reduce<{ width: number, height: number }>(
		(size, frameGraphics) => {
			const { coordinate: { x, y }, frame: { width, height } } = frameGraphics.rect;
			return { width: Math.max(size.width, x + width), height: Math.max(size.height, y + height) };
		}, { width: svgWidth - BLOCK_MARGIN_HORIZONTAL, height: svgHeight - BLOCK_MARGIN_VERTICAL });
	return { width: width + BLOCK_MARGIN_HORIZONTAL, height: height + BLOCK_MARGIN_VERTICAL };
};

export const computeTopicSelection = (options: { topicId: string; graphics: ConnectedSpaceGraphics }) => {
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

export const computeSubjectSelection = (options: { subjectId: string; graphics: ConnectedSpaceGraphics }) => {
	const { graphics, subjectId } = options;

	// eslint-disable-next-line
	const subjectGraphics = graphics.subjects.find(({ subject }) => subject.subjectId == subjectId)!;
	return {
		x: subjectGraphics.rect.coordinate.x - SELECTION_GAP,
		y: subjectGraphics.rect.coordinate.y - SELECTION_GAP,
		width: subjectGraphics.rect.frame.width + SELECTION_FULL_GAP,
		height: subjectGraphics.rect.frame.height + SELECTION_FULL_GAP
	};
};

const computeFramePoints = (frameGraphics: FrameGraphics) => {
	const { rect: { coordinate, frame } } = frameGraphics;
	return {
		top: { x: coordinate.x + frame.x + frame.width / 2, y: coordinate.y + frame.y },
		right: { x: coordinate.x + frame.x + frame.width, y: coordinate.y + frame.y + frame.height / 2 },
		bottom: { x: coordinate.x + frame.x + frame.width / 2, y: coordinate.y + frame.y + frame.height },
		left: { x: coordinate.x + frame.x, y: coordinate.y + frame.y + frame.height / 2 }
	};
};

export const computeRelationPoints = (options: { source: FrameGraphics; target: FrameGraphics; }): RelationCurvePoints => {
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
