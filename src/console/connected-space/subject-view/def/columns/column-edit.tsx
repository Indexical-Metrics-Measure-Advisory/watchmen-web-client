import React from 'react';
import { Subject, SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterEventBusProvider } from '../parameter/parameter-event-bus';
import { ParameterTypeEdit } from '../parameter/parameter-type-edit';
import { ColumnEditContainer, ColumnIndex } from './widgets';

export const ColumnEdit = (props: {
	subject: Subject;
	column: SubjectDataSetColumn;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, column, availableTopics, pickedTopics } = props;

	const index = subject.dataset.columns.indexOf(column) + 1;

	return <ParameterEventBusProvider>
		<ColumnEditContainer>
			<ColumnIndex>{index}</ColumnIndex>
			<ParameterTypeEdit parameter={column.parameter}/>
		</ColumnEditContainer>
	</ParameterEventBusProvider>;
};