import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {computeRelationPoints} from '@/widgets/graphics';
import {Curve} from '@/widgets/graphics/widgets';
import React, {useEffect, useRef} from 'react';
import {useCatalogEventBus} from '../catalog-event-bus';
import {CatalogEventTypes} from '../catalog-event-bus-types';
import {AssembledConnectedSpaceGraphics, GraphicsRole} from '../types';

export const SubjectTopicRelation = (props: { graphics: AssembledConnectedSpaceGraphics, topic: Topic, subject: Subject }) => {
	const {graphics, topic, subject} = props;

	const {on, off} = useCatalogEventBus();
	const containerRef = useRef<SVGGElement>(null);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicMoved = (movedTopic: Topic) => {
			if (movedTopic !== topic) {
				return;
			}
			forceUpdate();
		};
		const onSubjectMoved = (movedSubject: Subject) => {
			if (movedSubject !== subject) {
				return;
			}
			forceUpdate();
		};

		on(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
		on(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		return () => {
			off(CatalogEventTypes.TOPIC_MOVED, onTopicMoved);
			off(CatalogEventTypes.SUBJECT_MOVED, onSubjectMoved);
		};
	}, [on, off, topic, subject, forceUpdate]);

	const source = graphics.subjects.find(subjectGraphics => subjectGraphics.subject === subject);
	const target = graphics.topics.find(topicGraphics => topicGraphics.topic === topic);
	if (!source || !target) {
		return null;
	}

	const curvePoints = computeRelationPoints({source, target});

	return <g data-role={GraphicsRole.SUBJECT_TOPIC_RELATION} ref={containerRef}>
		<Curve lattice={curvePoints} data-role={GraphicsRole.SUBJECT_TOPIC_RELATION_LINK}/>
	</g>;
};