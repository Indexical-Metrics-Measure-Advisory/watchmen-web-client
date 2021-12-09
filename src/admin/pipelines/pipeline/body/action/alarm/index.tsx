import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isAlarmAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {useActionType} from '../action-effect/use-action-type';
import {ActionLeadLabelThin} from '../widgets';
import {AlarmMessage} from './alarm-message';
import {AlarmSeverity} from './alarm-severity';
import {AlarmPrerequisite} from './prerequisite';

export const Alarm = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {action, triggerTopic} = props;

	useActionType(action);

	if (!isAlarmAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Alarm Prerequisite:</ActionLeadLabelThin>
		<AlarmPrerequisite action={action} topic={triggerTopic}/>
		<ActionLeadLabelThin>Severity:</ActionLeadLabelThin>
		<AlarmSeverity action={action}/>
		<ActionLeadLabelThin>Message:</ActionLeadLabelThin>
		<AlarmMessage action={action}/>
	</>;
};