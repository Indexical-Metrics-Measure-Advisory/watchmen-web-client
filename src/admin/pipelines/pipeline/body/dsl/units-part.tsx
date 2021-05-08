import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {PipelineStage} from '../../../../../services/tuples/pipeline-stage-types';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../services/tuples/topic-types';
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