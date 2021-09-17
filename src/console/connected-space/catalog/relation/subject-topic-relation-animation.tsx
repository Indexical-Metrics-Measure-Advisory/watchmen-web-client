import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {computeRelationPoints} from '@/widgets/graphics';
import {RelationAnimationDot} from '@/widgets/graphics/widgets';
import React, {useEffect, useState} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledConnectedSpaceGraphics, GraphicsRole} from '../types';

export const SubjectTopicRelationAnimation = (props: { graphics: AssembledConnectedSpaceGraphics, topic: Topic, subject: Subject }) => {
	const {graphics, topic, subject} = props;

	const {on, off} = useCatalogEventBus();
	const forceUpdate = useForceUpdate();
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		const onTopicSelected = (selectedTopic: Topic) => {
			if (selectedTopic !== topic) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onTopicMoved = (movedTopic: Topic) => {
			if (movedTopic !== topic) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onSubjectSelected = (selectedSubject: Subject) => {
			if (selectedSubject !== subject) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onSubjectMoved = (movedSubject: Subject) => {
			if (movedSubject !== subject) {
				visible && setVisible(false);
			} else {
				visible ? forceUpdate() : setVisible(true);
			}
		};
		const onSelectionClear = () => {
			setVisible(false);
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
	}, [on, off, topic, subject, forceUpdate, visible]);

	const source = graphics.subjects.find(subjectGraphics => subjectGraphics.subject === subject);
	const target = graphics.topics.find(topicGraphics => topicGraphics.topic === topic);
	if (!source || !target) {
		return null;
	}

	const curvePoints = computeRelationPoints({source, target});

	return <RelationAnimationDot lattice={curvePoints} visible={visible}
	                             data-role={GraphicsRole.SUBJECT_TOPIC_RELATION_ANIMATION}/>;
};