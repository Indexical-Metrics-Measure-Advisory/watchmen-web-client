import {Indicator} from '@/services/data/tuples/indicator-types';
import {fetchNavigationIndicatorData} from '@/services/data/tuples/navigation';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {isXaNumber} from '@/services/utils';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import {SaveTime, useSavingQueue} from '@/widgets/saving-queue';
import {useEffect, useState} from 'react';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from './types';
import {isReadyToCalculation} from './utils';
import {
	IndicatorCalculationNode,
	IndicatorCalculationValue,
	IndicatorCalculationVariableName,
	IndicatorPartRelationLine
} from './widgets';

interface Values {
	loaded: boolean;
	failed: boolean;
	current?: number;
	previous?: number;
}

interface NavigationIndicatorData {
	current?: number;
	previous?: number;
}

const askData = (options: {
	fire: (type: EventTypes.INVOKE_REMOTE_REQUEST, ask: () => Promise<NavigationIndicatorData>, success: (data: NavigationIndicatorData) => void, fail: () => void) => void;
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	onData: (value: (((prevState: Values) => Values) | Values)) => void;
	defData: IndicatorCriteriaDefData;
}) => {
	const {fire, navigation, navigationIndicator, onData, defData} = options;

	if (!isReadyToCalculation(navigation, navigationIndicator, defData)) {
		return () => onData({loaded: false, failed: false});
	}

	return (saveTime: SaveTime) => {
		if (saveTime === SaveTime.UNMOUNT) {
			return;
		}
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchNavigationIndicatorData(navigationIndicator, navigationIndicator),
			({current, previous}) => {
				onData({loaded: true, failed: false, current, previous});
			}, () => {
				onData({loaded: true, failed: true});
			});
	};
};

const toNumber = (x: any): number | '' => {
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
const formatToNumber = (x: any, fractionDigits: number = 2) => {
	const v = toNumber(x);
	return v === '' ? '' : v.toFixed(fractionDigits);
};

export const IndicatorCalculation = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	indicator: Indicator;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, defData} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on: onEdit, off: offEdit} = useNavigationEditEventBus();
	const saveQueue = useSavingQueue();
	const [values, setValues] = useState<Values>({loaded: false, failed: false});
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		saveQueue.replace(askData({
			fire: fireGlobal,
			navigation,
			navigationIndicator,
			onData: setValues,
			defData
		}), 300);
	}, [fireGlobal, navigation, navigationIndicator, defData, defData.loaded, defData.topic, saveQueue]);
	useEffect(() => {
		const onIndicatorCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator) {
				return;
			}

			saveQueue.replace(askData({
				fire: fireGlobal,
				navigation,
				navigationIndicator,
				onData: setValues,
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
				onData: setValues,
				defData
			}), 300);
			forceUpdate();
		};
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		};
	}, [fireGlobal, onEdit, offEdit, forceUpdate, navigation, navigationIndicator, defData, saveQueue]);

	if (!isReadyToCalculation(navigation, navigationIndicator, defData)) {
		return null;
	}

	const index = (navigation.indicators || []).indexOf(navigationIndicator) + 1;
	const currentValue = formatToNumber(values.current);
	const previousValue = formatToNumber(values.previous);
	const ratio = (() => {
		const current = toNumber(values.current);
		const previous = toNumber(values.previous);
		if (current === '') {
			return '0.00';
		} else if (previous === '') {
			return '100.00';
		} else {
			return ((current - previous) / previous * 100).toFixed(2);
		}
	})();

	return <>
		<IndicatorPartRelationLine/>
		<IndicatorCalculationNode error={values.failed} warn={!values.loaded}>
			<IndicatorCalculationVariableName compact={true}>v{index}:</IndicatorCalculationVariableName>
			<IndicatorCalculationVariableName>[</IndicatorCalculationVariableName>
			<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.CURRENT_VALUE}=</IndicatorCalculationVariableName>
			<IndicatorCalculationValue>{currentValue}</IndicatorCalculationValue>
			{navigation.compareWithPreviousTimeRange
				? <>
					<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
					<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.PREVIOUS_VALUE}=</IndicatorCalculationVariableName>
					<IndicatorCalculationValue>{previousValue}</IndicatorCalculationValue>
					<IndicatorCalculationVariableName compact={true}>,</IndicatorCalculationVariableName>
					<IndicatorCalculationVariableName>{Lang.INDICATOR_WORKBENCH.NAVIGATION.INCREMENT_RATIO}=</IndicatorCalculationVariableName>
					<IndicatorCalculationValue>{ratio}</IndicatorCalculationValue>
					<IndicatorCalculationValue>%</IndicatorCalculationValue>
				</>
				: null}
			<IndicatorCalculationVariableName>]</IndicatorCalculationVariableName>
		</IndicatorCalculationNode>
	</>;
};