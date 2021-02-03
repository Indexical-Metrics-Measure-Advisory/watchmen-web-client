import React, { useEffect, useRef } from 'react';
import { useForceUpdate } from '../../../../basic-widgets/utils';
import { Subject } from '../../../../services/tuples/subject-types';
import { Topic } from '../../../../services/tuples/topic-types';
import { useCatalogEventBus } from '../catalog-event-bus';
import { CatalogEventTypes } from '../catalog-event-bus-types';
import { computeRelationPoints } from '../graphics-utils';
import { ConnectedSpaceGraphics, GraphicsRole } from '../types';
import { Curve } from './widgets';

export const SubjectTopicSelection = (props: { graphics: ConnectedSpaceGraphics, topic: Topic, subject: Subject }) => {
	const { graphics, topic, subject } = props;

	const { on, off, fire } = useCatalogEventBus();
	const containerRef = useRef<SVGGElement>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const repaint = () => {
			forceUpdate();
			// fire.topicRelationTransformed(relationGraphics);
		};
		const onTopicMoved = (movedTopic: Topic) => {
			if (movedTopic !== topic) {
				return;
			}
			repaint();
		};
		const onSubjectMoved = (movedSubject: Subject) => {
			if (movedSubject !== subject) {
				return;
			}
			repaint();
		};

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		on(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
			off(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		};
	}, [ on, off, subject, topic, forceUpdate ]);

	const source = graphics.subjects.find(subjectGraphics => subjectGraphics.subject === subject);
	const target = graphics.topics.find(topicGraphics => topicGraphics.topic === topic);
	if (!source || !target) {
		return null;
	}

	const curvePoints = computeRelationPoints({ source, target });

	return <g data-role={GraphicsRole.SUBJECT_TOPIC_RELATION} ref={containerRef}>
		<Curve lattice={curvePoints} data-role={GraphicsRole.SUBJECT_TOPIC_RELATION_LINK}/>
	</g>;
};