import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isAlarmAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ConditionalLine} from '../conditonal';
import {PropName, PropValue} from '../dsl-widgets';

export const Alarm = (props: { action: PipelineStageUnitAction, topicsMap: Map<string, Topic> }) => {
	const {action, topicsMap} = props;

	if (!isAlarmAction(action)) {
		return null;
	}

	return <>
		<PropName indent={7}>severity</PropName>
		<PropValue>{action.severity}</PropValue>
		<ConditionalLine conditional={action} topicsMap={topicsMap} indent={7}/>
		<PropName indent={7}>message</PropName>
		<PropValue>{action.message}</PropValue>
	</>;
};