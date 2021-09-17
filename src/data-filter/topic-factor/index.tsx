import {useTopicFactor} from '@/data-filter/topic-factor/use-topic-factor';
import {Lang} from '@/langs';
import {Parameter, TopicFactorParameter} from '@/services/tuples/factor-calculator-types';
import {findSelectedFactor, findSelectedTopic} from '@/services/tuples/factor-calculator-utils';
import {Factor} from '@/services/tuples/factor-types';
import {isTopicFactorParameter} from '@/services/tuples/parameter-utils';
import {Topic} from '@/services/tuples/topic-types';
import {buildFactorOptions, buildTopicOptions} from '@/shared-widgets/tuples';
import React from 'react';
import styled from 'styled-components';
import {FactorDropdown, IncorrectOptionLabel, TopicDropdown, TopicFactorEditContainer} from './widgets';

const RealTopicFactorEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: TopicFactorParameter;
}) => {
	const {parameter, availableTopics, pickedTopics, ...rest} = props;

	const {onTopicChange, onFactorChange, topicId, factorId} = useTopicFactor(parameter);

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
export const TopicFactorEdit = (props: {
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	parameter: Parameter;
}) => {
	const {parameter, availableTopics, pickedTopics, ...rest} = props;

	if (!isTopicFactorParameter(parameter)) {
		return null;
	}

	return <RealTopicFactorEdit availableTopics={availableTopics} pickedTopics={pickedTopics}
	                            parameter={parameter} {...rest}/>;
};

export const TopicFactorEditor = styled(TopicFactorEdit)`
	> div[data-widget=dropdown] {
		&:first-child {
			border-radius : 0;
			box-shadow    : var(--param-top-border), var(--param-bottom-border);
		}
		&:last-child {
			border-radius : 0 calc(var(--param-height) / 2) calc(var(--param-height) / 2) 0;
			box-shadow    : var(--param-border);
		}
		// redefine since box-shadow overridden by first-child/last-child
		&:hover,
		&:focus {
			z-index    : 1;
			box-shadow : var(--primary-hover-shadow);
		}
	}
`;
