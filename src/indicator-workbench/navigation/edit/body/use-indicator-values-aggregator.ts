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

const needApplyComputed = (computed: AllIndicatedValuesCalculationResult, current: AllCalculatedIndicatorValues) => {
	if (!current.calculated) {
		return true;
	}

	const {failed, failureReason, shouldComputeScore, score} = computed;

	// eslint-disable-next-line
	return current.failed != failed
		// eslint-disable-next-line
		|| current.failureReason != failureReason
		// eslint-disable-next-line
		|| current.shouldComputeScore != shouldComputeScore
		// eslint-disable-next-line
		|| current.score?.value != score?.value;
};

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
	/**
	 * {@link NavigationEditEventTypes#INDICATOR_SCORE_INCLUDE_CHANGED}
	 */
	shouldAvoidScoreIncludeChanged: (navigation: Navigation, navigationIndicator: NavigationIndicator) => boolean;
	compute: (data: AllCalculatedIndicatorValuesData) => AllIndicatedValuesCalculationResult;
	onComputed: (result: AllIndicatedValuesCalculationResult) => void;
}) => {
	const {
		navigation,
		shouldAvoidIndicatorRemovedAndValuesCalculated, shouldAvoidFormulaChanged, shouldAvoidScoreIncludeChanged,
		compute, onComputed
	} = options;

	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const [allValues] = useState<AllCalculatedIndicatorValues>({
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
			const computed = compute(allValues.data);
			if (needApplyComputed(computed, allValues)) {
				// only applied when need to
				// value change guard is obligatory, since in following scenario will cause an infinite recursion.
				// e.g. there are 2 aggregators, typically 2 compute indicators
				// 1. when aggregator A is computed, fires a {@link NavigationEditEventTypes.VALUES_CALCULATED} event,
				// 2. aggregator B will capture the event, and do calculation,
				//    and fire a {@link NavigationEditEventTypes.VALUES_CALCULATED} event,
				// 3. aggregator A will capture the event from step #1 and #2, event from #1 is ignored,
				//    but event from #2 is consumed (which is already done in step 1).
				//    therefore, a {@link NavigationEditEventTypes.VALUES_CALCULATED} event will be fired again,
				//    and step 2 will be triggerred again ,
				// so stack overflows.
				const {failed, failureReason, shouldComputeScore, score} = computed;
				allValues.calculated = true;
				allValues.failed = failed;
				allValues.failureReason = failureReason;
				allValues.shouldComputeScore = shouldComputeScore;
				allValues.score = score;
				onComputed({failed, failureReason, shouldComputeScore, score});
			}
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
		const onScoreIncludeChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (shouldAvoidScoreIncludeChanged(aNavigation, aNavigationIndicator)) {
				return;
			}
			calculate();
		};
		onEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
		onEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		onEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_SCORE_INCLUDE_CHANGED, onScoreIncludeChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_REMOVED, onIndicatorRemoved);
			offEdit(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
			offEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_SCORE_INCLUDE_CHANGED, onScoreIncludeChanged);
		};
	}, [
		onEdit, offEdit,
		navigation, allValues,
		shouldAvoidIndicatorRemovedAndValuesCalculated, shouldAvoidFormulaChanged, shouldAvoidScoreIncludeChanged,
		compute, onComputed
	]);

	return allValues;
};