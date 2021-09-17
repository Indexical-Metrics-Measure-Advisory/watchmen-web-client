import {Topic} from '@/services/data/tuples/topic-types';
import {DwarfButton} from '@/widgets/basic/button';
import {ICON_ADD} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {createFactor} from '../utils';

export const FactorAddButton = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useTopicEventBus();

	const onFactorAddClicked = () => {
		const factor = createFactor(topic);
		topic.factors.push(factor);
		fire(TopicEventTypes.FACTOR_ADDED, factor);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onFactorAddClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>Append Factor</span>
	</DwarfButton>;
};