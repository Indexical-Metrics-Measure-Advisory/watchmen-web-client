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
import { asTopicGraphicsMap, computeGraphics, createInitGraphics } from './graphics-utils';
import { TopicRect } from './topic/topic-rect';
import { ConnectedSpaceGraphics, TopicGraphics } from './types';
import { CatalogContainer, CatalogSvg, CatalogSvgContainer } from './widgets';

interface CatalogData {
	initialized: boolean;
	space?: AvailableSpaceInConsole;
	topics: Array<Topic>;
	graphics?: ConnectedSpaceGraphics
}

export const Catalog = (props: { connectedSpace: ConnectedSpace }) => {
	const { connectedSpace } = props;

	const svgContainerRef = useRef<HTMLDivElement>(null);
	const svgRef = useRef<SVGSVGElement>(null);
	const history = useHistory();
	const { once: onceGlobal } = useEventBus();
	const { once: onceConsole } = useConsoleEventBus();
	const [ data, setData ] = useState<CatalogData>({ initialized: false, topics: [] });
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
						setData({ initialized: true, space, topics, graphics: createInitGraphics(topics) });
					}
				}).fire(ConsoleEventTypes.ASK_AVAILABLE_TOPICS);
			}
		}).fire(ConsoleEventTypes.ASK_AVAILABLE_SPACES);
	}, [ connectedSpace.connectId, history, onceGlobal, onceConsole ]);
	useEffect(() => {
		if (data.graphics && svgContainerRef.current && svgRef.current) {
			computeGraphics({
				graphics: data.graphics,
				repaint: forceUpdate,
				svg: svgRef.current
			});
		}
	}, [ data.graphics, forceUpdate ]);

	if (!data.initialized || !data.graphics) {
		return null;
	}

	const topicGraphicsMap: Map<string, TopicGraphics> = asTopicGraphicsMap(data.graphics);

	return <CatalogContainer>
		<CatalogSvgContainer ref={svgContainerRef}>
			<CatalogSvg ref={svgRef}>
				{data.topics.map(topic => {
					const topicGraphics = topicGraphicsMap.get(topic.topicId)!;
					return <TopicRect topic={topicGraphics} key={topic.topicId}/>;
				})}
			</CatalogSvg>
		</CatalogSvgContainer>
	</CatalogContainer>;
};