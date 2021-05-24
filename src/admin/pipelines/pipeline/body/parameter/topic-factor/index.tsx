import React, {useEffect} from 'react';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter, ValidFactorType} from '../../../../../../services/tuples/factor-calculator-types';
import {
	createUnknownFactor,
	createUnknownTopic,
	isFactorValid,
	isTopicFactorParameter
} from '../../../../../../services/tuples/factor-calculator-utils';
import {Factor} from '../../../../../../services/tuples/factor-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {FactorDropdown, IncorrectOptionLabel, TopicDropdown, TopicFactorEditContainer} from './widgets';

export const TopicFactorEditor = (props: {
	parameter: Parameter;
	topics: Array<Topic>;
	validTypes: Array<ValidFactorType>;
}) => {
	const {parameter, topics, validTypes} = props;

	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

	if (!isTopicFactorParameter(parameter)) {
		return null;
	}

	const {topicId, factorId} = parameter;

	const onTopicChange = ({value}: DropdownOption) => {
		const selectedTopic = value as Topic;
		if (selectedTopic.topicId === topicId) {
			return;
		}

		parameter.topicId = selectedTopic.topicId;
		parameter.factorId = '';
		forceUpdate();
		fire(ParameterEventTypes.TOPIC_CHANGED, parameter, selectedTopic);
		fire(ParameterEventTypes.FACTOR_CHANGED, parameter);
	};
	const onFactorChange = ({value}: DropdownOption) => {
		const selectedFactor = value as Factor;
		if (selectedFactor.factorId === factorId) {
			return;
		}
		parameter.factorId = selectedFactor.factorId;
		forceUpdate();
		fire(ParameterEventTypes.FACTOR_CHANGED, parameter, selectedFactor);
	};

	let selectedTopic: Topic | null = null, extraTopic: Topic | null = null;
	if (topicId) {
		// eslint-disable-next-line
		selectedTopic = topics.find(topic => topic.topicId == topicId) || null;
		if (!selectedTopic) {
			extraTopic = createUnknownTopic(topicId);
			selectedTopic = extraTopic;
		}
	}
	let selectedFactor: Factor | null = null, extraFactor: Factor | null = null;
	if (factorId) {
		if (selectedTopic) {
			// find factor in selected topic
			// eslint-disable-next-line
			selectedFactor = selectedTopic.factors.find(factor => factor.factorId == factorId) || null;
		}
		if (!selectedFactor) {
			extraFactor = createUnknownFactor(factorId);
			selectedFactor = extraFactor;
		}
	}

	const topicOptions = ([...topics, extraTopic].filter(x => !!x) as Array<Topic>)
		.sort((t1, t2) => t1.name.toLowerCase().localeCompare(t2.name.toLowerCase()))
		.map(topic => {
			return {
				value: topic,
				label: ({value}) => {
					if (value === extraTopic) {
						return {node: <IncorrectOptionLabel>{value.name}</IncorrectOptionLabel>, label: value.name};
					} else {
						return value.name;
					}
				},
				key: topic.topicId
			} as DropdownOption;
		});
	const factorOptions = ([...(selectedTopic?.factors || []), extraFactor].filter(x => !!x) as Array<Factor>)
		.sort((f1, f2) => (f1.label || f1.name).toLowerCase().localeCompare((f2.label || f2.name).toLowerCase()))
		.map(factor => {
			return {
				value: factor,
				label: ({value}) => {
					if (selectedTopic === extraTopic || value === extraFactor || !isFactorValid(value as Factor, validTypes)) {
						return {
							node: <IncorrectOptionLabel>{value.label || value.name}</IncorrectOptionLabel>,
							label: value.label || value.name
						};
					} else {
						return value.label || value.name;
					}
				},
				key: factor.factorId
			} as DropdownOption;
		});

	return <TopicFactorEditContainer>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}
		               please="Topic?"/>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}
		                please="Factor?"/>
	</TopicFactorEditContainer>;
};
