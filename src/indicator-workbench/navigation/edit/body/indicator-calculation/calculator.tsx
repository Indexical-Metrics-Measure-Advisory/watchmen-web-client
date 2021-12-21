import {fetchNavigationIndicatorData} from '@/services/data/tuples/navigation';
import {Navigation, NavigationIndicator} from '@/services/data/tuples/navigation-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {SaveTime, useSavingQueue} from '@/widgets/saving-queue';
import {Fragment, useEffect} from 'react';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData, IndicatorValues} from '../types';
import {isReadyToCalculation} from '../utils';
import {NavigationIndicatorData} from './types';

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

	return (saveTime: SaveTime) => {
		if (saveTime === SaveTime.UNMOUNT) {
			return;
		}
		fire(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => {
				if (navigation.compareWithPreviousTimeRange) {
					return await fetchNavigationIndicatorData(navigationIndicator, navigationIndicator);
				} else {
					return await fetchNavigationIndicatorData(navigationIndicator);
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
	const saveQueue = useSavingQueue();
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
		onEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onIndicatorCriteriaChanged);
		onEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_AGGREGATION_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_FORMULA_CHANGED, onIndicatorCriteriaChanged);
			offEdit(NavigationEditEventTypes.TIME_RANGE_CHANGED, onTimeRangeChanged);
		};
	}, [fireGlobal, onEdit, offEdit, fireEdit, navigation, navigationIndicator, defData, saveQueue]);

	return <Fragment/>;
};