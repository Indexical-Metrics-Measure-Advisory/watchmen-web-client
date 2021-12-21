import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {useCriteriaValidation} from './use-criteria-validation';
import {IndicatorCriteriaNode} from './widgets';

const NameLabel = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	topic?: Topic;
}) => {
	const {navigation, navigationIndicator, topic} = props;
	const {criteria = []} = navigationIndicator;

	const {on, off} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onNameChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEditEventTypes.INDICATOR_NAME_CHANGED, onNameChanged);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_NAME_CHANGED, onNameChanged);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator]);

	if (topic == null) {
		return <>{Lang.INDICATOR_WORKBENCH.NAVIGATION.MISSED_INDICATOR_TOPIC}</>;
	} else if (criteria.length === 0) {
		return <>{Lang.INDICATOR_WORKBENCH.NAVIGATION.NO_INDICATOR_CRITERIA_DEFINED}</>;
	} else if ((navigationIndicator.name || '').trim().length === 0) {
		return <span>{criteria.length} {Lang.INDICATOR_WORKBENCH.NAVIGATION.INDICATOR_CRITERIA_DEFINED}</span>;
	} else {
		return <span>{(navigationIndicator.name || '').trim()}</span>;
	}
};

export const IndicatorCriteriaNodeContent = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = props;

	const {fire} = useNavigationEditEventBus();

	const onMouseEnter = () => {
		fire(NavigationEditEventTypes.EXPAND_CRITERIA, navigation, navigationIndicator);
	};
	const onClicked = () => {
		fire(NavigationEditEventTypes.EXPAND_CRITERIA, navigation, navigationIndicator);
	};

	const {error, warn} = useCriteriaValidation({navigation, navigationIndicator, defData});

	return <IndicatorCriteriaNode error={error} warn={warn}
	                              onMouseEnter={onMouseEnter} onClick={onClicked}>
		<NameLabel navigation={navigation} navigationIndicator={navigationIndicator}
		           topic={defData.topic}/>
	</IndicatorCriteriaNode>;
};