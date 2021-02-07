import React, { useState } from 'react';
import { v4 } from 'uuid';
import { Subject } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { useDataVisible } from '../data/use-data-visible';
import { ColumnEdit } from './column-edit';
import { ColumnsEditContainer } from './widgets';

export const ColumnsEdit = (props: {
	subject: Subject;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, availableTopics, pickedTopics } = props;

	const [ isVisible ] = useState(() => () => subject.dataset.columns.length !== 0);
	const visible = useDataVisible(isVisible);

	return <ColumnsEditContainer visible={visible}>
		{subject.dataset.columns.map(column => {
			return <ColumnEdit subject={subject} column={column}
			                   availableTopics={availableTopics} pickedTopics={pickedTopics}
			                   key={v4()}/>;
		})}
	</ColumnsEditContainer>;
};