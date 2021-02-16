import React from 'react';
import {
	MappingFactor,
	MappingRow,
	WriteTopicAction
} from '../../../../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import { Topic } from '../../../../../../../services/tuples/topic-types';
import { LeadLabel } from '../../../widgets';
import { useActionEventBus } from '../../action-event-bus';
import { ActionEventTypes } from '../../action-event-bus-types';
import { AggregateArithmeticEditor } from '../../aggregate-arithmetic';
import { FactorPicker } from '../../factor-picker';
import { SingleParameter } from '../../single-parameter';
import { FactorMappingContainer } from './widgets';

export const FactorMapping = (props: {
	action: WriteTopicAction & MappingRow;
	mapping: MappingFactor;
	source: Topic;
	target?: Topic;
}) => {
	const { action, mapping, source, target } = props;

	const { fire } = useActionEventBus();

	const onArithmeticChanged = () => {
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	return <FactorMappingContainer>
		<LeadLabel>Value From:</LeadLabel>
		<SingleParameter action={action} parameter={mapping.source} topics={[ source ]}/>
		<LeadLabel>Write As:</LeadLabel>
		<AggregateArithmeticEditor holder={mapping} onChange={onArithmeticChanged}/>
		<LeadLabel>Write To:</LeadLabel>
		<FactorPicker holder={mapping} topic={target}/>
	</FactorMappingContainer>;
};