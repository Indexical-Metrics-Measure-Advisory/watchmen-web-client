import {ParameterKind} from '@/services/data/tuples/factor-calculator-types';
import {Subject, SubjectDataSetColumn} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {useForceUpdate} from '@/widgets/basic/utils';
import {ParameterEventBusProvider, useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect} from 'react';
import {ComputedEditor} from '../../../widgets/parameter/computed';
import {ConstantValueEditor} from '../../../widgets/parameter/constant';
import {ParameterFromEditor} from '../../../widgets/parameter/param-from';
import {TopicFactorEditor} from '../../../widgets/parameter/topic-factor';
import {DeleteMeButton} from '../../../widgets/parameter/widgets';
import {useSubjectDefEventBus} from '../subject-def-event-bus';
import {SubjectDefEventTypes} from '../subject-def-event-bus-types';
import {AliasEditor} from './alias-edit';
import {Column2DefEventBridge} from './column-2-def-event-bridge';
import {ColumnEventBusProvider} from './column-event-bus';
import {Parameter2ColumnEventBridge} from './parameter-2-column-event-bridge';
import {ColumnEditContainer, ColumnEditWrapper, ColumnIndex} from './widgets';

export const ColumnEditor = (props: {
	subject: Subject;
	column: SubjectDataSetColumn;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
}) => {
	const {subject, column, availableTopics, pickedTopics} = props;

	const {fire: fireDef} = useSubjectDefEventBus();
	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	const onDeleteClicked = () => {
		const index = subject.dataset.columns.indexOf(column);
		if (index !== -1) {
			subject.dataset.columns.splice(index, 1);
			fireDef(SubjectDefEventTypes.DATASET_COLUMN_REMOVED, column);
		}
	};

	// computed parameter collapse/expand
	return <ColumnEditWrapper shorten={column.parameter.kind === ParameterKind.COMPUTED}>
		<ParameterFromEditor shorten={column.parameter.kind === ParameterKind.COMPUTED}
		                     parameter={column.parameter}/>
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
	const {subject, column, availableTopics, pickedTopics} = props;

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