import {BlockFrame} from '@/services/data/graphics/graphics-types';
import {
	ConnectedSpace,
	ConnectedSpaceBlockGraphics,
	ConnectedSpaceBlockGraphicsRect,
	ConnectedSpaceGraphics,
	ReportGraphics,
	SubjectGraphics,
	TopicGraphics
} from '@/services/data/tuples/connected-space-types';
import {Report, ReportId} from '@/services/data/tuples/report-types';
import {Subject, SubjectId} from '@/services/data/tuples/subject-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
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
import {
	AssembledConnectedSpaceGraphics,
	AssembledReportGraphics,
	AssembledSubjectGraphics,
	AssembledTopicGraphics,
	GraphicsRole
} from './types';

const cloneRectData = (rect: ConnectedSpaceBlockGraphicsRect): ConnectedSpaceBlockGraphicsRect => {
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

export const createInitGraphics = (options: {
	topics: Array<Topic>;
	subjects: Array<Subject>;
	graphics?: ConnectedSpaceGraphics
}): AssembledConnectedSpaceGraphics => {
	const {
		topics, subjects,
		graphics: {
			topics: topicGraphics = [],
			subjects: subjectGraphics = [],
			reports: reportGraphics = []
		} = {topics: [], subjects: [], reports: []}
	} = options;

	const topicGraphicsMap: Map<string, TopicGraphics> = topicGraphics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, TopicGraphics>());
	const subjectGraphicsMap: Map<string, SubjectGraphics> = subjectGraphics.reduce((map, subject) => {
		map.set(subject.subjectId, subject);
		return map;
	}, new Map<string, SubjectGraphics>());
	const reportGraphicsMap: Map<string, ReportGraphics> = reportGraphics.reduce((map, report) => {
		map.set(report.reportId, report);
		return map;
	}, new Map<string, ReportGraphics>());

	return {
		topics: topics.map(topic => {
			const graphics = topicGraphicsMap.get(topic.topicId);
			return graphics && graphics.rect ? {
				topic,
				rect: cloneRectData(graphics.rect)
			} : {
				topic,
				rect: {
					coordinate: {x: 0, y: 0},
					frame: {x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN},
					name: {x: BLOCK_WIDTH_MIN / 2, y: BLOCK_HEIGHT_MIN / 2}
				}
			};
		}),
		subjects: subjects.map(subject => {
			const graphics = subjectGraphicsMap.get(subject.subjectId);
			return graphics && graphics.rect ? {
				subject,
				rect: cloneRectData(graphics.rect)
			} : {
				subject,
				rect: {
					coordinate: {x: 0, y: 0},
					frame: {x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN},
					name: {x: BLOCK_WIDTH_MIN / 2, y: BLOCK_HEIGHT_MIN / 2}
				}
			};
		}),
		reports: (subjects.map(subject => subject.reports).filter(x => !!x).flat() as Array<Report>).map(report => {
			const graphics = reportGraphicsMap.get(report.reportId);
			return graphics && graphics.rect ? {
				report,
				rect: cloneRectData(JSON.parse(JSON.stringify(graphics.rect)))
			} : {
				report,
				rect: {
					coordinate: {x: 0, y: 0},
					frame: {x: 0, y: 0, width: BLOCK_WIDTH_MIN, height: BLOCK_HEIGHT_MIN},
					name: {x: BLOCK_WIDTH_MIN / 2, y: BLOCK_HEIGHT_MIN / 2}
				}
			};
		})
	};
};

export const asTopicGraphicsMap = (graphics: AssembledConnectedSpaceGraphics) => {
	return graphics.topics.reduce((map, topicGraphics) => {
		map.set(topicGraphics.topic.topicId, topicGraphics);
		return map;
	}, new Map<string, AssembledTopicGraphics>());
};

