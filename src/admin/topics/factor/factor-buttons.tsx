import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_DELETE, ICON_ROW_PREPEND_ON_RIGHT} from '@/widgets/basic/constants';
import {ButtonInk, TooltipAlignment} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';
import {createFactor} from '../utils';
import {FactorButton, FactorButtonsContainer} from './widgets';

export const FactorButtons = (props: { topic: Topic, factor: Factor }) => {
	const {topic, factor} = props;

	const {fire} = useTopicEventBus();

	const onFactorDeleteClicked = () => {
		topic.factors = topic.factors.filter(exists => exists !== factor);
		fire(TopicEventTypes.FACTOR_REMOVED, factor);
	};
	const onInsertBeforeClicked = () => {
		const index = topic.factors.indexOf(factor);
		const newFactor = createFactor(topic);
		topic.factors.splice(index, 0, newFactor);
		fire(TopicEventTypes.FACTOR_ADDED, newFactor);
	};

	return <FactorButtonsContainer>
		<FactorButton tooltip={{label: 'Prepend Factor', alignment: TooltipAlignment.CENTER}}
		              ink={ButtonInk.PRIMARY}
		              onClick={onInsertBeforeClicked}>
			<FontAwesomeIcon icon={ICON_ROW_PREPEND_ON_RIGHT} rotation={270}/>
		</FactorButton>
		<FactorButton tooltip={{label: 'Delete Factor', alignment: TooltipAlignment.CENTER}}
		              ink={ButtonInk.DANGER}
		              onClick={onFactorDeleteClicked}>
			<FontAwesomeIcon icon={ICON_DELETE}/>
		</FactorButton>
	</FactorButtonsContainer>;

};