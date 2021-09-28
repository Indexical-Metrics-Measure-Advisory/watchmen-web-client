import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {ConditionalEditor} from '../../conditional';
import {LeadLabel} from '../../widgets';
import {useUnitEventBus} from '../unit-event-bus';
import {UnitEventTypes} from '../unit-event-bus-types';

export const UnitPrerequisite = (props: {
	unit: PipelineStageUnit;
	triggerTopic: Topic;
}) => {
	const {unit, triggerTopic} = props;

	const {fire} = useUnitEventBus();

	const onConditionTypeChange = () => {
		fire(UnitEventTypes.CONDITION_CHANGED, unit);
	};

	return <>
		<LeadLabel>Unit Prerequisite:</LeadLabel>
		<ConditionalEditor conditional={unit} topics={[triggerTopic]} onChange={onConditionTypeChange}/>
	</>;
};