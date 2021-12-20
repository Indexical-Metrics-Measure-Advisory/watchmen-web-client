import {Bucket, BucketId} from '@/services/data/tuples/bucket-types';
import {
	isCategoryMeasureBucket,
	isEnumMeasureBucket,
	isNumericValueMeasureBucket
} from '@/services/data/tuples/bucket-utils';
import {FactorId} from '@/services/data/tuples/factor-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {tryToTransformToMeasures} from '@/services/data/tuples/indicator-utils';
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
import {isNotNull} from '@/services/data/utils';
import {noop} from '@/services/utils';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ChangeEvent} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {useNavigationEditEventBus} from './navigation-edit-event-bus';
import {NavigationEditEventTypes} from './navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from './types';
import {CriteriaArithmeticLabel} from './utils';
import {
	IndicatorCriteriaArithmetic,
	IndicatorCriteriaButton,
	IndicatorCriteriaButtons,
	IndicatorCriteriaFactor,
	IndicatorCriteriaIndex,
	IndicatorCriteriaRow,
	IndicatorCriteriaValue
} from './widgets';

const findAvailableBuckets = (criteria: NavigationIndicatorCriteria, indicator: Indicator, defData: IndicatorCriteriaDefData): Array<Bucket> => {
	// eslint-disable-next-line
	if (criteria.factorId == indicator.factorId) {
		return (indicator.valueBuckets || []).map(bucketId => {
			// eslint-disable-next-line
			return (defData.valueBuckets || []).find(bucket => bucket.bucketId == bucketId);
		}).filter(isNotNull);
	}

	// eslint-disable-next-line
	const factor = (defData.topic?.factors || []).find(factor => factor.factorId == criteria.factorId);
	if (factor == null) {
		return [];
	}

	return tryToTransformToMeasures(factor).map(measure => {
		if (factor.enumId != null) {
			// eslint-disable-next-line
			return (defData.measureBuckets || []).filter(isEnumMeasureBucket).filter(bucket => bucket.enumId == factor.enumId);
		} else {
			return (defData.measureBuckets || []).filter(bucket => {
				return (isCategoryMeasureBucket(bucket) && bucket.measure === measure)
					|| (isNumericValueMeasureBucket(bucket) && bucket.measure === measure);
			});
		}
	}).flat();
};

const buildValueBucketOptions = (criteria: NavigationIndicatorCriteria, indicator: Indicator, defData: IndicatorCriteriaDefData) => {
	return findAvailableBuckets(criteria, indicator, defData).map(bucket => {
		return {
			value: bucket.bucketId,
			label: bucket.name || 'Noname Bucket'
		};
	});
};

const getCriteriaArithmetic = (criteria: NavigationIndicatorCriteria): BucketId | NavigationIndicatorCriteriaOperator | undefined => {
	if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
		return criteria.bucketId;
	} else if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
		return criteria.operator;
	}
	return (void 0);
};

const isCriteriaArithmeticVisible = (criteria: NavigationIndicatorCriteria): boolean => {
	return criteria.factorId != null;
};
const isCriteriaValueVisible = (criteria: NavigationIndicatorCriteria): boolean => {
	return isCriteriaArithmeticVisible(criteria)
		&& ((isNavigationIndicatorCriteriaOnBucket(criteria) && criteria.bucketId != null)
			|| (isNavigationIndicatorCriteriaOnExpression(criteria) && criteria.operator != null));
};

const showInputForValue = (criteria: NavigationIndicatorCriteria): boolean => {
	return !isNavigationIndicatorCriteriaOnBucket(criteria);
};

export const IndicatorCriteriaEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
	indicator: Indicator;
	factorCandidates: Array<DropdownOption>;
	defData: IndicatorCriteriaDefData;
	index: number;
}) => {
	const {navigation, navigationIndicator, criteria, indicator, factorCandidates, defData, index} = props;

	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();
	const forceUpdate = useForceUpdate();

	const onCriteriaFactorChanged = (criteria: NavigationIndicatorCriteria) => (option: DropdownOption) => {
		criteria.factorId = option.value as FactorId;
		if (navigationIndicator.criteria == null) {
			navigationIndicator.criteria = [];
		}
		if (!navigationIndicator.criteria.includes(criteria)) {
			// new criteria
			navigationIndicator.criteria.push(criteria);
			fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, navigation, navigationIndicator);
		} else {
			// existing criteria
			if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
				// do nothing
			} else if (isNavigationIndicatorCriteriaOnBucket(criteria)) {

			}
		}
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};
	const onCriteriaArithmeticChanged = (criteria: NavigationIndicatorCriteria) => (option: DropdownOption) => {
		const value = option.value as BucketId | NavigationIndicatorCriteriaOperator;
		switch (value) {
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
				criteriaOnExp.operator = value;
				break;
			default:
				if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
					delete criteria.operator;
					delete criteria.value;
					const criteriaOnBucket = criteria as NavigationIndicatorCriteriaOnBucket;
					criteriaOnBucket.bucketId = value as BucketId;
					delete criteriaOnBucket.bucketSegmentName;
				} else if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
					// eslint-disable-next-line
					if (criteria.bucketId != value as BucketId) {
						criteria.bucketId = value as BucketId;
						delete criteria.bucketSegmentName;
					}
				} else {
					(criteria as NavigationIndicatorCriteriaOnBucket).bucketId = value as BucketId;
				}
				break;
		}
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};
	const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		(criteria as NavigationIndicatorCriteriaOnExpression).value = value;
		forceUpdate();
	};
	const onBucketSegmentChanged = (option: DropdownOption) => {
		(criteria as NavigationIndicatorCriteriaOnBucket).bucketSegmentName = option.value as string;
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
	const getBucketSegmentOptions: Array<DropdownOption> = showInputForValue(criteria)
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

	return <IndicatorCriteriaRow>
		<IndicatorCriteriaIndex>{index + 1}</IndicatorCriteriaIndex>
		<IndicatorCriteriaFactor>
			<Dropdown value={criteria.factorId} options={factorCandidates}
			          onChange={onCriteriaFactorChanged(criteria)}
			          please={Lang.INDICATOR_WORKBENCH.NAVIGATION.PLEASE_SELECT_CRITERIA_FACTOR}/>
		</IndicatorCriteriaFactor>
		<IndicatorCriteriaArithmetic>
			{isCriteriaArithmeticVisible(criteria)
				? <Dropdown value={getCriteriaArithmetic(criteria)} options={arithmeticOptions}
				            onChange={onCriteriaArithmeticChanged(criteria)}
				            please={Lang.INDICATOR_WORKBENCH.NAVIGATION.PLEASE_SELECT_CRITERIA_ARITHMETIC}/>
				: null}
		</IndicatorCriteriaArithmetic>
		<IndicatorCriteriaValue>
			{isCriteriaValueVisible(criteria)
				? (showInputForValue(criteria)
					? <Input value={(criteria as NavigationIndicatorCriteriaOnExpression).value || ''}
					         onChange={onInputValueChanged}/>
					: <Dropdown value={(criteria as NavigationIndicatorCriteriaOnBucket).bucketSegmentName}
					            options={getBucketSegmentOptions}
					            onChange={onBucketSegmentChanged}/>)
				: null}
		</IndicatorCriteriaValue>
		<IndicatorCriteriaButtons>
			<IndicatorCriteriaButton>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</IndicatorCriteriaButton>
		</IndicatorCriteriaButtons>
	</IndicatorCriteriaRow>;
};