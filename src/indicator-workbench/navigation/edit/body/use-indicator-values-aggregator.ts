import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {
	AllCalculatedIndicatorValues,
	AllCalculatedIndicatorValuesData,
	AllIndicatedValuesCalculationResult,
	CalculatedIndicatorValues
} from './types';

/**
 * for handle changes of indicators values,
 * 1. root node
 * 2. compute indicator
 */
export const useIndicatorValuesAggregator = (options: {
	navigation: Navigation;
	shouldAvoidEvent: (navigation: Navigation, navigationIndicator: NavigationIndicator) => boolean;
	compute: (data: AllCalculatedIndicatorValuesData) => AllIndicatedValuesCalculationResult;
	onComputed: (result: AllIndicatedValuesCalculationResult) => void;
}) => {
	const {navigation, shouldAvoidEvent, compute, onComputed} = options;

	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const [allValues, setAllValues] = useState<AllCalculatedIndicatorValues>({
		data: [],
		calculated: false,
		failed: false,
		shouldComputeScore: false
	});
	useEffect(() => {
		const defendNavigation = (navigation: Navigation, navigationIndicator: NavigationIndicator, func: () => void) => {
			!shouldAvoidEvent(navigation, navigationIndicator) && func();
		};
		const calculate = () => {
			const {failed, failureReason, shouldComputeScore, score} = compute(allValues.data);
			setAllValues(values => {
				return {
					data: values.data,
					calculated: true,
					failed,
					failureReason,
					shouldComputeScore,
					score
				};
			});
			onComputed({failed, failureReason, shouldComputeScore, score});
		};
		const onIndicatorRemoved = (aNavigation: Navigation, navigationIndicator: NavigationIndicator) => {
			defendNavigation(aNavigation, navigationIndicator, () => {
				const index = allValues.data.findIndex(({indicator}) => indicator === navigationIndicator);
				if (index !== -1) {
					allValues.data.splice(index, 1);
				}
				calculate();
			});
		};
		const onValuesCalculated = (aNavigation: Navigation, navigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues) => {
			defendNavigation(aNavigation, navigationIndicator, () => {
				const pair = allValues.data.find(({indicator}) => indicator === navigationIndicator);
				if (pair == null) {
					allValues.data.push({indicator: navigationIndicator, values});
				} else {
					pair.values = values;
				}
				calculate();
			});
		};
		onEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		onEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
			offEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		};
	}, [onEdit, offEdit, navigation, allValues, shouldAvoidEvent, compute, onComputed]);

	return allValues;
};