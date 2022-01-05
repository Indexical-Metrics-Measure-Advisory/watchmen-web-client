import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {isXaNumber} from '@/services/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Fragment, useEffect, useState} from 'react';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {CalculatedIndicatorValues, IndicatorValues} from './types';

export const toNumber = (x: any): number | '' => {
	if (x == null || !isXaNumber(x)) {
		return '';
	}
	try {
		const v = Number(x);
		return Number.isNaN(v) ? '' : v;
	} catch {
		return '';
	}
};

export const formatToNumber = (x: any, fractionDigits: number = 2) => {
	const v = toNumber(x);
	return v === '' ? '' : v.toFixed(fractionDigits);
};

export const computeRatio = (currentValue: any, previousValue: any): number => {
	const current = toNumber(currentValue);
	const previous = toNumber(previousValue);
	if (current === '') {
		return 0;
	} else if (previous === '' || previous === 0) {
		return 100;
	} else {
		return (current - previous) / previous * 100;
	}
};

export type ComputedScore = { ratio: number, score?: number, useScore: boolean, error?: string };
// interpolation(r, 0.1, 10, 0.5, 100)
export const interpolation = (value: any, min: number, minScore: number, max: number, maxScore: number) => {
	const v = toNumber(value);
	if (v === '') {
		// not a number, score 0
		return minScore ?? 0;
	}

	if (v <= min) {
		return minScore ?? 0;
	} else if (v >= max) {
		return maxScore;
	} else {
		return (minScore ?? 0) + Number(((maxScore - minScore) * (v - min) / (max - min)).toFixed(1));
	}
};

const doComputeScore = (options: { script: string, current?: number, previous?: number, ratio: number }): { score?: number, error?: string } => {
	const {script, current, previous, ratio} = options;

	try {
		const mathFunctionNames = Object.getOwnPropertyNames(Math);
		const runScript = script.split('\n')
			.filter(x => x != null && x.trim().length !== 0)
			.map((line, index, lines) => {
				return lines.length === index + 1 ? `return ${line}` : line;
			}).join('\n');
		const args = ['c', 'p', 'r', ...mathFunctionNames, 'interpolation', runScript];
		// eslint-disable-next-line
		const func = new Function(...args);
		const params = [
			current, previous, ratio / 100,
			// @ts-ignore
			...mathFunctionNames.map(name => Math[name]),
			interpolation
		];
		return {score: func(...params)};
	} catch (e: any) {
		console.groupCollapsed('Navigation Indicator Formula Script Error');
		console.error(e);
		console.groupEnd();
		return {error: e.message || 'Navigation Indicator Formula Script Error.'};
	}
};

const shouldComputeScore = (script?: string) => {
	return script != null && script.trim().length !== 0;
};
const computeScore = (options: {
	script?: string;
	current?: number;
	previous?: number;
}): ComputedScore => {
	const {script, current, previous} = options;
	const ratio = computeRatio(current, previous);

	const useScore = shouldComputeScore(script);
	if (useScore) {
		const score = doComputeScore({script: script!, current, previous, ratio});
		return {ratio, useScore: true, ...score};
	} else {
		return {ratio, useScore: false};
	}
};

const asValuePair = (value?: number, fractionDigits: number = 2): { value: number, formatted: string } | undefined => {
	if (value == null) {
		return (void 0);
	}

	return {value, formatted: formatToNumber(value, fractionDigits)};
};

const doCompute = (navigationIndicator: NavigationIndicator, values: IndicatorValues): CalculatedIndicatorValues => {
	if (!values.loaded) {
		return {
			loaded: false,
			loadFailed: false,
			calculated: false,
			calculateFailed: false,
			shouldComputeScore: shouldComputeScore(navigationIndicator.formula)
		};
	} else if (values.failed) {
		return {
			loaded: true,
			loadFailed: true,
			calculated: false,
			calculateFailed: false,
			shouldComputeScore: shouldComputeScore(navigationIndicator.formula)
		};
	} else {
		const {ratio, useScore, score, error} = computeScore({
			script: navigationIndicator.formula,
			current: values.current,
			previous: values.previous
		});
		return {
			loaded: true,
			loadFailed: false,
			calculated: true,
			calculateFailed: error != null && error.trim().length !== 0,
			calculateFailureReason: error,
			current: asValuePair(values.current),
			previous: asValuePair(values.previous),
			ratio: asValuePair(ratio),
			score: asValuePair(score, 1),
			shouldComputeScore: useScore
		};
	}
};

