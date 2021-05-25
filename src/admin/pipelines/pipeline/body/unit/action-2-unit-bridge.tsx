import React, {useEffect} from 'react';
import {PipelineStageUnitAction} from '../../../../../services/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {PipelineStageUnit} from '../../../../../services/tuples/pipeline-stage-unit-types';
import {useActionEventBus} from '../action/action-event-bus';
import {ActionEventTypes} from '../action/action-event-bus-types';
import {useUnitEventBus} from './unit-event-bus';
import {UnitEventTypes} from './unit-event-bus-types';
import {usePipelineEventBus} from '../../pipeline-event-bus';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {PipelineEventTypes} from '../../pipeline-event-bus-types';
import {PipelineStage} from '../../../../../services/tuples/pipeline-stage-types';

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

	return <></>;
};