export const asSubjectGraphicsMap = (graphics: AssembledConnectedSpaceGraphics) => {
	return graphics.subjects.reduce((map, subjectGraphics) => {
		map.set(subjectGraphics.subject.subjectId, subjectGraphics);
		return map;
	}, new Map<string, AssembledSubjectGraphics>());
};

export const asReportGraphicsMap = (graphics: AssembledConnectedSpaceGraphics) => {
	return graphics.reports.reduce((map, reportGraphics) => {
		map.set(reportGraphics.report.reportId, reportGraphics);
		return map;
	}, new Map<string, AssembledReportGraphics>());
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

const redressGraphics = <T extends ConnectedSpaceBlockGraphics>(
	graphics: Array<T>,
	getName: (graphics: T) => string,
	initX: number
) => {
	graphics.filter(graphics => graphics.rect.coordinate.x === 0)
		.sort((t1, t2) => getName(t1).toLowerCase().localeCompare(getName(t2).toLowerCase()))
		.reduce((top, topicGraphics) => {
			topicGraphics.rect.coordinate = {x: initX, y: top};
			top += topicGraphics.rect.frame.height + BLOCK_GAP_VERTICAL;
			return top;
		}, BLOCK_MARGIN_VERTICAL);
};

const computeTopicsGraphics = (graphics: AssembledConnectedSpaceGraphics, svg: SVGSVGElement) => {
	// compute topic size
	const topicMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.TOPIC}]`)).forEach(topicRect => {
		const topicId = topicRect.getAttribute('data-topic-id')!;
		const name = topicRect.querySelector(`text[data-role='${GraphicsRole.TOPIC_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = topicMap.get(topicId)!.rect;
		rect.frame = {...rect.frame, ...computeBlockFrameSize(nameRect)};
		rect.name = computeBlockNamePosition(rect.frame);
	});
	redressGraphics<AssembledTopicGraphics>(Array.from(topicMap.values()), (graphics: AssembledTopicGraphics) => {
		return graphics.topic.name;
	}, BLOCK_MARGIN_HORIZONTAL);
	return topicMap;
};

const computeSubjectGraphics = (graphics: AssembledConnectedSpaceGraphics, svg: SVGSVGElement) => {
	const leftX = graphics.topics.reduce((right, topicGraphics) => {
		return Math.max(right, topicGraphics.rect.frame.x + topicGraphics.rect.frame.width);
	}, BLOCK_MARGIN_HORIZONTAL) + BLOCK_GAP_HORIZONTAL;

	// compute subject size
	const subjectMap: Map<string, AssembledSubjectGraphics> = asSubjectGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.SUBJECT}]`)).forEach(subjectRect => {
		const subjectId = subjectRect.getAttribute('data-subject-id')!;
		const name = subjectRect.querySelector(`text[data-role='${GraphicsRole.SUBJECT_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = subjectMap.get(subjectId)!.rect;
		rect.frame = {...rect.frame, ...computeBlockFrameSize(nameRect)};
		rect.name = computeBlockNamePosition(rect.frame);
	});
	redressGraphics<AssembledSubjectGraphics>(Array.from(subjectMap.values()), (graphics: AssembledSubjectGraphics) => {
		return graphics.subject.name;
	}, leftX);
	return subjectMap;
};

const computeReportGraphics = (graphics: AssembledConnectedSpaceGraphics, svg: SVGSVGElement) => {
	const leftX = [...graphics.topics, ...graphics.subjects].reduce((right, elementGraphics) => {
		return Math.max(right, elementGraphics.rect.frame.x + elementGraphics.rect.frame.width);
	}, BLOCK_MARGIN_HORIZONTAL) + BLOCK_GAP_HORIZONTAL * 2.5;

	// compute subject size
	const reportMap: Map<string, AssembledReportGraphics> = asReportGraphicsMap(graphics);
	Array.from(svg.querySelectorAll(`g[data-role=${GraphicsRole.REPORT}]`)).forEach(reportRect => {
		const reportId = reportRect.getAttribute('data-report-id')!;
		const name = reportRect.querySelector(`text[data-role='${GraphicsRole.REPORT_NAME}']`)! as SVGTextElement;
		const nameRect = name.getBBox();
		const rect = reportMap.get(reportId)!.rect;
		rect.frame = {...rect.frame, ...computeBlockFrameSize(nameRect)};
		rect.name = computeBlockNamePosition(rect.frame);
	});
	redressGraphics<AssembledReportGraphics>(Array.from(reportMap.values()), (graphics: AssembledReportGraphics) => {
		return graphics.report.name;
	}, leftX);
	return reportMap;
};

