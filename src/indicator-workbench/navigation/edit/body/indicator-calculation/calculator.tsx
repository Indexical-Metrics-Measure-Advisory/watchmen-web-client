import {MeasureMethod} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
import {fetchNavigationIndicatorData} from '@/services/data/tuples/navigation';
import {Navigation, NavigationIndicator, NavigationTimeRangeType} from '@/services/data/tuples/navigation-types';
import {isNavigationIndicatorCriteriaOnExpression} from '@/services/data/tuples/navigation-utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FireTiming, useThrottler} from '@/widgets/throttler';
import {Fragment, useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData, IndicatorValues} from '../types';
import {isReadyToCalculation} from '../utils';
import {NavigationIndicatorData} from './types';

const replaceYear = (r: string) => (s: string): string => {
	return s.replace(/year/gi, r);
};
const replaceMonth = (r: string) => (s: string): string => {
	return s.replace(/month/gi, r);
};
const replaceYearMonth = (r: string) => (s: string): string => {
	return s.replace(/ym/gi, r);
};
const replaceYM = (s: string, funcs: Array<(s: string) => string>) => {
	return funcs.reduce((s, func) => func(s), s);
};

const buildYear = (navigation: Navigation): number => {
	const y = (navigation.timeRangeYear ?? `${new Date().getFullYear() - 1}`);
	if (Number.isNaN(Number(y))) {
		return new Date().getFullYear() - 1;
	} else {
		return Number(y);
	}
};
const buildMonth = (navigation: Navigation): number => {
	const m = navigation.timeRangeMonth ?? '1';
	if (Number.isNaN(Number(m))) {
		return 1;
	} else {
		return Number(m);
	}
};
const buildYM = (navigation: Navigation, current: boolean): { year: string, month: string; ym: string } => {
	const year = buildYear(navigation);
	const month = buildMonth(navigation);
	if (current) {
		return {
			year: year + '',
			month: month + '',
			ym: `${year}/${month < 10 ? `0${month}` : month}`
		};
	} else if (navigation.timeRangeType === NavigationTimeRangeType.MONTH) {
		if (month === 1) {
			return {year: (year - 1) + '', month: '12', ym: `${year - 1}/12`};
		} else {
			return {
				year: year + '',
				month: (month - 1) + '',
				ym: `${year}/${month - 1 < 10 ? `0${month - 1}` : (month - 1)}`
			};
		}
	} else {
		return {
			year: (year - 1) + '',
			month: month + '',
			ym: `${year - 1}/${month < 10 ? `0${month}` : month}`
		};
	}
};

const replace = (options: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
	current: boolean;
}) => {
	const {navigation, navigationIndicator, defData, current} = options;

	const {year, month, ym} = buildYM(navigation, current);

	return {
		...navigationIndicator,
		criteria: (navigationIndicator.criteria || []).map(criteria => {
			if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
				// eslint-disable-next-line
				const factor = (defData.topic?.factors || []).find(factor => factor.factorId == criteria.factorId);
				if (factor == null) {
					return {...criteria};
				}

				let newValue = criteria.value || '';
				const measures = tryToTransformToMeasures(factor);
				if (measures.includes(MeasureMethod.YEAR) && measures.includes(MeasureMethod.MONTH)) {
					newValue = replaceYM(newValue, [
						replaceYearMonth(ym),
						replaceYear(year),
						replaceMonth(month)
					]);
				} else if (measures.includes(MeasureMethod.YEAR)) {
					newValue = replaceYear(year)(newValue);
				} else if (measures.includes(MeasureMethod.MONTH)) {
					newValue = replaceMonth(month)(newValue);
				}
				return {...criteria, value: newValue};
			} else {
				return {...criteria};
			}
		})
	};
};

const askData = (options: {
	fire: (type: EventTypes.INVOKE_REMOTE_REQUEST, ask: () => Promise<NavigationIndicatorData>, success: (data: NavigationIndicatorData) => void, fail: () => void) => void;
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	onData: (values: IndicatorValues) => void;
	defData: IndicatorCriteriaDefData;
}) => {
	const {fire, navigation, navigationIndicator, onData, defData} = options;

	if (!isReadyToCalculation(navigation, navigationIndicator, defData)) {
		return () => onData({loaded: false, failed: false});
	}

	return (saveTime: FireTiming) => {
		if (saveTime === FireTiming.UNMOUNT) {
			return;
		}
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => {
				if (navigation.compareWithPreviousTimeRange) {
					return await fetchNavigationIndicatorData(
						replace({navigation, navigationIndicator, defData, current: true}),
						replace({navigation, navigationIndicator, defData, current: false})
					);
				} else {
					return await fetchNavigationIndicatorData(
						replace({navigation, navigationIndicator, defData, current: true})
					);
				}
			},
			({current, previous}) => {
				onData({loaded: true, failed: false, current, previous});
			},
			() => {
				onData({loaded: true, failed: true});
			});
	};
};

export const Calculator = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on: onEdit, off: offEdit, fire: fireEdit} = useNavigationEditEventBus();
	const saveQueue = useThrottler();
	useEffect(() => {
		saveQueue.replace(askData({
			fire: fireGlobal,
			navigation,
			navigationIndicator,
			onData: (values: IndicatorValues) => fireEdit(NavigationEditEventTypes.VALUES_CHANGED, navigation, navigationIndicator, values),
			defData
		}), 300);
	}, [fireGlobal, fireEdit, navigation, navigationIndicator, defData, defData.loaded, defData.topic, saveQueue]);
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			saveQueue.replace(askData({
				fire: fireGlobal,
				navigation,
				navigationIndicator,
				onData: (values: IndicatorValues) => fireEdit(NavigationEditEventTypes.VALUES_CHANGED, navigation, navigationIndicator, values),
				defData
			}), 300);
		};
		const onTimeRangeChanged = (aNavigation: Navigation) => {
			if (aNavigation !== navigation) {
				return;
			}

			saveQueue.replace(askData({
				fire: fireGlobal,
				navigation,
				navigationIndicator,
				onData: (values: IndicatorValues) => fireEdit(NavigationEditEventTypes.VALUES_CHANGED, navigation, navigationIndicator, values),
				defData
			}), 300);
		};
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		};
	}, [fireGlobal, onEdit, offEdit, fireEdit, navigation, navigationIndicator, defData, saveQueue]);

	return <Fragment/>;
};