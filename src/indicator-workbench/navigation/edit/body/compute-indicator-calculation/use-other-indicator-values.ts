import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {useIndicatorValuesAggregator} from '../indicator-values-calculator';
import {computeScore} from './utils';

export const useOtherIndicatorValues = (navigation: Navigation, navigationIndicator: NavigationIndicator) => {
	const [avoidValuesEvent, setAvoidValuesEvent] = useState(() => {
		return (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			return aNavigation !== navigation && navigationIndicator === aNavigationIndicator;
		};
	});
	const calculatedValues = useIndicatorValuesAggregator({
		navigation,
		shouldAvoidEvent: avoidValuesEvent,
		compute: computeScore
	});
	useEffect(() => {
		setAvoidValuesEvent(() => {
			return (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
				return aNavigation !== navigation && navigationIndicator === aNavigationIndicator;
			};
		});
	}, [navigation, navigationIndicator]);

	return calculatedValues;
};