export const computeGraphics = (options: {
	graphics: AssembledConnectedSpaceGraphics;
	svg: SVGSVGElement;
}) => {
	const {graphics, svg} = options;

	// compute element graphics
	computeTopicsGraphics(graphics, svg);
	computeSubjectGraphics(graphics, svg);
	computeReportGraphics(graphics, svg);

	// compute svg size
	const {width: svgWidth, height: svgHeight} = svg.getBoundingClientRect();
	const {
		width,
		height
	} = [...graphics.topics, ...graphics.subjects, ...graphics.reports].reduce<{ width: number, height: number }>(
		(size, frameGraphics) => {
			const {coordinate: {x, y}, frame: {width, height}} = frameGraphics.rect;
			return {width: Math.max(size.width, x + width), height: Math.max(size.height, y + height)};
		}, {width: svgWidth - BLOCK_MARGIN_HORIZONTAL, height: svgHeight - BLOCK_MARGIN_VERTICAL});
	return {width: width + BLOCK_MARGIN_HORIZONTAL, height: height + BLOCK_MARGIN_VERTICAL};
};

const computeBlockSelection = (blockGraphics: ConnectedSpaceBlockGraphics) => {
	return {
		x: blockGraphics.rect.coordinate.x - SELECTION_GAP,
		y: blockGraphics.rect.coordinate.y - SELECTION_GAP,
		width: blockGraphics.rect.frame.width + SELECTION_FULL_GAP,
		height: blockGraphics.rect.frame.height + SELECTION_FULL_GAP
	};
};
export const computeTopicSelection = (options: { topicId: TopicId; graphics: AssembledConnectedSpaceGraphics }) => {
	const {graphics, topicId} = options;

	// eslint-disable-next-line
	const topicGraphics = graphics.topics.find(({topic}) => topic.topicId == topicId)!;
	return computeBlockSelection(topicGraphics);
};

export const computeSubjectSelection = (options: { subjectId: SubjectId; graphics: AssembledConnectedSpaceGraphics }) => {
	const {graphics, subjectId} = options;

	// eslint-disable-next-line
	const subjectGraphics = graphics.subjects.find(({subject}) => subject.subjectId == subjectId)!;
	return computeBlockSelection(subjectGraphics);
};

export const computeReportSelection = (options: { reportId: ReportId; graphics: AssembledConnectedSpaceGraphics }) => {
	const {graphics, reportId} = options;

	// eslint-disable-next-line
	const reportGraphics = graphics.reports.find(({report}) => report.reportId == reportId)!;
	return computeBlockSelection(reportGraphics);
};

export const transformGraphicsToSave = (connectedSpace: ConnectedSpace, graphics: AssembledConnectedSpaceGraphics): ConnectedSpaceGraphics => {
	return {
		connectId: connectedSpace.connectId,
		topics: graphics.topics.map(graphics => {
			return {
				topicId: graphics.topic.topicId,
				rect: JSON.parse(JSON.stringify(graphics.rect))
			};
		}),
		subjects: graphics.subjects.map(graphics => {
			return {
				subjectId: graphics.subject.subjectId,
				rect: JSON.parse(JSON.stringify(graphics.rect))
			};
		}),
		reports: graphics.reports.map(graphics => {
			return {
				reportId: graphics.report.reportId,
				rect: JSON.parse(JSON.stringify(graphics.rect))
			};
		})
	};
};