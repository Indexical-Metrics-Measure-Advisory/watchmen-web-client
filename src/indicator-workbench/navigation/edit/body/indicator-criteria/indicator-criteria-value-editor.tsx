import {
	Navigation,
	NavigationIndicator,
	NavigationIndicatorCriteria,
	NavigationIndicatorCriteriaOnBucket,
	NavigationIndicatorCriteriaOnExpression
} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {ChangeEvent, useEffect} from 'react';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {getAvailableTimeRange, getTimeRangePlaceholder, isCriteriaValueVisible, showInputForValue} from './utils';
import {IndicatorCriteriaValue} from './widgets';

export const IndicatorCriteriaValueEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
	defData: IndicatorCriteriaDefData;
}) => {
	const {navigation, navigationIndicator, criteria, defData} = props;

	const {fire} = useNavigationEventBus();
	const {on: onEdit, off: offEdit, fire: fireEdit} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onCriteriaChanged = (aNavigation: Navigation, aNavigationIndicator: NavigationIndicator, aCriteria: NavigationIndicatorCriteria) => {
			if (aNavigation !== navigation || aNavigationIndicator !== navigationIndicator || aCriteria !== criteria) {
				return;
			}
			forceUpdate();
		};
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, onCriteriaChanged);
		onEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ARITHMETIC_CHANGED, onCriteriaChanged);
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, onCriteriaChanged);
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ARITHMETIC_CHANGED, onCriteriaChanged);
		};
	}, [onEdit, offEdit, forceUpdate, navigation, navigationIndicator, criteria]);

	if (!isCriteriaValueVisible(criteria)) {
		return null;
	}

	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		(criteria as NavigationIndicatorCriteriaOnExpression).value = value;
		fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, navigation, navigationIndicator);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};
	const onBucketSegmentChanged = (option: DropdownOption) => {
		(criteria as NavigationIndicatorCriteriaOnBucket).bucketSegmentName = option.value as string;
		fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, navigation, navigationIndicator);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	// eslint-disable-next-line
	const factor = (defData.topic?.factors || []).find(factor => factor.factorId == criteria.factorId);
	const {year, month} = getAvailableTimeRange(factor);
	const isInputShown = showInputForValue(criteria);
	const getBucketSegmentOptions: Array<DropdownOption> = isInputShown
		? []
		: (() => {
			const bucketId = (criteria as NavigationIndicatorCriteriaOnBucket).bucketId;
			// eslint-disable-next-line
			const bucket = bucketId == null ? null : [...defData.valueBuckets, ...defData.measureBuckets].find(bucket => bucket.bucketId == bucketId);
			if (bucket != null) {
				return (bucket.segments || []).map(segment => {
					return {value: segment.name, label: segment.name || 'Noname Bucket Segment'};
				});
			} else {
				return [];
			}
		})();

	return <IndicatorCriteriaValue>
		{isInputShown
			? <Input value={(criteria as NavigationIndicatorCriteriaOnExpression).value || ''}
			         onChange={onInputValueChanged}
			         placeholder={getTimeRangePlaceholder(year, month)}/>
			: <Dropdown value={(criteria as NavigationIndicatorCriteriaOnBucket).bucketSegmentName}
			            options={getBucketSegmentOptions}
			            onChange={onBucketSegmentChanged}/>}
	</IndicatorCriteriaValue>;
};