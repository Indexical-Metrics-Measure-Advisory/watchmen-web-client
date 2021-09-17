import {Subject, SubjectDataSetColumn} from '@/services/data/tuples/subject-types';
import React, {Fragment, useEffect} from 'react';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {useColumnEventBus} from './column-event-bus';
import {ColumnEventTypes} from './column-event-bus-types';

export const Column2DefEventBridge = (props: { subject: Subject, column: SubjectDataSetColumn }) => {
	const {column} = props;

	const {fire: fireDef} = useSubjectDefEventBus();
	const {on, off} = useColumnEventBus();
	useEffect(() => {
		const onChanged = () => {
			fireDef(SubjectDefEventTypes.DATASET_COLUMN_CHANGED, column);
		};
		on(ColumnEventTypes.CONTENT_CHANGED, onChanged);
		on(ColumnEventTypes.ALIAS_CHANGED, onChanged);
		return () => {
			off(ColumnEventTypes.CONTENT_CHANGED, onChanged);
			off(ColumnEventTypes.ALIAS_CHANGED, onChanged);
		};
	}, [on, off, fireDef, column]);

	return <Fragment/>;
};