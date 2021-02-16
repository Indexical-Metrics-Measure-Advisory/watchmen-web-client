import React from 'react';
import { PipelineStageUnit } from '../../../../../../services/tuples/pipeline-stage-unit-types';
import { Topic } from '../../../../../../services/tuples/topic-types';
import { ConditionalEditor } from '../../conditional';
import { useUnitEventBus } from '../unit-event-bus';
import { UnitEventTypes } from '../unit-event-bus-types';

export const Prerequisite = (props: {
	unit: PipelineStageUnit;
	topic: Topic;
}) => {
	const { unit, topic } = props;

	const { fire } = useUnitEventBus();

	const onConditionTypeChange = () => {
		fire(UnitEventTypes.CONDITION_CHANGED, unit);
	};

	return <ConditionalEditor conditional={unit} topics={[ topic ]} onChange={onConditionTypeChange}/>;
};