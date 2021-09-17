import {useTopicFactor} from '@/data-filter/topic-factor/use-topic-factor';
import {Parameter, TopicFactorParameter, ValueTypes} from '@/services/tuples/factor-calculator-types';
import {
	findSelectedFactor,
	findSelectedTopic,
	isFactorTypeCompatibleWith
} from '@/services/tuples/factor-calculator-utils';
import {Factor} from '@/services/tuples/factor-types';
import {isTopicFactorParameter} from '@/services/tuples/parameter-utils';
import {Topic} from '@/services/tuples/topic-types';
import {buildFactorOptions, buildTopicOptions} from '@/shared-widgets/tuples';
import React from 'react';
import {FactorDropdown, IncorrectOptionLabel, TopicDropdown, TopicFactorEditContainer} from './widgets';

const RealTopicFactorEditor = (props: {
	parameter: TopicFactorParameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
}) => {
	const {parameter, topics, expectedTypes} = props;

	const {onTopicChange, onFactorChange, topicId, factorId} = useTopicFactor(parameter);

	const {selected: selectedTopic, extra: extraTopic} = findSelectedTopic(topics, topicId);
	const {selected: selectedFactor, extra: extraFactor} = findSelectedFactor(selectedTopic, factorId);

	const isValid = (factor: Factor) => {
		return selectedTopic !== extraTopic && factor !== extraFactor && isFactorTypeCompatibleWith(factor.type, expectedTypes);
	};

	const topicOptions = buildTopicOptions({
		topics, extraTopic, toExtraNode: (topic: Topic) => {
			return <IncorrectOptionLabel>{topic.name}</IncorrectOptionLabel>;
		}
	});
	const factorOptions = buildFactorOptions({
		topic: selectedTopic, extraFactor,
		isValid,
		toExtraNode: (factor: Factor) => {
			return <IncorrectOptionLabel>{factor.label || factor.name}</IncorrectOptionLabel>;
		}
	});

	const topicValid = !selectedTopic || selectedTopic !== extraTopic;
	const factorValid = !selectedFactor || isValid(selectedFactor);

	return <TopicFactorEditContainer>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}
		               please="Topic?"
		               valid={topicValid}/>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}
		                please="Factor?"
		                valid={factorValid}/>
	</TopicFactorEditContainer>;
};

export const TopicFactorEditor = (props: {
	parameter: Parameter;
	topics: Array<Topic>;
	expectedTypes: ValueTypes;
}) => {
	const {parameter, topics, expectedTypes} = props;

	if (!isTopicFactorParameter(parameter)) {
		return null;
	}

	return <RealTopicFactorEditor parameter={parameter} topics={topics} expectedTypes={expectedTypes}/>;
};
