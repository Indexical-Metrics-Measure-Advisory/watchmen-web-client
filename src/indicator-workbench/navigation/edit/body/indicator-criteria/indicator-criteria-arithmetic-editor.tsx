import {BucketId} from '@/services/data/tuples/bucket-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {
	Navigation,
	NavigationIndicator,
	NavigationIndicatorCriteria,
	NavigationIndicatorCriteriaOnBucket,
	NavigationIndicatorCriteriaOnExpression,
	NavigationIndicatorCriteriaOperator
} from '@/services/data/tuples/navigation-types';
import {
	isNavigationIndicatorCriteriaOnBucket,
	isNavigationIndicatorCriteriaOnExpression
} from '@/services/data/tuples/navigation-utils';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect} from 'react';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {CriteriaArithmeticLabel} from '../utils';
import {buildValueBucketOptions, getCriteriaArithmetic, isCriteriaArithmeticVisible} from './utils';
import {IndicatorCriteriaArithmetic} from './widgets';

export const IndicatorCriteriaArithmeticEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
	defData: IndicatorCriteriaDefData;
	indicator: Indicator;
}) => {
	const {navigation, navigationIndicator, criteria, defData, indicator} = props;

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
		return () => {
			offEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, onCriteriaChanged);
		};
	}, [onEdit, offEdit, forceUpdate, navigation, navigationIndicator, criteria]);

	const onCriteriaArithmeticChanged = (criteria: NavigationIndicatorCriteria) => (option: DropdownOption) => {
		const oldValue = getCriteriaArithmetic(criteria);
		const newValue = option.value as BucketId | NavigationIndicatorCriteriaOperator;
		// eslint-disable-next-line
		if (oldValue == newValue) {
			return;
		}
		switch (newValue) {
			case NavigationIndicatorCriteriaOperator.EQUALS:
			case NavigationIndicatorCriteriaOperator.NOT_EQUALS:
			case NavigationIndicatorCriteriaOperator.LESS:
			case NavigationIndicatorCriteriaOperator.LESS_EQUALS:
			case NavigationIndicatorCriteriaOperator.MORE:
			case NavigationIndicatorCriteriaOperator.MORE_EQUALS:
				if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
					delete criteria.bucketId;
					delete criteria.bucketSegmentName;
				}
				const criteriaOnExp = criteria as NavigationIndicatorCriteriaOnExpression;
				criteriaOnExp.operator = newValue;
				break;
			default:
				if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
					delete criteria.operator;
					delete criteria.value;
					const criteriaOnBucket = criteria as NavigationIndicatorCriteriaOnBucket;
					criteriaOnBucket.bucketId = newValue as BucketId;
					delete criteriaOnBucket.bucketSegmentName;
				} else if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
					// eslint-disable-next-line
					if (criteria.bucketId != newValue as BucketId) {
						criteria.bucketId = newValue as BucketId;
						delete criteria.bucketSegmentName;
					}
				} else {
					(criteria as NavigationIndicatorCriteriaOnBucket).bucketId = newValue as BucketId;
				}
				break;
		}
		fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ARITHMETIC_CHANGED, navigation, navigationIndicator, criteria);
		fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, navigation, navigationIndicator);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	const arithmeticOptions = [
		...buildValueBucketOptions(criteria, indicator, defData),
		{
			value: NavigationIndicatorCriteriaOperator.EQUALS,
			label: CriteriaArithmeticLabel[NavigationIndicatorCriteriaOperator.EQUALS]
		},
		{
			value: NavigationIndicatorCriteriaOperator.NOT_EQUALS,
			label: CriteriaArithmeticLabel[NavigationIndicatorCriteriaOperator.NOT_EQUALS]
		},
		{
			value: NavigationIndicatorCriteriaOperator.LESS,
			label: CriteriaArithmeticLabel[NavigationIndicatorCriteriaOperator.LESS]
		},
		{
			value: NavigationIndicatorCriteriaOperator.LESS_EQUALS,
			label: CriteriaArithmeticLabel[NavigationIndicatorCriteriaOperator.LESS_EQUALS]
		},
		{
			value: NavigationIndicatorCriteriaOperator.MORE,
			label: CriteriaArithmeticLabel[NavigationIndicatorCriteriaOperator.MORE]
		},
		{
			value: NavigationIndicatorCriteriaOperator.MORE_EQUALS,
			label: CriteriaArithmeticLabel[NavigationIndicatorCriteriaOperator.MORE_EQUALS]
		}
	];

	return <IndicatorCriteriaArithmetic>
		{isCriteriaArithmeticVisible(criteria)
			? <Dropdown value={getCriteriaArithmetic(criteria)} options={arithmeticOptions}
			            onChange={onCriteriaArithmeticChanged(criteria)}
			            please={Lang.INDICATOR_WORKBENCH.NAVIGATION.PLEASE_SELECT_CRITERIA_OPERATOR}/>
			: null}
	</IndicatorCriteriaArithmetic>;
};