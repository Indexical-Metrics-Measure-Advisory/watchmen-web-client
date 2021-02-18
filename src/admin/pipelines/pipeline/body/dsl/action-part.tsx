import React from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnitAction } from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { Alarm } from './actions/alarm';
import { CopyToMemory } from './actions/copy-to-memory';
import { InsertRow } from './actions/insert-row';
import { MergeRow } from './actions/merge-row';
import { ReadFactor } from './actions/read-factor';
import { ReadRow } from './actions/read-row';
import { RowExists } from './actions/row-exists';
import { WriteFactor } from './actions/write-factor';
import { ActionType, PropName, PropNameInListFirst } from './dsl-widgets';

export const ActionPart = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topicsMap: Map<string, Topic>
}) => {
	const { action, topicsMap } = props;

	return <>
		<PropNameInListFirst indent={5}>action</PropNameInListFirst>
		<PropName indent={7}>type</PropName>
		<ActionType>{action.type}</ActionType>
		<Alarm action={action} topicsMap={topicsMap}/>
		<CopyToMemory action={action} topicsMap={topicsMap}/>
		<ReadFactor action={action} topicsMap={topicsMap}/>
		<ReadRow action={action} topicsMap={topicsMap}/>
		<RowExists action={action} topicsMap={topicsMap}/>
		<WriteFactor action={action} topicsMap={topicsMap}/>
		<InsertRow action={action} topicsMap={topicsMap}/>
		<MergeRow action={action} topicsMap={topicsMap}/>
	</>;
};