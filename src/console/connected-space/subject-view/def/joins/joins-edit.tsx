import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useJoinsDataVisible} from '../data/use-joins-data-visible';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {JoinEdit} from './join-edit';
import {JoinsEditContainer} from './widgets';

export const JoinsEdit = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, availableTopics, pickedTopics} = props;

	const {on, off} = useSubjectDefEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(SubjectDefEventTypes.DATASET_JOIN_ADDED, forceUpdate);
		on(SubjectDefEventTypes.DATASET_JOIN_REMOVED, forceUpdate);
		return () => {
			off(SubjectDefEventTypes.DATASET_JOIN_ADDED, forceUpdate);
			off(SubjectDefEventTypes.DATASET_JOIN_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);
	const [isVisible] = useState(() => () => subject.dataset.joins.length !== 0);
	const visible = useJoinsDataVisible(isVisible);

	return <JoinsEditContainer visible={visible}>
		{subject.dataset.joins.map(join => {
			return <JoinEdit subject={subject} join={join}
			                 availableTopics={availableTopics} pickedTopics={pickedTopics}
			                 key={v4()}/>;
		})}
	</JoinsEditContainer>;
};