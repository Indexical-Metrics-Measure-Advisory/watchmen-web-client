import {DropdownOption} from '@/basic-widgets/types';
import {useForceUpdate} from '@/basic-widgets/utils';
import {TopicFactorParameter} from '@/services/tuples/factor-calculator-types';
import {Factor} from '@/services/tuples/factor-types';
import {Topic} from '@/services/tuples/topic-types';
import {useEffect} from 'react';
import {useParameterEventBus} from '../parameter-event-bus';
import {ParameterEventTypes} from '../parameter-event-bus-types';

export const useTopicFactor = (parameter: TopicFactorParameter) => {
	const {on, off, fire} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		on(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		return () => {
			off(ParameterEventTypes.FROM_CHANGED, forceUpdate);
		};
	}, [on, off, forceUpdate]);

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

	return {onTopicChange, onFactorChange, topicId, factorId};
};