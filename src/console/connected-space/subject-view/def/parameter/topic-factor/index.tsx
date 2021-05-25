import React, {useEffect} from 'react';
import styled from 'styled-components';
import {DropdownOption} from '../../../../../../basic-widgets/types';
import {useForceUpdate} from '../../../../../../basic-widgets/utils';
import {Lang} from '../../../../../../langs';
import {Parameter} from '../../../../../../services/tuples/factor-calculator-types';
import {findSelectedFactor, findSelectedTopic} from '../../../../../../services/tuples/factor-calculator-utils';
import {Factor} from '../../../../../../services/tuples/factor-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {useParameterEventBus} from '../parameter-event-bus';
import {ParameterEventTypes} from '../parameter-event-bus-types';
import {FactorDropdown, IncorrectOptionLabel, TopicDropdown, TopicFactorEditContainer} from './widgets';
import {buildFactorOptions, buildTopicOptions} from '../../../../../../shared-widgets/tuples';
import {isTopicFactorParameter} from '../../../../../../services/tuples/parameter-utils';

export const TopicFactorEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: Parameter;
}) => {
	const {parameter, availableTopics, pickedTopics, ...rest} = props;

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

	const {
		selected: selectedTopic,
		extra: extraTopic
	} = findSelectedTopic(pickedTopics, topicId, Lang.PLAIN.UNKNOWN_TOPIC_NAME);
	const {
		selected: selectedFactor,
		extra: extraFactor
	} = findSelectedFactor(selectedTopic, factorId, Lang.PLAIN.UNKNOWN_FACTOR_NAME);

	const topicOptions = buildTopicOptions({
		topics: pickedTopics, extraTopic, toExtraNode: (topic: Topic) => {
			return <IncorrectOptionLabel>{topic.name}</IncorrectOptionLabel>;
		}
	});
	const factorOptions = buildFactorOptions({
		topic: selectedTopic, extraFactor,
		isValid: (factor: Factor) => selectedTopic !== extraTopic && factor !== extraFactor,
		toExtraNode: (factor: Factor) => {
			return <IncorrectOptionLabel>{factor.label || factor.name}</IncorrectOptionLabel>;
		}
	});

	return <TopicFactorEditContainer {...rest}>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}/>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}/>
	</TopicFactorEditContainer>;
};

export const TopicFactorEditor = styled(TopicFactorEdit)`
	> div[data-widget=dropdown] {
		&:first-child {
			border-radius: 0;
			box-shadow: var(--param-top-border), var(--param-bottom-border);
		}
		&:last-child {
			border-radius: 0 calc(var(--param-height) / 2) calc(var(--param-height) / 2) 0;
			box-shadow: var(--param-border);
		}
		// redefine since box-shadow overridden by first-child/last-child
		&:hover,
		&:focus {
			z-index: 1;
			box-shadow: var(--primary-hover-shadow);
		}
	}
`;
