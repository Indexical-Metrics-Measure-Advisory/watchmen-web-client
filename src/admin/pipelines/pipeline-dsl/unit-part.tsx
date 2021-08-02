import React from 'react';
import {PipelineStage} from '../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {Topic} from '../../../services/tuples/topic-types';
import {ActionsPart} from './actions-part';
import {ConditionalLine} from './conditonal';
import {PropName, PropNameInListFirst, PropValue, VariableName} from './dsl-widgets';

export const UnitPart = (props: { pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, topicsMap: Map<string, Topic> }) => {
	const {pipeline, stage, unit, topicsMap} = props;

	return <>
		<PropNameInListFirst indent={2}>- unit</PropNameInListFirst>
		<PropName indent={4}>name</PropName>
		<PropValue>{unit.name}</PropValue>
		<PropName indent={4}>loop-with</PropName>
		{unit.loopVariableName && unit.loopVariableName.trim().length !== 0
			? <VariableName>{unit.loopVariableName}</VariableName>
			: null
		}
		<ConditionalLine conditional={unit} topicsMap={topicsMap} indent={4}/>
		<ActionsPart pipeline={pipeline} stage={stage} unit={unit} topicsMap={topicsMap}/>
	</>;
};
