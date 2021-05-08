import React from 'react';
import {PipelineStageUnit} from '../../../../../../services/tuples/pipeline-stage-unit-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {LeadLabel} from '../../widgets';
import {Variable} from "./variable";

export const UnitLoopVariableName = (props: {
	unit: PipelineStageUnit;
	topic: Topic;
}) => {
	const {unit} = props;

	return <>
		<LeadLabel>Loop Variable Name:</LeadLabel>
		<Variable unit={unit}/>
	</>;
};