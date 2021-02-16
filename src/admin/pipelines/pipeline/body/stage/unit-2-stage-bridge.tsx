import React, { useEffect } from 'react';
import { PipelineStage } from '../../../../../services/tuples/pipeline-stage-types';
import { PipelineStageUnit } from '../../../../../services/tuples/pipeline-stage-unit-types';
import { useUnitEventBus } from '../unit/unit-event-bus';
import { UnitEventTypes } from '../unit/unit-event-bus-types';
import { useStageEventBus } from './stage-event-bus';
import { StageEventTypes } from './stage-event-bus-types';

export const Unit2StageBridge = (props: { stage: PipelineStage, unit: PipelineStageUnit }) => {
	const { stage, unit } = props;

	const { fire: fireStage } = useStageEventBus();
	const { on, off } = useUnitEventBus();
	useEffect(() => {
		const onUnitChanged = () => {
			fireStage(StageEventTypes.UNIT_CHANGED, unit, stage);
		};
		on(UnitEventTypes.CONDITION_CHANGED, onUnitChanged);
		on(UnitEventTypes.ACTION_ADDED, onUnitChanged);
		on(UnitEventTypes.ACTION_REMOVED, onUnitChanged);
		on(UnitEventTypes.ACTION_CHANGED, onUnitChanged);
		on(UnitEventTypes.ACTION_SORTED, onUnitChanged);
		return () => {
			off(UnitEventTypes.CONDITION_CHANGED, onUnitChanged);
			off(UnitEventTypes.ACTION_ADDED, onUnitChanged);
			off(UnitEventTypes.ACTION_REMOVED, onUnitChanged);
			off(UnitEventTypes.ACTION_CHANGED, onUnitChanged);
			off(UnitEventTypes.ACTION_SORTED, onUnitChanged);
		};
	}, [ on, off, fireStage, stage, unit ]);

	return <></>;
};