import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { ICON_DELETE } from '../../../../../basic-widgets/constants';
import { Subject, SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterEventBusProvider } from '../parameter/parameter-event-bus';
import { useSubjectDefEventBus } from '../subject-def-event-bus';
import { SubjectDefEventTypes } from '../subject-def-event-bus-types';
import { AliasEditor } from './alias-edit';
import { ColumnEventBusProvider } from './column-event-bus';
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

	const {fire: fireDef} = useSubjectDefEventBus();
	const onDeleteClicked = () => {
		const index = subject.dataset.columns.indexOf(column);
		if (index !== -1) {
			subject.dataset.columns.splice(index, 1);
			fireDef(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, column);
		}
	}

	const index = subject.dataset.columns.indexOf(column) + 1;

	return <ColumnEventBusProvider>
		<ParameterEventBusProvider>
			<ColumnEditContainer>
				<ColumnIndex>{index}</ColumnIndex>
				<ColumnEditWrapper>
					<ParameterTypeEditor parameter={column.parameter}/>
					<ConstantValueEditor parameter={column.parameter}/>
					<TopicFactorEditor parameter={column.parameter} availableTopics={availableTopics}
					                   pickedTopics={pickedTopics}/>
					<AliasEditor column={column}/>
					<DeleteColumnButton onClick={onDeleteClicked}>
						<FontAwesomeIcon icon={ICON_DELETE}/>
					</DeleteColumnButton>
				</ColumnEditWrapper>
			</ColumnEditContainer>
		</ParameterEventBusProvider>
	</ColumnEventBusProvider>;
};