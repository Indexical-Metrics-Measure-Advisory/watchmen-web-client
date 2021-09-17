import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {computeRelationPoints} from '@/widgets/graphics';
import {RelationAnimationDot} from '@/widgets/graphics/widgets';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledPipelinesGraphics, GraphicsRole} from '../types';

export const TopicsRelationAnimation = (props: { graphics: AssembledPipelinesGraphics, source: Topic, target: Topic }) => {
	const {graphics, source, target} = props;

	const {on, off} = useCatalogEventBus();
	const forceUpdate = useForceUpdate();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onTopicSelected = (selectedTopic: Topic) => {
			if (selectedTopic !== source && selectedTopic !== target) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onTopicMoved = (movedTopic: Topic) => {
			if (movedTopic !== source && movedTopic !== target) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onSelectionClear = () => {
			setVisible(false);
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		on(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);

		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
			off(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [on, off, source, target, forceUpdate, visible]);

	const sourceGraphics = graphics.topics.find(topicGraphics => topicGraphics.topic === source);
	const targetGraphics = graphics.topics.find(topicGraphics => topicGraphics.topic === target);
	if (!sourceGraphics || !targetGraphics) {
		return null;
	}

	const curvePoints = computeRelationPoints({source: sourceGraphics, target: targetGraphics});

	return <RelationAnimationDot lattice={curvePoints} visible={visible}
	                             data-role={GraphicsRole.TOPICS_RELATION_ANIMATION}/>;
};