import React, { useEffect } from 'react';
import { v4 } from 'uuid';
import { useForceUpdate } from '../../../../../basic-widgets/utils';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { Pipeline } from '../../../../../services/tuples/pipeline-types';
import { Topic } from '../../../../../services/tuples/topic-types';
import { ActionEditor } from '../action';
import { ActionEventBusProvider } from '../action/action-event-bus';
import { Action2UnitBridge } from './action-2-unit-bridge';
import { useUnitEventBus } from './unit-event-bus';
import { UnitEventTypes } from './unit-event-bus-types';

export const Actions = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	topics: Array<Topic>;
	topic: Topic;
}) => {
	const { pipeline, stage, unit, topics, topic } = props;

	const { on, off } = useUnitEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(UnitEventTypes.ACTION_ADDED, forceUpdate);
		on(UnitEventTypes.ACTION_REMOVED, forceUpdate);
		on(UnitEventTypes.ACTION_SORTED, forceUpdate);
		return () => {
			off(UnitEventTypes.ACTION_ADDED, forceUpdate);
			off(UnitEventTypes.ACTION_REMOVED, forceUpdate);
			off(UnitEventTypes.ACTION_SORTED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	return <>
		{unit.do.map(action => {
			return <ActionEventBusProvider key={v4()}>
				<Action2UnitBridge unit={unit} action={action}/>
				<ActionEditor pipeline={pipeline} stage={stage} unit={unit} action={action}
				              topics={topics} topic={topic}/>
			</ActionEventBusProvider>;
		})}
	</>;
};