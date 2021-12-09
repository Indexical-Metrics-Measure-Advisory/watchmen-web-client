import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import React, {Fragment, useEffect} from 'react';
import {usePipelineEventBus} from '../../pipeline-event-bus';
import {PipelineEventTypes} from '../../pipeline-event-bus-types';
import {useActionEventBus} from '../action/action-event-bus';
import {ActionEventTypes} from '../action/action-event-bus-types';
import {useUnitEventBus} from './unit-event-bus';
import {UnitEventTypes} from './unit-event-bus-types';

export const Action2UnitBridge = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
}) => {
	const {pipeline, stage, unit, action} = props;

	const {fire: firePipeline} = usePipelineEventBus();
	const {fire: fireUnit} = useUnitEventBus();
	const {on, off} = useActionEventBus();
	useEffect(() => {
		const onActionChanged = () => {
			fireUnit(UnitEventTypes.ACTION_CHANGED, action, unit);
			firePipeline(PipelineEventTypes.ACTION_CHANGED, pipeline, stage, unit, action);
		};
		on(ActionEventTypes.ACTION_TYPE_CHANGED, onActionChanged);
		on(ActionEventTypes.ACTION_CONTENT_CHANGED, onActionChanged);
		return () => {
			off(ActionEventTypes.ACTION_TYPE_CHANGED, onActionChanged);
			off(ActionEventTypes.ACTION_CONTENT_CHANGED, onActionChanged);
		};
	}, [firePipeline, on, off, fireUnit, pipeline, stage, unit, action]);

	return <Fragment/>;
};