import React, { useEffect, useState } from 'react';
import { Subject } from '../../../../services/tuples/subject-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { computeSubjectSelection, computeTopicSelection } from '../graphics-utils';
import { ConnectedSpaceGraphics, GraphicsPosition, GraphicsRole, GraphicsSize } from '../types';
import { Container, Rect } from './widgets';

interface SelectionState {
	visible: boolean;
	topic?: Topic;
	subject?: Subject;
	rect: GraphicsPosition & GraphicsSize
}

export const BlockSelection = (props: { graphics: ConnectedSpaceGraphics }) => {
	const { graphics } = props;

	const { on, off } = useCatalogEventBus();
	const [ selection, setSelection ] = useState<SelectionState>({
		visible: false,
		rect: { x: 0, y: 0, width: 0, height: 0 }
	});
	useEffect(() => {
		const onTopicSelected = (topic: Topic) => {
			setSelection({
				visible: true,
				topic,
				rect: computeTopicSelection({ topicId: topic.topicId, graphics })
			});
		};
		const onSubjectSelected = (subject: Subject) => {
			setSelection({
				visible: true,
				subject,
				rect: computeSubjectSelection({ subjectId: subject.subjectId, graphics })
			});
		};
		const onSelectionClear = () => {
			setSelection({ visible: false, rect: { x: 0, y: 0, width: 0, height: 0 } });
		};

		const onTopicMoved = (topic: Topic) => {
			if (topic !== selection.topic) {
				return;
			}
			setSelection({
				visible: true,
				topic,
				rect: computeTopicSelection({ topicId: topic.topicId, graphics })
			});
		};
		const onSubjectMoved = (subject: Subject) => {
			if (subject !== selection.subject) {
				return;
			}
			setSelection({
				visible: true,
				subject,
				rect: computeSubjectSelection({ subjectId: subject.subjectId, graphics })
			});
		};

		on(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
		on(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
		on(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		on(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_SELECTED, onTopicSelected);
			off(CatalogEventTypes.SUBJECT_SELECTED, onSubjectSelected);
			off(CatalogEventTypes.CLEAR_SELECTION, onSelectionClear);

			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
			off(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		};
	}, [ on, off, graphics, selection.topic, selection.subject ]);

	return <Container data-role={GraphicsRole.BLOCK_SELECTION} visible={selection.visible}>
		<Rect rect={selection.rect}/>
	</Container>;

};