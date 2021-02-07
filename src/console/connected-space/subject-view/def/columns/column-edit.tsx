import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { ICON_DELETE } from '../../../../../basic-widgets/constants';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { ParameterFrom } from '../../../../../services/tuples/factor-calculator-types';
import { Subject, SubjectDataSetColumn } from '../../../../../services/tuples/subject-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ParameterEventBusProvider, useParameterEventBus } from '../parameter/parameter-event-bus';
import { ParameterEventTypes } from '../parameter/parameter-event-bus-types';
import {
	ComputedEditor,
	ConstantValueEditor,
	DeleteMeButton,
	ParameterTypeEditor,
	TopicFactorEditor
} from '../parameter/widgets';
import { useSubjectDefEventBus } from '../subject-def-event-bus';
import { SubjectDefEventTypes } from '../subject-def-event-bus-types';
import { AliasEditor } from './alias-edit';
import { Column2DefEventBridge } from './column-2-def-event-bridge';
import { ColumnEventBusProvider } from './column-event-bus';
import { Parameter2ColumnEventBridge } from './parameter-2-column-event-bridge';
import { ColumnEditContainer, ColumnEditWrapper, ColumnIndex } from './widgets';

export const ColumnEditor = (props: {
	subject: Subject;
	column: SubjectDataSetColumn;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, column, availableTopics, pickedTopics } = props;

	const { fire: fireDef } = useSubjectDefEventBus();
	const { on, off } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	const onDeleteClicked = () => {
		const index = subject.dataset.columns.indexOf(column);
		if (index !== -1) {
			subject.dataset.columns.splice(index, 1);
			fireDef(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, column);
		}
	};

	return <ColumnEditWrapper shorten={column.parameter.from === ParameterFrom.COMPUTED}>
		<ParameterTypeEditor parameter={column.parameter}/>
		<ConstantValueEditor parameter={column.parameter}/>
		<TopicFactorEditor parameter={column.parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
		<AliasEditor column={column}/>
		<DeleteMeButton onClick={onDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</DeleteMeButton>
		<ComputedEditor parameter={column.parameter}
		                availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</ColumnEditWrapper>;
};

export const ColumnEdit = (props: {
	subject: Subject;
	column: SubjectDataSetColumn;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const { subject, column, availableTopics, pickedTopics } = props;

	const index = subject.dataset.columns.indexOf(column) + 1;

	return <ColumnEventBusProvider>
		<ParameterEventBusProvider>
			<ColumnEditContainer>
				<ColumnIndex>{index}</ColumnIndex>
				<ColumnEditor subject={subject} column={column}
				              availableTopics={availableTopics} pickedTopics={pickedTopics}/>
			</ColumnEditContainer>
			<Parameter2ColumnEventBridge subject={subject} column={column}/>
		</ParameterEventBusProvider>
		<Column2DefEventBridge subject={subject} column={column}/>
	</ColumnEventBusProvider>;
};