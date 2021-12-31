import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {AllCalculatedIndicatorValues, CalculatedIndicatorValues} from '../types';

interface OtherIndicatorValues extends AllCalculatedIndicatorValues {
	calculated: boolean;
	failed: boolean;
	score?: { value: number, formatted: string };
	shouldComputeScore: boolean;
}

export const useOtherIndicatorValues = (navigation: Navigation, navigationIndicator: NavigationIndicator) => {
	const {on, off} = useNavigationEditEventBus();
	const [values, setValues] = useState<OtherIndicatorValues>({
		calculated: false,
		failed: false,
		data: [],
		shouldComputeScore: false
	});
	useEffect(() => {
		const onValuesCalculated = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues) => {
			if (aNavigation !== navigation || aNavigationIndicator === navigationIndicator) {
				return;
			}

			// TODO do calculation
		};
		on(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		return () => {
			off(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		};
	}, [on, off, navigation, navigationIndicator]);

	return values;
};