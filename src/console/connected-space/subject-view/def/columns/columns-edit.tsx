import {Subject} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
import {v4} from 'uuid';
import {useColumnsDataVisible} from '../data/use-columns-data-visible';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {ColumnEdit} from './column-edit';
import {ColumnsEditContainer} from './widgets';

export const ColumnsEdit = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, availableTopics, pickedTopics} = props;

	const {on, off} = useSubjectDefEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(SubjectDefEventTypes.DATASET_COLUMN_ADDED, forceUpdate);
		on(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, forceUpdate);
		return () => {
			off(SubjectDefEventTypes.DATASET_COLUMN_ADDED, forceUpdate);
			off(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, forceUpdate);
		};
	}, [on, off, forceUpdate]);
	const [isVisible] = useState(() => () => subject.dataset.columns.length !== 0);
	const visible = useColumnsDataVisible(isVisible);

	return <ColumnsEditContainer visible={visible}>
		{subject.dataset.columns.map(column => {
			return <ColumnEdit subject={subject} column={column}
			                   availableTopics={availableTopics} pickedTopics={pickedTopics}
			                   key={v4()}/>;
		})}
	</ColumnsEditContainer>;
};