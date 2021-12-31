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
	/**
	 * {@link NavigationEditEventTypes#INDICATOR_REMOVED},
	 * {@link NavigationEditEventTypes#VALUES_CALCULATED}
	 */
	shouldAvoidIndicatorRemovedAndValuesCalculated: (navigation: Navigation, navigationIndicator: NavigationIndicator) => boolean;
	/**
	 * {@link NavigationEditEventTypes#INDICATOR_FORMULA_CHANGED}
	 */
	shouldAvoidFormulaChanged: (navigation: Navigation, navigationIndicator: NavigationIndicator) => boolean;
	compute: (data: AllCalculatedIndicatorValuesData) => AllIndicatedValuesCalculationResult;
	onComputed: (result: AllIndicatedValuesCalculationResult) => void;
}) => {
	const {
		navigation,
		shouldAvoidIndicatorRemovedAndValuesCalculated, shouldAvoidFormulaChanged,
		compute, onComputed
	} = options;

	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const [allValues, setAllValues] = useState<AllCalculatedIndicatorValues>({
		data: [],
		calculated: false,
		failed: false,
		shouldComputeScore: false
	});
	useEffect(() => {
		const defendNavigation = (navigation: Navigation, navigationIndicator: NavigationIndicator, func: () => void) => {
			if (shouldAvoidIndicatorRemovedAndValuesCalculated(navigation, navigationIndicator)) {
				return;
			}
			func();
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
		const onFormulaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (shouldAvoidFormulaChanged(aNavigation, aNavigationIndicator)) {
				return;
			}
			calculate();
		};
		onEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		onEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		onEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
			offEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
			offEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		};
	}, [onEdit, offEdit,
		navigation, allValues,
		shouldAvoidIndicatorRemovedAndValuesCalculated, shouldAvoidFormulaChanged,
		compute, onComputed
	]);

	return allValues;
};