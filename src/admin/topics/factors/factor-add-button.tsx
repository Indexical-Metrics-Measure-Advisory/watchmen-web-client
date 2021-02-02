import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { DwarfButton } from '../../../basic-widgets/button';
import { ICON_ADD } from '../../../basic-widgets/constants';
import { ButtonInk } from '../../../basic-widgets/types';
import { FactorType } from '../../../services/tuples/factor-types';
import { Topic } from '../../../services/tuples/topic-types';
import { generateUuid } from '../../../services/tuples/utils';
import { useTopicEventBus } from '../topic-event-bus';
import { TopicEventTypes } from '../topic-event-bus-types';

export const FactorAddButton = (props: { topic: Topic }) => {
	const { topic } = props;

	const { fire } = useTopicEventBus();

	const onFactorAddClicked = () => {
		const factor = { factorId: generateUuid(), name: '', label: '', type: FactorType.TEXT };
		topic.factors.push(factor);
		fire(TopicEventTypes.FACTOR_ADDED, factor);
	};

	return <DwarfButton ink={ButtonInk.PRIMARY} onClick={onFactorAddClicked}>
		<FontAwesomeIcon icon={ICON_ADD}/>
		<span>Append Factor</span>
	</DwarfButton>;
};