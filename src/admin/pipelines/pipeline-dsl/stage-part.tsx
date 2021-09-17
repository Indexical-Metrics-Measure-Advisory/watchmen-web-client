import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ConditionalLine} from './conditonal';
import {PropName, PropValue} from './dsl-widgets';
import {UnitsPart} from './units-part';

export const StagePart = (props: { pipeline: Pipeline, stage: PipelineStage, topicsMap: Map<string, Topic> }) => {
	const {pipeline, stage, topicsMap} = props;

	return <>
		<PropName>stage</PropName>
		<PropName indent={1}>name</PropName>
		<PropValue>{stage.name}</PropValue>
		<ConditionalLine conditional={stage} topicsMap={topicsMap} indent={1}/>
		<UnitsPart pipeline={pipeline} stage={stage} topicsMap={topicsMap}/>
	</>;
};