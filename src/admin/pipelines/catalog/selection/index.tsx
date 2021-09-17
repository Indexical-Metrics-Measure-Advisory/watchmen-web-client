import {GraphicsPosition, GraphicsSize} from '@/services/data/graphics/graphics-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {computeTopicSelection} from '../graphics-utils';
import {AssembledPipelinesGraphics, GraphicsRole} from '../types';
import {Container, Rect} from './widgets';

interface SelectionState {
	visible: boolean;
	topic?: Topic;
	rect: GraphicsPosition & GraphicsSize;
}

export const BlockSelection = (props: { graphics: AssembledPipelinesGraphics }) => {
	const {graphics} = props;

	const {on, off} = useCatalogEventBus();
	const [selection, setSelection] = useState<SelectionState>({
		visible: false,
		rect: {x: 0, y: 0, width: 0, height: 0}
	});
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setSelection({
				visible: true,
				topic,
				rect: computeTopicSelection({topicId: topic.topicId, graphics})
			});
		};
		const onSelectionClear = () => {
			setSelection({visible: false, rect: {x: 0, y: 0, width: 0, height: 0}});
		};

		const onTopicMoved = (topic: Topic) => {
			if (topic !== selection.topic) {
				return;
			}
			setSelection({
				visible: true,
				topic,
				rect: computeTopicSelection({topicId: topic.topicId, graphics})
			});
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		on(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
			off(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		};
	}, [on, off, graphics, selection.topic]);
	useEffect(() => {
		setSelection({visible: false, rect: {x: 0, y: 0, width: 0, height: 0}});
	}, [graphics]);

	return <Container data-role={GraphicsRole.BLOCK_SELECTION} visible={selection.visible}>
		<Rect rect={selection.rect}/>
	</Container>;

};