import React from 'react';
import { DropdownOption } from '../../../basic-widgets/types';
import { useForceUpdate } from '../../../basic-widgets/utils';
import { Factor, FactorType } from '../../../services/tuples/factor-types';
import { Topic } from '../../../services/tuples/topic-types';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';
import { FactorPropDropdown, FactorTypeCellContainer } from './widgets';

// const prepareFactorPainting = (topic: Topic, factor: Factor) => {
// 	const { type: topicType } = topic;
// 	if (topicType !== TopicType.RAW) {
// 		// nested factor type is not allowed, unless it is a raw topic
// 		const { type: factorType } = factor;
// 		if (factorType === FactorType.OBJECT) {
// 			return {
// 				pass: false,
// 				typeOptions: FactorTypeOptions.filter(({ value }) => value !== FactorType.ARRAY)
// 					.map(option => {
// 						return option.value !== FactorType.OBJECT ? option : {
// 							value: FactorType.OBJECT,
// 							label: <IncorrectFactorType>Nested Object</IncorrectFactorType>
// 						};
// 					})
// 			};
// 		} else if (factorType === FactorType.ARRAY) {
// 			return {
// 				pass: false,
// 				typeOptions: FactorTypeOptions.filter(({ value }) => value !== FactorType.OBJECT)
// 					.map(option => {
// 						return option.value !== FactorType.ARRAY ? option : {
// 							value: FactorType.ARRAY,
// 							label: <IncorrectFactorType>Nested Array</IncorrectFactorType>
// 						};
// 					})
// 			};
// 		} else {
// 			return {
// 				pass: true,
// 				typeOptions: FactorTypeOptions.filter(({ value }) => value !== FactorType.ARRAY && value !== FactorType.OBJECT)
// 			};
// 		}
// 	} else {
// 		return { pass: true, typeOptions: FactorTypeOptions };
// 	}
// };

const buildTypeOptions = (topic: Topic, factor: Factor) => {
	const FactorTypeOptions: Array<DropdownOption & { value: FactorType }> = [
		{ value: FactorType.TEXT, label: 'Text' },
		{ value: FactorType.NUMBER, label: 'Number' },
		{ value: FactorType.BOOLEAN, label: 'Boolean' },
		{ value: FactorType.DATETIME, label: 'DateTime' },
		{ value: FactorType.ENUM, label: 'Enumeration' },
		{ value: FactorType.SEQUENCE, label: 'Sequence' },
		{ value: FactorType.OBJECT, label: 'Nested Object' },
		{ value: FactorType.ARRAY, label: 'Nested Array' }
	];

	return FactorTypeOptions;
};

export const FactorTypeCell = (props: { topic: Topic, factor: Factor }) => {
	const { topic, factor } = props;

	const { fire } = useTopicEventBus();
	const forceUpdate = useForceUpdate();
	const onFactorTypeChange = (option: DropdownOption) => {
		factor.type = option.value as FactorType;
		forceUpdate();
		fire(TopicEventTypes.FACTOR_TYPE_CHANGED, factor);
	};

	const options = buildTypeOptions(topic, factor);

	return <FactorTypeCellContainer>
		<FactorPropDropdown value={factor.type} options={options} onChange={onFactorTypeChange}/>
	</FactorTypeCellContainer>;
};