import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {generateUuid} from '@/services/data/tuples/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect} from 'react';
import {ActionEditor} from '../action';
import {ActionEventBusProvider} from '../action/action-event-bus';
import {Action2UnitBridge} from './action-2-unit-bridge';
import {useUnitEventBus} from './unit-event-bus';
import {UnitEventTypes} from './unit-event-bus-types';

export const Actions = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {pipeline, stage, unit, topics, triggerTopic} = props;

	const {on, off} = useUnitEventBus();
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
	}, [on, off, forceUpdate]);

	return <>
		{unit.do.map(action => {
			if (!action.actionId) {
				action.actionId = generateUuid();
			}
			return <ActionEventBusProvider key={action.actionId}>
				<Action2UnitBridge pipeline={pipeline} stage={stage} unit={unit} action={action}/>
				<ActionEditor pipeline={pipeline} stage={stage} unit={unit} action={action}
				              topics={topics} triggerTopic={triggerTopic}/>
			</ActionEventBusProvider>;
		})}
	</>;
};