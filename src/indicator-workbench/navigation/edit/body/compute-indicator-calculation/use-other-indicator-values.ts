import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {isNotNull} from '@/services/data/utils';
import {PropOf} from '@/services/types';
import {useEffect, useState} from 'react';
import {interpolation, toNumber, useIndicatorValuesAggregator} from '../indicator-values-calculator';
import {AllCalculatedIndicatorValues} from '../types';

const buildScoreComputer = (navigationIndicator: NavigationIndicator) => {
	return (data: PropOf<AllCalculatedIndicatorValues, 'data'>): Pick<AllCalculatedIndicatorValues, 'failed' | 'failureReason' | 'shouldComputeScore' | 'score'> => {
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
						r: values.ratio?.value,
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

export const useOtherIndicatorValues = (navigation: Navigation, navigationIndicator: NavigationIndicator) => {
	const [functions, setFunctions] = useState(() => {
		return {
			avoidValuesEvent: (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
				return aNavigation !== navigation && navigationIndicator === aNavigationIndicator;
			},
			computeScore: buildScoreComputer(navigationIndicator)
		};
	});
	const calculatedValues = useIndicatorValuesAggregator({
		navigation,
		shouldAvoidEvent: functions.avoidValuesEvent,
		compute: functions.computeScore
	});
	useEffect(() => {
		setFunctions(() => {
			return {
				avoidValuesEvent: (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
					return aNavigation !== navigation && navigationIndicator === aNavigationIndicator;
				},
				computeScore: buildScoreComputer(navigationIndicator)
			};
		});
	}, [navigation, navigationIndicator]);

	return calculatedValues;
};