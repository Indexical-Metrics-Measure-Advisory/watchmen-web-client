import React, { useEffect } from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Parameter } from '../../../../../../services/tuples/factor-calculator-types';
import { isTopicFactorParameter } from '../../../../../../services/tuples/factor-calculator-utils';
import { Factor, FactorType } from '../../../../../../services/tuples/factor-types';
import { Topic, TopicType } from '../../../../../../services/tuples/topic-types';
import { getCurrentTime } from '../../../../../../services/utils';
import { useParameterEventBus } from '../parameter/parameter-event-bus';
import { ParameterEventTypes } from '../parameter/parameter-event-bus-types';
import { FactorDropdown, IncorrectOptionLabel, TopicDropdown, TopicFactorEditContainer } from './widgets';

const createUnknownTopic = (topicId: string): Topic => {
	return {
		topicId,
		name: 'Unknown Topic',
		type: TopicType.SYSTEM,
		factors: [] as Array<Factor>,
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};
const createUnknownFactor = (factorId: string): Factor => {
	return {
		factorId,
		name: 'Unknown Factor',
		type: FactorType.TEXT,
		label: '',
		createTime: getCurrentTime(),
		lastModifyTime: getCurrentTime()
	};
};

export const TopicFactorEditor = (props: { parameter: Parameter; topics: Array<Topic> }) => {
	const { parameter, topics } = props;

	const { on, off, fire } = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [ on, off, forceUpdate ]);

	if (!isTopicFactorParameter(parameter)) {
		return null;
	}

	const { topicId, factorId } = parameter;

	const onTopicChange = ({ value }: DropdownOption) => {
		const selectedTopic = value as Topic;
		if (selectedTopic.topicId === topicId) {
			return;
		}

		parameter.topicId = selectedTopic.topicId;
		parameter.factorId = '';
		forceUpdate();
		fire(ParameterEventTypes.TOPIC_CHANGED, parameter, selectedTopic);
	};
	const onFactorChange = ({ value }: DropdownOption) => {
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

	const topicOptions = ([ ...topics, extraTopic ].filter(x => !!x) as Array<Topic>)
		.sort((t1, t2) => t1.name.toLowerCase().localeCompare(t2.name.toLowerCase()))
		.map(topic => {
			return {
				value: topic,
				label: ({ value }) => {
					if (value === extraTopic) {
						return <IncorrectOptionLabel>{value.name}</IncorrectOptionLabel>;
					} else {
						return value.name;
					}
				},
				key: topic.topicId
			} as DropdownOption;
		});
	const factorOptions = ([ ...(selectedTopic?.factors || []), extraFactor ].filter(x => !!x) as Array<Factor>)
		.sort((f1, f2) => (f1.label || f1.name).toLowerCase().localeCompare((f2.label || f2.name).toLowerCase()))
		.map(factor => {
			return {
				value: factor,
				label: ({ value }) => {
					if (selectedTopic === extraTopic || value === extraFactor) {
						return <IncorrectOptionLabel>{value.label || value.name}</IncorrectOptionLabel>;
					} else {
						return value.label || value.name;
					}
				},
				key: factor.factorId
			} as DropdownOption;
		});

	return <TopicFactorEditContainer>
		<TopicDropdown value={selectedTopic} options={topicOptions} onChange={onTopicChange}
		               please='Topic?'/>
		<FactorDropdown value={selectedFactor} options={factorOptions} onChange={onFactorChange}
		                please='Factor?'/>
	</TopicFactorEditContainer>;
};
