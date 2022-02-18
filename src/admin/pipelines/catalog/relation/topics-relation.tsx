import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {computeRelationPoints} from '@/widgets/graphics';
import {Curve} from '@/widgets/graphics/widgets';
import React, {useEffect, useRef} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledPipelinesGraphics, GraphicsRole} from '../types';

export const TopicsRelation = (props: {
	graphics: AssembledPipelinesGraphics, source: Topic, target: Topic, read?: boolean
}) => {
	const {graphics, source, target, read = false} = props;

	const {on, off} = useCatalogEventBus();
	const containerRef = useRef<SVGGElement>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicMoved = (movedTopic: Topic) => {
			if (movedTopic !== source && movedTopic !== target) {
				return;
			}
			forceUpdate();
		};

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [on, off, source, target, forceUpdate]);

	const sourceGraphics = graphics.topics.find(topicGraphics => topicGraphics.topic === source);
	const targetGraphics = graphics.topics.find(topicGraphics => topicGraphics.topic === target);
	if (!sourceGraphics || !targetGraphics) {
		return null;
	}

	const curvePoints = computeRelationPoints({source: sourceGraphics, target: targetGraphics});

	return <g data-role={GraphicsRole.TOPICS_RELATION} ref={containerRef}>
		<Curve lattice={curvePoints} data-role={GraphicsRole.TOPICS_RELATION_LINK} dash={read}/>
	</g>;
};