import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AlertLabel } from '../../../alert/widgets';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { useEventBus } from '../../../events/event-bus';
import { EventTypes } from '../../../events/types';
import { Lang } from '../../../langs';
import { Router } from '../../../routes/types';
import { AvailableSpaceInConsole } from '../../../services/console/settings-types';
import { ConnectedSpace } from '../../../services/tuples/connected-space-types';
import { Topic } from '../../../services/tuples/topic-types';
import { useConsoleEventBus } from '../../console-event-bus';
import { ConsoleEventTypes } from '../../console-event-bus-types';
import { CatalogEventBusProvider, useCatalogEventBus } from './catalog-event-bus';
import { CatalogEventTypes } from './catalog-event-bus-types';
import { asSubjectGraphicsMap, asTopicGraphicsMap, computeGraphics, createInitGraphics } from './graphics-utils';
import { BlockRelations } from './relation/block-relations';
import { BlockRelationsAnimation } from './relation/block-relations-animation';
import { BlockSelection } from './selection';
import { SubjectRect } from './subject/subject-rect';
import { TopicRect } from './topic/topic-rect';
import { ConnectedSpaceGraphics, GraphicsRole, GraphicsSize, SubjectGraphics, TopicGraphics } from './types';
import { CatalogContainer, CatalogSvg, CatalogSvgContainer } from './widgets';

interface CatalogData {
	initialized: boolean;
	space?: AvailableSpaceInConsole;
	topics: Array<Topic>;
	graphics?: ConnectedSpaceGraphics
}

const CatalogFrame = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once: onceConsole } = useConsoleEventBus();
	const { fire } = useCatalogEventBus();
	const [ data, setData ] = useState<CatalogData>({ initialized: false, topics: [] });
	const [ svgSize, setSvgSize ] = useState<Partial<GraphicsSize>>({});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_SPACES, (availableSpaces: Array<AvailableSpaceInConsole>) => {
			// eslint-disable-next-line
			const space = availableSpaces.find(space => space.spaceId == connectedSpace.connectId);
			if (!space) {
				onceGlobal(EventTypes.ALERT_HIDDEN, () => {
					history.replace(Router.CONSOLE);
				}).fire(EventTypes.SHOW_ALERT, <AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.SPACE_NOT_FOUND}</AlertLabel>);
			} else {
				const topicIds = Array.from(new Set(space.topicIds));
				onceConsole(ConsoleEventTypes.REPLY_AVAILABLE_TOPICS, (availableTopics: Array<Topic>) => {
					const topicMap = availableTopics.reduce((map, topic) => {
						map.set(topic.topicId, topic);
						return map;
					}, new Map<string, Topic>());
					const topics = topicIds.map(topicId => topicMap.get(topicId)).filter(x => !!x) as Array<Topic>;
					if (topics.length === 0) {
						onceGlobal(EventTypes.ALERT_HIDDEN, () => {
							history.replace(Router.CONSOLE);
						}).fire(EventTypes.SHOW_ALERT,
							<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_NOT_FOUND}</AlertLabel>);
					} else if (topics.length !== topicIds.length) {
						onceGlobal(EventTypes.ALERT_HIDDEN, () => {
							history.replace(Router.CONSOLE);
						}).fire(EventTypes.SHOW_ALERT,
							<AlertLabel>{Lang.CONSOLE.CONNECTED_SPACE.TOPICS_COUNT_MISMATCH}</AlertLabel>);
					} else {
						setData({
							initialized: true,
							space,
							topics,
							graphics: createInitGraphics({ topics, subjects: connectedSpace.subjects })
						});
					}
				}).fire(ConsoleEventTypes.ASK_AVAILABLE_TOPICS);
			}
		}).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
	}, [ connectedSpace.connectId, connectedSpace.subjects, history, onceGlobal, onceConsole ]);
	useEffect(() => {
		if (data.graphics && svgContainerRef.current && svgRef.current) {
			const { width, height } = computeGraphics({ graphics: data.graphics, svg: svgRef.current });
			setSvgSize({ width, height });
		}
	}, [ data.graphics, forceUpdate ]);

	if (!data.initialized || !data.graphics) {
		return null;
	}

	const clearSelection = () => {
		fire(CatalogEventTypes.CLEAR_SELECTION);
	};
	const onSvgMouseDown = (event: React.MouseEvent) => {
		const { button, target } = event;
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
			case GraphicsRole.SUBJECT_NAME:
				const subjectRect = element.parentElement! as unknown as SVGGElement;
				const subjectId = subjectRect.getAttribute('data-subject-id')!;
				fire(CatalogEventTypes.SUBJECT_SELECTED, subjectGraphicsMap.get(subjectId)!.subject);
				break;
			default:
				clearSelection();
				break;
		}
	};

	const topicGraphicsMap: Map<string, TopicGraphics> = asTopicGraphicsMap(data.graphics);
	const subjectGraphicsMap: Map<string, SubjectGraphics> = asSubjectGraphicsMap(data.graphics);

	return <CatalogContainer>
		<CatalogSvgContainer ref={svgContainerRef}>
			<CatalogSvg onMouseDown={onSvgMouseDown} {...svgSize} ref={svgRef}>
				<BlockRelations graphics={data.graphics}/>
				{data.topics.map(topic => {
					const topicGraphics = topicGraphicsMap.get(topic.topicId)!;
					return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
				})}
				{connectedSpace.subjects.map(subject => {
					const subjectGraphics = subjectGraphicsMap.get(subject.subjectId)!;
					return <SubjectRect subject={subjectGraphics} key={subject.subjectId}/>;
				})}
				<BlockSelection graphics={data.graphics}/>
			</CatalogSvg>
			<BlockRelationsAnimation graphics={data.graphics}/>;
		</CatalogSvgContainer>
	</CatalogContainer>;
};

export const Catalog = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	return <CatalogEventBusProvider>
		<CatalogFrame connectedSpace={connectedSpace}/>
	</CatalogEventBusProvider>;
};