/**
 * calculate {@link CalculatedIndicatorValues} on
 * 1. {@link NavigationEditEventTypes#VALUES_CHANGED},
 * 2. {@link NavigationEditEventTypes#INDICATOR_FORMULA_CHANGED}.
 * only used on non-compute indicator
 */
export const IndicatorValuesCalculator = (props: { navigation: Navigation, navigationIndicator: NavigationIndicator }) => {
	const {navigation, navigationIndicator} = props;

	const {on, off, fire} = useNavigationEditEventBus();
	const [calculatedValues, setCalculatedValues] = useState<CalculatedIndicatorValues>({
		loaded: false,
		loadFailed: false,
		calculated: false,
		calculateFailed: false,
		shouldComputeScore: shouldComputeScore(navigationIndicator.formula)
	});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		fire(NavigationEditEventTypes.VALUES_CALCULATED, navigation, navigationIndicator, calculatedValues);
	}, [fire, navigation, navigationIndicator, calculatedValues]);
	useEffect(() => {
		const onValuesChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, values: IndicatorValues) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			// calculate since indicator values changed
			setCalculatedValues(doCompute(navigationIndicator, values));
		};
		on(NavigationEditEventTypes.VALUES_CHANGED, onValuesChanged);
		return () => {
			off(NavigationEditEventTypes.VALUES_CHANGED, onValuesChanged);
		};
	}, [on, off, navigation, navigationIndicator]);
	useEffect(() => {
		const onFormulaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			// recalculate since formula changed
			if (calculatedValues.loaded && !calculatedValues.loadFailed) {
				setCalculatedValues(doCompute(navigationIndicator, {
					loaded: true,
					failed: false,
					current: calculatedValues.current?.value,
					previous: calculatedValues.previous?.value
				}));
			}
		};
		on(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		return () => {
			off(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onFormulaChanged);
		};
	}, [on, off, forceUpdate, navigation, navigationIndicator, calculatedValues]);
	useEffect(() => {
		const onAskCalculatedValues = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, onData: (values: CalculatedIndicatorValues) => void) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}
			onData(calculatedValues);
		};
		on(NavigationEditEventTypes.ASK_CALCULATED_VALUES, onAskCalculatedValues);
		return () => {
			off(NavigationEditEventTypes.ASK_CALCULATED_VALUES, onAskCalculatedValues);
		};
	}, [on, off, navigation, navigationIndicator, calculatedValues]);

	return <Fragment/>;
};

/**
 * handle my {@link NavigationEditEventTypes#VALUES_CALCULATED}.
 */
export const useIndicatorValuesCalculator = (navigation: Navigation, navigationIndicator: NavigationIndicator) => {
	const {on, off} = useNavigationEditEventBus();
	const [calculatedValues, setCalculatedValues] = useState<CalculatedIndicatorValues>({
		loaded: false,
		loadFailed: false,
		calculated: false,
		calculateFailed: false,
		shouldComputeScore: shouldComputeScore(navigationIndicator.formula)
	});
	useEffect(() => {
		const onValuesCalculated = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, values: CalculatedIndicatorValues) => {
			if (navigation !== aNavigation || navigationIndicator !== aNavigationIndicator) {
				return;
			}

			setCalculatedValues(values);
		};
		on(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		return () => {
			off(NavigationEditEventTypes.VALUES_CALCULATED, onValuesCalculated);
		};
	}, [on, off, navigation, navigationIndicator]);

	return calculatedValues;
};
