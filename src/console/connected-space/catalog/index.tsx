import {Router} from '@/routes/types';
import {AvailableSpaceInConsole} from '@/services/data/console/settings-types';
import {GraphicsSize} from '@/services/data/graphics/graphics-types';
import {
	ConnectedSpace,
	ConnectedSpaceBlockGraphics,
	ConnectedSpaceGraphics
} from '@/services/data/tuples/connected-space-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {MouseEvent, useEffect, useRef, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useConsoleEventBus} from '../../console-event-bus';
import {ConsoleEventTypes} from '../../console-event-bus-types';
import {CatalogEventBusProvider, useCatalogEventBus} from './catalog-event-bus';
import {CatalogEventTypes} from './catalog-event-bus-types';
import {GraphicsSave} from './graphics-save';
import {
	asReportGraphicsMap,
	asSubjectGraphicsMap,
	asTopicGraphicsMap,
	computeGraphics,
	createInitGraphics
} from './graphics-utils';
import {CatalogHeader} from './header';
import {Navigator} from './navigator';
import {BlockRelations} from './relation/block-relations';
import {BlockRelationsAnimation} from './relation/block-relations-animation';
import {ReportRect} from './report/report-rect';
import {BlockSelection} from './selection';
import {SubjectRect} from './subject/subject-rect';
import {Thumbnail} from './thumbnail';
import {TopicRect} from './topic/topic-rect';
import {
	AssembledReportGraphics,
	AssembledSubjectGraphics,
	AssembledTopicGraphics,
	CatalogData,
	GraphicsRole
} from './types';
import {CatalogContainer, CatalogSvg, CatalogSvgContainer, CatalogSvgRelationsAnimationContainer} from './widgets';

