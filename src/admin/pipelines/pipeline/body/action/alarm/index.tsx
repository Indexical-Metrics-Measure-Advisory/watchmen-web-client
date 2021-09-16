import React from 'react';
import {PipelineStage} from '@/services/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isAlarmAction} from '@/services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {PipelineStageUnit} from '@/services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/tuples/pipeline-types';
import {Topic} from '@/services/tuples/topic-types';
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
	topic: Topic;
}) => {
	const {action, topic} = props;

	useActionType(action);

	if (!isAlarmAction(action)) {
		return null;
	}

	return <>
		<ActionLeadLabelThin>Alarm Prerequisite:</ActionLeadLabelThin>
		<AlarmPrerequisite action={action} topic={topic}/>
		<ActionLeadLabelThin>Severity:</ActionLeadLabelThin>
		<AlarmSeverity action={action}/>
		<ActionLeadLabelThin>Message:</ActionLeadLabelThin>
		<AlarmMessage action={action}/>
	</>;
};