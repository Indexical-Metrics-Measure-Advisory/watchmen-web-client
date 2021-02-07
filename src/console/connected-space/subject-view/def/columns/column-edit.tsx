import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DELETE } from '../../../../../basic-widgets/constants';
import { Subject, SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterEventBusProvider } from '../parameter/parameter-event-bus';
import { AliasEditor } from './alias-edit';
import {
	ColumnEditContainer,
	ColumnEditWrapper,
	ColumnIndex,
	ConstantValueEditor,
	DeleteColumnButton,
	ParameterTypeEditor,
	TopicFactorEditor
} from './widgets';

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
			<ColumnEditWrapper>
				<ParameterTypeEditor parameter={column.parameter}/>
				<ConstantValueEditor parameter={column.parameter}/>
				<TopicFactorEditor parameter={column.parameter} availableTopics={availableTopics}
				                   pickedTopics={pickedTopics}/>
				<AliasEditor column={column}/>
				<DeleteColumnButton>
					<FontAwesomeIcon icon={ICON_DELETE}/>
				</DeleteColumnButton>
			</ColumnEditWrapper>
		</ColumnEditContainer>
	</ParameterEventBusProvider>;
};