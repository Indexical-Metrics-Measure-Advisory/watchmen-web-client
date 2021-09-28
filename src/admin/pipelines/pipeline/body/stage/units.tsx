import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {UnitEditor} from '../unit';
import {UnitEventBusProvider} from '../unit/unit-event-bus';
import {useStageEventBus} from './stage-event-bus';
import {StageEventTypes} from './stage-event-bus-types';
import {Unit2StageBridge} from './unit-2-stage-bridge';

export const Units = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {pipeline, stage, topics, triggerTopic} = props;

	const {on, off} = useStageEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(StageEventTypes.UNIT_ADDED, forceUpdate);
		on(StageEventTypes.UNIT_REMOVED, forceUpdate);
		on(StageEventTypes.UNIT_SORTED, forceUpdate);
		return () => {
			off(StageEventTypes.UNIT_ADDED, forceUpdate);
			off(StageEventTypes.UNIT_REMOVED, forceUpdate);
			off(StageEventTypes.UNIT_SORTED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	return <>
		{stage.units.map(unit => {
			if (!unit.unitId) {
				unit.unitId = generateUuid();
			}
			return <UnitEventBusProvider key={unit.unitId}>
				<Unit2StageBridge stage={stage} unit={unit}/>
				<UnitEditor pipeline={pipeline} stage={stage} unit={unit}
				            topics={topics} triggerTopic={triggerTopic}/>
			</UnitEventBusProvider>;
		})}
	</>;
};