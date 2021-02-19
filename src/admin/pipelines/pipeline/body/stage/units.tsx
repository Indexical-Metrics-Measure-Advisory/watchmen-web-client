import React, { useEffect } from 'react';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { generateUuid } from '../../../../../services/tuples/utils';
import { UnitEditor } from '../unit';
import { UnitEventBusProvider } from '../unit/unit-event-bus';
import { useStageEventBus } from './stage-event-bus';
import { StageEventTypes } from './stage-event-bus-types';
import { Unit2StageBridge } from './unit-2-stage-bridge';

export const Units = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, topics, topic } = props;

	const { on, off } = useStageEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(StageEventTypes.UNIT_ADDED, forceUpdate);
		on(StageEventTypes.UNIT_REMOVED, forceUpdate);
		return () => {
			off(StageEventTypes.UNIT_ADDED, forceUpdate);
			off(StageEventTypes.UNIT_REMOVED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <>
		{stage.units.map(unit => {
			if (!unit.unitId) {
				unit.unitId = generateUuid();
			}
			return <UnitEventBusProvider key={unit.unitId}>
				<Unit2StageBridge stage={stage} unit={unit}/>
				<UnitEditor pipeline={pipeline} stage={stage} unit={unit}
				            topics={topics} topic={topic}/>
			</UnitEventBusProvider>;
		})}
	</>;
};