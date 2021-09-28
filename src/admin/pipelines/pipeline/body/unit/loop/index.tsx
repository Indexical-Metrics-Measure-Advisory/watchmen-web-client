import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {LeadLabel} from '../../widgets';
import {Variable} from './variable';

export const UnitLoopVariableName = (props: {
	unit: PipelineStageUnit;
	triggerTopic: Topic;
}) => {
	const {unit} = props;

	return <>
		<LeadLabel>Loop Variable Name:</LeadLabel>
		<Variable unit={unit}/>
	</>;
};