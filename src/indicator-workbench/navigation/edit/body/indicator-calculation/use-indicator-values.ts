import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorValues} from '../types';

export const useIndicatorValues = (navigation: Navigation, navigationIndicator: NavigationIndicator) => {
	const {on, off} = useNavigationEditEventBus();
	const [values, setValues] = useState<IndicatorValues>({loaded: false, failed: false});
	useEffect(() => {
		const onValuesChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, values: IndicatorValues) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			setValues(values);
		};
		on(NavigationEditEventTypes.VALUES_CHANGED, onValuesChanged);
		return () => {
			off(NavigationEditEventTypes.VALUES_CHANGED, onValuesChanged);
		};
	}, [on, off, navigation, navigationIndicator]);

	return {values};
};