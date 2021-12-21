import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {isReadyToCalculation} from '../utils';

export const useCriteriaValidation = (options: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = options;

	const {on, off} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
		on(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
			off(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator]);

	const error = defData.loaded && defData.topic == null;
	const warn = !isReadyToCalculation(navigation, navigationIndicator, defData);

	return {error, warn};
};