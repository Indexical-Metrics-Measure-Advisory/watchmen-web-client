import { Subject } from '../../../services/tuples/subject-types';
import { Topic } from '../../../services/tuples/topic-types';
import {
	BLOCK_FULL_PADDING_HORIZONTAL,
	BLOCK_FULL_PADDING_VERTICAL,
	BLOCK_GAP_HORIZONTAL,
	BLOCK_GAP_VERTICAL,
	BLOCK_HEIGHT_MIN,
	BLOCK_LEFT_INIT,
	BLOCK_NAME_OFFSET_Y,
	BLOCK_TOP_INIT,
	BLOCK_WIDTH_MIN,
	SELECTION_FULL_GAP,
	SELECTION_GAP
} from './constants';
import { BlockFrame, ConnectedSpaceGraphics, GraphicsRole, SubjectGraphics, TopicGraphics } from './types';

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
			topicGraphics.rect.coordinate = { x: BLOCK_LEFT_INIT, y: top };
			top += topicGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
			return top;
		}, BLOCK_TOP_INIT);
	return topicMap;
};

const computeSubjectGraphics = (graphics: ConnectedSpaceGraphics, svg: SVGSVGElement) => {
	const leftX = graphics.topics.reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, BLOCK_LEFT_INIT) + BLOCK_GAP_HORIZONTAL;

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
		}, BLOCK_TOP_INIT);
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
		}, { width: svgWidth - BLOCK_LEFT_INIT, height: svgHeight - BLOCK_TOP_INIT });
	return { width: width + BLOCK_LEFT_INIT, height: height + BLOCK_TOP_INIT };
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