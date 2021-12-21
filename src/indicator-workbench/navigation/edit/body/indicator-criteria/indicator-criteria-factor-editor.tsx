import {FactorId} from '@/services/data/tuples/factor-types';
import {Indicator} from '@/services/data/tuples/indicator-types';
import {Navigation, NavigationIndicator, NavigationIndicatorCriteria} from '@/services/data/tuples/navigation-types';
import {
	isNavigationIndicatorCriteriaOnBucket,
	isNavigationIndicatorCriteriaOnExpression
} from '@/services/data/tuples/navigation-utils';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaDefData} from '../types';
import {findAvailableBuckets} from './utils';
import {IndicatorCriteriaFactor} from './widgets';

export const IndicatorCriteriaFactorEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
	defData: IndicatorCriteriaDefData;
	indicator: Indicator;
	factorCandidates: Array<DropdownOption>;
}) => {
	const {navigation, navigationIndicator, criteria, defData, indicator, factorCandidates} = props;

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
			fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, navigation, navigationIndicator, criteria);
			fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_ADDED, navigation, navigationIndicator);
		} else {
			// existing criteria
			if (isNavigationIndicatorCriteriaOnExpression(criteria)) {
				// operator and value is for all expression criteria
				// do nothing
			} else if (isNavigationIndicatorCriteriaOnBucket(criteria)) {
				const availableBuckets = findAvailableBuckets(criteria, indicator, defData);
				// eslint-disable-next-line
				if (availableBuckets.every(bucket => bucket.bucketId != criteria.bucketId)) {
					// bucket cannot be used on new factor, clear it
					delete criteria.bucketId;
					delete criteria.bucketSegmentName;
				}
			}
			fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_FACTOR_CHANGED, navigation, navigationIndicator, criteria);
			fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_CHANGED, navigation, navigationIndicator);
		}
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	return <IndicatorCriteriaFactor>
		<Dropdown value={criteria.factorId} options={factorCandidates}
		          onChange={onCriteriaFactorChanged(criteria)}
		          please={Lang.INDICATOR_WORKBENCH.NAVIGATION.PLEASE_SELECT_CRITERIA_FACTOR}/>
	</IndicatorCriteriaFactor>;
};