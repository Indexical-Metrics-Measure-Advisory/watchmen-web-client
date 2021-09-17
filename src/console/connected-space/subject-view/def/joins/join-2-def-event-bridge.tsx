import {Subject, SubjectDataSetJoin} from '@/services/data/tuples/subject-types';
import React, {Fragment, useEffect} from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {useJoinEventBus} from './join-event-bus';
import {JoinEventTypes} from './join-event-bus-types';

export const Join2DefEventBridge = (props: { subject: Subject, join: SubjectDataSetJoin }) => {
	const {join} = props;

	const {fire: fireDef} = useSubjectDefEventBus();
	const {on, off} = useJoinEventBus();
	useEffect(() => {
		const onChanged = (join: SubjectDataSetJoin) => {
			fireDef(SubjectDefEventTypes.DATASET_JOIN_CHANGED, join);
		};
		on(JoinEventTypes.JOIN_TYPE_CHANGED, onChanged);
		on(JoinEventTypes.FIRST_TOPIC_CHANGED, onChanged);
		on(JoinEventTypes.FIRST_FACTOR_CHANGED, onChanged);
		on(JoinEventTypes.SECOND_TOPIC_CHANGED, onChanged);
		on(JoinEventTypes.SECOND_FACTOR_CHANGED, onChanged);
		return () => {
			off(JoinEventTypes.JOIN_TYPE_CHANGED, onChanged);
			off(JoinEventTypes.FIRST_TOPIC_CHANGED, onChanged);
			off(JoinEventTypes.FIRST_FACTOR_CHANGED, onChanged);
			off(JoinEventTypes.SECOND_TOPIC_CHANGED, onChanged);
			off(JoinEventTypes.SECOND_FACTOR_CHANGED, onChanged);
		};
	}, [on, off, fireDef, join]);

	return <Fragment/>;
};