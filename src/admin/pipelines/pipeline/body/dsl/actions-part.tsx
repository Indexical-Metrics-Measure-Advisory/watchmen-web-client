import React, {Fragment} from 'react';
import {v4} from 'uuid';
import {PipelineStage} from '../../../../../services/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '../../../../../services/tuples/pipeline-stage-unit-types';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../services/tuples/topic-types';
import {ActionPart} from './action-part';
import {LineComment, PropName} from './dsl-widgets';

export const ActionsPart = (props: { pipeline: Pipeline, stage: PipelineStage, unit: PipelineStageUnit, topicsMap: Map<string, Topic> }) => {
	const {pipeline, stage, unit, topicsMap} = props;

	const stageIndex = pipeline.stages.indexOf(stage) + 1;
	const unitIndex = stage.units.indexOf(unit) + 1;

	return <>
		<PropName indent={4}>actions</PropName>
		{
			unit.do.map((action, actionIndex) => {
				return <Fragment key={v4()}>
					<LineComment indent={5}>Action {stageIndex}.{unitIndex}.{actionIndex + 1}</LineComment>
					<ActionPart pipeline={pipeline} stage={stage} unit={unit} action={action} topicsMap={topicsMap}/>
				</Fragment>;
			})
		}
	</>;
};