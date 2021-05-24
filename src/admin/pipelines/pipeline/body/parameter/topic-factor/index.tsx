import React, {useEffect} from 'react';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Parameter, ValidFactorType} from '../../../../../../services/tuples/factor-calculator-types';
import {
	findSelectedFactor,
	findSelectedTopic,
	isFactorValid,
	isTopicFactorParameter
} from '../../../../../../services/tuples/factor-calculator-utils';
import {Factor} from '../../../../../../services/tuples/factor-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {useParameterEventBus} from '../parameter/parameter-event-bus';
import {ParameterEventTypes} from '../parameter/parameter-event-bus-types';
import {FactorDropdown, IncorrectOptionLabel, TopicDropdown, TopicFactorEditContainer} from './widgets';
import {buildFactorOptions, buildTopicOptions} from '../../../../../../shared-widgets/tuples';

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

	const {selected: selectedTopic, extra: extraTopic} = findSelectedTopic(topics, topicId);
	const {selected: selectedFactor, extra: extraFactor} = findSelectedFactor(selectedTopic, factorId);

	const topicOptions = buildTopicOptions({
		topics, extraTopic, toExtraNode: (topic: Topic) => {
			return <IncorrectOptionLabel>{topic.name}</IncorrectOptionLabel>;
		}
	});
	const factorOptions = buildFactorOptions({
		topic: selectedTopic, extraFactor,
		isValid: (factor: Factor) => selectedTopic !== extraTopic && factor !== extraFactor && isFactorValid(factor, validTypes),
		toExtraNode: (factor: Factor) => {
			return <IncorrectOptionLabel>{factor.label || factor.name}</IncorrectOptionLabel>;
		}
	});

	return <TopicFactorEditContainer>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}
		               please="Topic?"/>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}
		                please="Factor?"/>
	</TopicFactorEditContainer>;
};
