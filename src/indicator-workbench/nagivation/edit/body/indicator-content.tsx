import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {ICON_EXCLAMATION_MARK} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useEffect, useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {IndicatorCalculationNode, IndicatorCriteriaNode, IndicatorPartRelationLine} from './widgets';

interface TopicState {
	loaded: boolean;
	topic?: Topic;
}

export const NavigationIndicatorContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
}) => {
	const {navigation, navigationIndicator, indicator} = props;

	const {fire} = useNavigationEventBus();
	const [topicState, setTopicState] = useState<TopicState>({loaded: false});
	useEffect(() => {
		fire(NavigationEventTypes.ASK_TOPIC, indicator.topicId, (topic?: Topic) => {
			setTopicState({loaded: true, topic});
		});
	}, [fire, indicator]);

	// navigationIndicator.

	return <>
		<IndicatorPartRelationLine/>
		<IndicatorCriteriaNode>
			{topicState.topic == null
				? <FontAwesomeIcon icon={ICON_EXCLAMATION_MARK}/>
				: null}
		</IndicatorCriteriaNode>
		<IndicatorPartRelationLine/>
		<IndicatorCalculationNode>

		</IndicatorCalculationNode>
	</>;
};