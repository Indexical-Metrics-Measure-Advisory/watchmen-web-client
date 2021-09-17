import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {LineComment, PropName} from './dsl-widgets';
import {UnitPart} from './unit-part';

export const UnitsPart = (props: { pipeline: Pipeline, stage: PipelineStage, topicsMap: Map<string, Topic> }) => {
	const {pipeline, stage, topicsMap} = props;

	const stageIndex = pipeline.stages.indexOf(stage) + 1;

	return <>
		<PropName indent={1}>units</PropName>
		{
			stage.units.map((unit, unitIndex) => {
				return <Fragment key={v4()}>
					<LineComment indent={2}>Unit {stageIndex}.{unitIndex + 1}</LineComment>
					<UnitPart pipeline={pipeline} stage={stage} unit={unit} topicsMap={topicsMap}/>
				</Fragment>;
			})
		}
	</>;
};