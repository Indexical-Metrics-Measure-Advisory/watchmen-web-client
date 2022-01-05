import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {isNotNull} from '@/services/data/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Fragment, useEffect, useState} from 'react';
import {interpolation, toNumber} from '../indicator-values-calculator';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {
	AllCalculatedIndicatorValuesData,
	AllIndicatedValuesCalculationResult,
	CalculatedIndicatorValues
} from '../types';
import {useIndicatorValuesAggregator} from '../use-indicator-values-aggregator';

const buildScoreComputer = (navigationIndicator: NavigationIndicator) => {
	return (data: AllCalculatedIndicatorValuesData): AllIndicatedValuesCalculationResult => {
		const script = navigationIndicator.formula;
		if (script == null || script.trim().length === 0) {
			return {
				failed: false,
				shouldComputeScore: false
			};
		}

		const indicators = data.filter(({indicator}) => {
			return indicator !== navigationIndicator && isNotNull(indicator.variableName);
		});
		try {
			const mathFunctionNames = Object.getOwnPropertyNames(Math);
			const runScript = script.split('\n')
				.filter(x => x != null && x.trim().length !== 0)
				.map((line, index, lines) => {
					return lines.length === index + 1 ? `return ${line}` : line;
				}).join('\n');
			const args = [
				...(indicators.map(({indicator: {variableName}}) => variableName) as Array<string>),
				...mathFunctionNames,
				'interpolation',
				runScript];
			// eslint-disable-next-line
			const func = new Function(...args);
			const params = [
				...indicators.map(({values}) => {
					return {
						c: values.current?.value,
						p: values.previous?.value,
						r: values.ratio?.value != null ? (values.ratio.value / 100) : (void 0),
						s: values.score?.value
					};
				}),
				// @ts-ignore
				...mathFunctionNames.map(name => Math[name]),
				interpolation
			];
			const score = toNumber(func(...params));
			return {
				failed: false,
				shouldComputeScore: true,
				score: score === '' ? (void 0) : {
					value: Number(score),
					formatted: Number(score).toFixed(1)
				}
			};
		} catch (e: any) {
			console.groupCollapsed('Navigation Indicator Formula Script Error');
			console.error(e);
			console.groupEnd();
			return {
				failed: true,
				failureReason: e.message || 'Navigation Indicator Formula Script Error.',
				shouldComputeScore: true
			};
		}
	};
};

const buildIndicatorRemovedAndValuesCalculatedAvoidHandler = (nav1: Navigation, ni1: NavigationIndicator) => {
	return (nav2: Navigation, ni2: NavigationIndicator) => nav1 !== nav2 || ni1 === ni2;
};
const buildFormulaChangedAvoidHandler = (nav1: Navigation, ni1: NavigationIndicator) => {
	return (nav2: Navigation, ni2: NavigationIndicator) => nav1 !== nav2 || ni1 !== ni2;
};
const alwaysAvoidScoreIncludeChanged = () => true;

const buildCalculatedIndicatorValues = (result: AllIndicatedValuesCalculationResult): CalculatedIndicatorValues => {
	return {
		loaded: true,
		loadFailed: false,
		calculated: true,
		calculateFailed: result.failed,
		calculateFailureReason: result.failureReason,
		score: result.score,
		shouldComputeScore: result.shouldComputeScore
	};
};

export const OtherIndicatorValuesCalculator = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator
}) => {
	const {navigation, navigationIndicator} = props;

	const {on, off, fire} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	const [functions, setFunctions] = useState(() => {
		return {
			shouldAvoidIndicatorRemovedAndValuesCalculated: buildIndicatorRemovedAndValuesCalculatedAvoidHandler(navigation, navigationIndicator),
			shouldAvoidFormulaChanged: buildFormulaChangedAvoidHandler(navigation, navigationIndicator),
			computeScore: buildScoreComputer(navigationIndicator),
			onComputed: (result: AllIndicatedValuesCalculationResult) => {
				fire(NavigationEditEventTypes.VALUES_CALCULATED, navigation, navigationIndicator, buildCalculatedIndicatorValues(result));
				forceUpdate();
			}
		};
	});
	const allValues = useIndicatorValuesAggregator({
		navigation,
		shouldAvoidIndicatorRemovedAndValuesCalculated: functions.shouldAvoidIndicatorRemovedAndValuesCalculated,
		shouldAvoidFormulaChanged: functions.shouldAvoidFormulaChanged,
		shouldAvoidScoreIncludeChanged: alwaysAvoidScoreIncludeChanged,
		compute: functions.computeScore,
		onComputed: functions.onComputed
	});
	useEffect(() => {
		setFunctions(() => {
			return {
				shouldAvoidIndicatorRemovedAndValuesCalculated: buildIndicatorRemovedAndValuesCalculatedAvoidHandler(navigation, navigationIndicator),
				shouldAvoidFormulaChanged: buildFormulaChangedAvoidHandler(navigation, navigationIndicator),
				computeScore: buildScoreComputer(navigationIndicator),
				onComputed: (result: AllIndicatedValuesCalculationResult) => {
					fire(NavigationEditEventTypes.VALUES_CALCULATED, navigation, navigationIndicator, buildCalculatedIndicatorValues(result));
					forceUpdate();
				}
			};
		});
	}, [fire, forceUpdate, navigation, navigationIndicator]);
	useEffect(() => {
		const onAskCalculatedValues = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, onData: (values: CalculatedIndicatorValues) => void) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			onData(buildCalculatedIndicatorValues(allValues));
		};
		on(NavigationEditEventTypes.ASK_CALCULATED_VALUES, onAskCalculatedValues);
		return () => {
			off(NavigationEditEventTypes.ASK_CALCULATED_VALUES, onAskCalculatedValues);
		};
	}, [on, off, navigation, navigationIndicator, allValues]);

	return <Fragment/>;
};