import {useForceUpdate} from '@/widgets/basic/utils';
import React, {MouseEvent, useState} from 'react';
import {findSvgRoot} from '../../../utils/in-svg';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledTopicGraphics, GraphicsRole} from '../types';
import {TopicBlock, TopicContainer, TopicNameText} from './widgets';

export const TopicRect = (props: { topic: AssembledTopicGraphics }) => {
	const {topic: topicGraphics} = props;
	const {topic, rect} = topicGraphics;
	const {coordinate, frame: frameRect, name: namePos} = rect;

	const {fire} = useCatalogEventBus();
	const forceUpdate = useForceUpdate();
	const [dnd, setDnd] = useState<boolean>(false);

	const onMouseDown = (event: MouseEvent) => {
		if (event.button === 0) {
			const {clientX, clientY} = event;
			const [offsetX, offsetY] = [clientX - coordinate.x, clientY - coordinate.y];
			const onMove = ({clientX: x, clientY: y}: { clientX: number; clientY: number }) => {
				rect.coordinate = {x: x - offsetX, y: y - offsetY};
				forceUpdate();
				fire(CatalogEventTypes.TOPIC_MOVED, topic, topicGraphics);
			};
			const root = findSvgRoot(event.target as SVGGraphicsElement);
			const onEnd = () => {
				root.removeEventListener('mousemove', onMove);
				root.removeEventListener('mouseleave', onEnd);
				root.removeEventListener('mouseup', onEnd);
				setDnd(false);
			};
			root.addEventListener('mousemove', onMove);
			root.addEventListener('mouseleave', onEnd);
			root.addEventListener('mouseup', onEnd);
			setDnd(true);
		}
	};

	return <TopicContainer onMouseDown={onMouseDown} coordinate={coordinate}
	                       data-topic-id={topic.topicId}
	                       data-role={GraphicsRole.TOPIC}>
		<TopicBlock frame={frameRect} dnd={dnd}
		            data-topic-id={topic.topicId}
		            data-role={GraphicsRole.TOPIC_FRAME}/>
		<TopicNameText pos={namePos} dnd={dnd} data-role={GraphicsRole.TOPIC_NAME}>
			{topic.name}
		</TopicNameText>
	</TopicContainer>;
};