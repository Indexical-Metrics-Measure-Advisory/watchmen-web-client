import {Parameter, ParameterKind, TopicFactorParameter} from '@/services/data/tuples/factor-calculator-types';
import {Subject, SubjectDataSetJoin} from '@/services/data/tuples/subject-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useParameterEventBus} from '@/widgets/parameter/parameter-event-bus';
import {ParameterEventTypes} from '@/widgets/parameter/parameter-event-bus-types';
import React, {useEffect} from 'react';
import {TopicFactorEditor} from '../../../widgets/parameter/topic-factor';
import {useJoinEventBus} from './join-event-bus';
import {JoinEventTypes} from './join-event-bus-types';
import {JoinTopicFactorEditContainer} from './widgets';

export const JoinTopicFactorEdit = (props: {
	subject: Subject;
	join: SubjectDataSetJoin;
	availableTopics: Array<Topic>;
	pickedTopics: Array<Topic>;
	first: boolean
}) => {
	const {
		join,
		availableTopics, pickedTopics,
		first
	} = props;

	const {fire: fireJoin} = useJoinEventBus();
	const {on, off} = useParameterEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onTopicChanged = (parameter: Parameter) => {
			if (first) {
				join.topicId = (parameter as TopicFactorParameter).topicId;
				fireJoin(JoinEventTypes.FIRST_TOPIC_CHANGED, join);
			} else {
				join.secondaryTopicId = (parameter as TopicFactorParameter).topicId;
				fireJoin(JoinEventTypes.SECOND_TOPIC_CHANGED, join);
			}
		};
		const onFactorChanged = (parameter: Parameter) => {
			if (first) {
				join.factorId = (parameter as TopicFactorParameter).factorId;
				fireJoin(JoinEventTypes.FIRST_FACTOR_CHANGED, join);
			} else {
				join.secondaryFactorId = (parameter as TopicFactorParameter).factorId;
				fireJoin(JoinEventTypes.SECOND_FACTOR_CHANGED, join);
			}
		};
		on(ParameterEventTypes.TOPIC_CHANGED, onTopicChanged);
		on(ParameterEventTypes.FACTOR_CHANGED, onFactorChanged);
		return () => {
			off(ParameterEventTypes.TOPIC_CHANGED, onTopicChanged);
			off(ParameterEventTypes.FACTOR_CHANGED, onFactorChanged);
		};
	}, [fireJoin, on, off, forceUpdate, join, first]);

	const parameter = {
		kind: ParameterKind.TOPIC,
		topicId: first ? join.topicId : join.secondaryTopicId,
		factorId: first ? join.factorId : join.secondaryFactorId
	};

	return <JoinTopicFactorEditContainer>
		<TopicFactorEditor parameter={parameter}
		                   availableTopics={availableTopics} pickedTopics={pickedTopics}/>
	</JoinTopicFactorEditContainer>;
};
