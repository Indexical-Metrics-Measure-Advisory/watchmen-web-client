import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_DELETE} from '../../../../../../../basic-widgets/constants';
import {
	MappingFactor,
	MappingRow,
	WriteTopicAction
} from '../../../../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '../../../../../../../services/tuples/topic-types';
import {AggregateArithmeticEditor} from '../../aggregate-arithmetic';
import {FactorPicker} from '../../factor-picker';
import {SingleParameter} from '../../single-parameter';
import {useFactorsMappingEventBus} from '../factors-mapping-event-bus';
import {FactorsMappingEventTypes} from '../factors-mapping-event-bus-types';
import {FactorMappingContainer, FactorMappingLeadLabel, RemoveMeButton} from './widgets';
import {AnyFactorType} from '../../../../../../../services/tuples/factor-calculator-types';

export const FactorMapping = (props: {
	action: WriteTopicAction & MappingRow;
	mapping: MappingFactor;
	source: Topic;
	target?: Topic;
}) => {
	const {action, mapping, source, target} = props;

	const {fire} = useFactorsMappingEventBus();

	const onArithmeticChanged = () => {
		fire(FactorsMappingEventTypes.MAPPING_CHANGED, mapping);
	};
	const onRemoveClicked = () => {
		const index = action.mapping.indexOf(mapping);
		if (index !== -1) {
			action.mapping.splice(index, 1);
			fire(FactorsMappingEventTypes.MAPPING_REMOVED, mapping);
		}
	};

	const mappingIndex = action.mapping.indexOf(mapping) + 1;

	return <FactorMappingContainer>
		<FactorMappingLeadLabel>#{mappingIndex}</FactorMappingLeadLabel>
		{/*TODO expected types of source parameter and target factor should be matched */}
		{/* assume any type is valid now */}
		<SingleParameter action={action} parameter={mapping.source} topics={[source]}
		                 expectedTypes={[AnyFactorType.ANY]}/>
		<AggregateArithmeticEditor holder={mapping} onChange={onArithmeticChanged}/>
		<FactorPicker holder={mapping} topic={target}/>
		<RemoveMeButton onClick={onRemoveClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</RemoveMeButton>
	</FactorMappingContainer>;
};