const CatalogBody = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const history = useHistory();
	const {fire: fireGlobal} = useEventBus();
	const {fire: fireConsole} = useConsoleEventBus();
	const {fire, on, off} = useCatalogEventBus();
	const [data, setData] = useState<CatalogData>({initialized: false, topics: []});
	const [svgSize, setSvgSize] = useState<Partial<GraphicsSize>>({});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fireConsole(ConsoleEventTypes.ASK_AVAILABLE_SPACES, (availableSpaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = availableSpaces.find(space => space.spaceId == connectedSpace.spaceId);
			if (!space) {
				fireGlobal(EventTypes.SHOW_ALERT,
					<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.SPACE_NOT_FOUND}</AlertLabel>, () => {
						history.replace(Router.CONSOLE);
					});
			} else {
				const topicIds = Array.from(new Set(space.topicIds));
				fireConsole(ConsoleEventTypes.ASK_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
					const topicMap = availableTopics.reduce((map, topic) => {
						map.set(topic.topicId, topic);
						return map;
					}, new Map<string, Topic>());
					const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
					if (topics.length === 0) {
						fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
							{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_NOT_FOUND}
						</AlertLabel>, () => {
							history.replace(Router.CONSOLE);
						});
					} else if (topics.length !== topicIds.length) {
						fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>
							{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_COUNT_MISMATCH}
						</AlertLabel>, () => {
							history.replace(Router.CONSOLE);
						});
					} else {
						fireConsole(ConsoleEventTypes.ASK_CONNECTED_SPACE_GRAPHICS, (graphics: Array<ConnectedSpaceGraphics>) => {
							// eslint-disable-next-line
							const thisGraphics = graphics.find(graphics => graphics.connectId == connectedSpace.connectId);
							setData({
								initialized: true,
								space,
								topics,
								graphics: createInitGraphics({
									topics,
									subjects: connectedSpace.subjects,
									graphics: thisGraphics
								})
							});
						});
					}
				});
			}
		});
	}, [connectedSpace.spaceId, connectedSpace.connectId, connectedSpace.subjects, history, fireGlobal, fireConsole]);
	useEffect(() => {
		if (data.graphics && svgContainerRef.current && svgRef.current) {
			const {width, height} = computeGraphics({graphics: data.graphics, svg: svgRef.current});
			setSvgSize({width, height});
		}
	}, [data.graphics, forceUpdate]);
	useEffect(() => {
		const onBlockMoved = (data: any, graphics: ConnectedSpaceBlockGraphics) => {
			const {width = 0, height = 0} = svgSize;
			const {coordinate: {x, y}, frame: {width: blockWidth, height: blockHeight}} = graphics.rect;
			const newWidth = x + blockWidth > width ? width * 2 : width;
			const newHeight = y + blockHeight > height ? height * 2 : height;
			if (newWidth !== width || newHeight !== height) {
				setSvgSize({width: newWidth, height: newHeight});
			}
		};
		on(CatalogEventTypes.TOPIC_MOVED, onBlockMoved);
		on(CatalogEventTypes.SUBJECT_MOVED, onBlockMoved);
		on(CatalogEventTypes.REPORT_MOVED, onBlockMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onBlockMoved);
			off(CatalogEventTypes.SUBJECT_MOVED, onBlockMoved);
			off(CatalogEventTypes.REPORT_MOVED, onBlockMoved);
		};
	}, [on, off, svgSize]);
	useEffect(() => {
		if (svgContainerRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				fire(CatalogEventTypes.RESIZE);
				if (data.graphics && svgContainerRef.current && svgRef.current) {
					const {width, height} = computeGraphics({graphics: data.graphics, svg: svgRef.current});
					if (width > (svgSize.width || 0) || height > (svgSize.height || 0)) {
						setSvgSize({width, height});
					}
				}
			});
			resizeObserver.observe(svgContainerRef.current);
			return () => resizeObserver.disconnect();
		}
	}, [fire, data.graphics, svgSize.width, svgSize.height]);

	if (!data.initialized || !data.graphics) {
		return null;
	}

	const clearSelection = () => {
		fire(CatalogEventTypes.CLEAR_SELECTION);
	};
	const onBodyScroll = () => fire(CatalogEventTypes.SCROLL);
	const onSvgMouseDown = (event: MouseEvent) => {
		const {button, target} = event;
		if (button === 2 || button === 1) {
			return;
		}

		const element = target as SVGGraphicsElement;
		const tagName = element.tagName.toUpperCase();
		if (tagName === 'SVG') {
			clearSelection();
			return;
		}

		const role = element.getAttribute('data-role') || '';
		switch (role) {
			case GraphicsRole.TOPIC_FRAME:
			case GraphicsRole.TOPIC_NAME:
				const topicRect = element.parentElement! as unknown as SVGGElement;
				const topicId = topicRect.getAttribute('data-topic-id')!;
				fire(CatalogEventTypes.TOPIC_SELECTED, topicGraphicsMap.get(topicId)!.topic);
				break;
			case GraphicsRole.SUBJECT_FRAME:
			case GraphicsRole.SUBJECT_NAME: {
				const subjectRect = element.parentElement! as unknown as SVGGElement;
				const subjectId = subjectRect.getAttribute('data-subject-id')!;
				fire(CatalogEventTypes.SUBJECT_SELECTED, subjectGraphicsMap.get(subjectId)!.subject);
				break;
			}
			case GraphicsRole.REPORT_FRAME:
			case GraphicsRole.REPORT_NAME: {
				const reportRect = element.parentElement! as unknown as SVGGElement;
				const subjectId = reportRect.getAttribute('data-subject-id')!;
				const reportId = reportRect.getAttribute('data-report-id')!;
				fire(CatalogEventTypes.REPORT_SELECTED, subjectGraphicsMap.get(subjectId)!.subject, reportGraphicsMap.get(reportId)!.report);
				break;
			}
			default:
				clearSelection();
				break;
		}
	};

	const topicGraphicsMap: Map<string, AssembledTopicGraphics> = asTopicGraphicsMap(data.graphics);
	const subjectGraphicsMap: Map<string, AssembledSubjectGraphics> = asSubjectGraphicsMap(data.graphics);
	const reportGraphicsMap: Map<string, AssembledReportGraphics> = asReportGraphicsMap(data.graphics);

	return <CatalogContainer>
		<CatalogSvgContainer ref={svgContainerRef} onScroll={onBodyScroll}>
			<CatalogSvg onMouseDown={onSvgMouseDown} {...svgSize} ref={svgRef}>
				<BlockRelations graphics={data.graphics}/>
				{data.topics.map(topic => {
					const topicGraphics = topicGraphicsMap.get(topic.topicId)!;
					return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
				})}
				{connectedSpace.subjects.map(subject => {
					const subjectGraphics = subjectGraphicsMap.get(subject.subjectId)!;
					return <SubjectRect connectedSpace={connectedSpace} subject={subjectGraphics}
					                    key={subject.subjectId}/>;
				})}
				{connectedSpace.subjects.map(subject => {
					return (subject.reports || []).filter(x => !!x).map(report => {
						if (!report) {
							return null;
						}
						const reportGraphics = reportGraphicsMap.get(report.reportId)!;
						return <ReportRect connectedSpace={connectedSpace}
						                   subject={subject}
						                   report={reportGraphics}
						                   key={report.reportId}/>;
					});
				}).flat()}
				<BlockSelection graphics={data.graphics}/>
			</CatalogSvg>
			<CatalogSvgRelationsAnimationContainer>
				<BlockRelationsAnimation graphics={data.graphics}/>
			</CatalogSvgRelationsAnimationContainer>
			<Thumbnail connectedSpace={connectedSpace} data={data} svgSize={svgSize}
			           topicGraphicsMap={topicGraphicsMap}
			           subjectGraphicsMap={subjectGraphicsMap}
			           reportGraphicsMap={reportGraphicsMap}/>
		</CatalogSvgContainer>
		<Navigator connectedSpace={connectedSpace}/>
		<GraphicsSave connectedSpace={connectedSpace} graphics={data.graphics}/>
	</CatalogContainer>;
};

export const Catalog = (props: { connectedSpace: ConnectedSpace }) => {
	const {connectedSpace} = props;

	return <CatalogEventBusProvider>
		<CatalogHeader connectedSpace={connectedSpace}/>
		<CatalogBody connectedSpace={connectedSpace}/>
	</CatalogEventBusProvider>;
};