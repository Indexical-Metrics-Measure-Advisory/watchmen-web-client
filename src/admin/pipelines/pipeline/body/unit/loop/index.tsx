import React from 'react';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {LeadLabel} from '../../widgets';
import {Variable} from './variable';
import {isUnitLoopVariableEnabled} from '../../../../../feature-switch';

export const UnitLoopVariableName = (props: {
	unit: PipelineStageUnit;
	topic: Topic;
}) => {
	if (!isUnitLoopVariableEnabled()) {
		return null;
	}

	const {unit} = props;

	return <>
		<LeadLabel>Loop Variable Name:</LeadLabel>
		<Variable unit={unit}/>
	</>;
};