import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import React, {Fragment, useEffect} from 'react';
import {useUnitEventBus} from '../unit/unit-event-bus';
import {UnitEventTypes} from '../unit/unit-event-bus-types';
import {useStageEventBus} from './stage-event-bus';
import {StageEventTypes} from './stage-event-bus-types';

export const Unit2StageBridge = (props: { stage: PipelineStage, unit: PipelineStageUnit }) => {
	const {stage, unit} = props;

	const {fire: fireStage} = useStageEventBus();
	const {on, off} = useUnitEventBus();
	useEffect(() => {
		const onUnitChanged = () => {
			fireStage(StageEventTypes.UNIT_CHANGED, unit, stage);
		};
		on(UnitEventTypes.RENAME_UNIT, onUnitChanged);
		on(UnitEventTypes.LOOP_VARIABLE_CHANGED, onUnitChanged);
		on(UnitEventTypes.CONDITION_CHANGED, onUnitChanged);
		on(UnitEventTypes.ACTION_ADDED, onUnitChanged);
		on(UnitEventTypes.ACTION_REMOVED, onUnitChanged);
		on(UnitEventTypes.ACTION_CHANGED, onUnitChanged);
		on(UnitEventTypes.ACTION_SORTED, onUnitChanged);
		return () => {
			off(UnitEventTypes.RENAME_UNIT, onUnitChanged);
			off(UnitEventTypes.LOOP_VARIABLE_CHANGED, onUnitChanged);
			off(UnitEventTypes.CONDITION_CHANGED, onUnitChanged);
			off(UnitEventTypes.ACTION_ADDED, onUnitChanged);
			off(UnitEventTypes.ACTION_REMOVED, onUnitChanged);
			off(UnitEventTypes.ACTION_CHANGED, onUnitChanged);
			off(UnitEventTypes.ACTION_SORTED, onUnitChanged);
		};
	}, [on, off, fireStage, stage, unit]);

	return <Fragment/>;
};