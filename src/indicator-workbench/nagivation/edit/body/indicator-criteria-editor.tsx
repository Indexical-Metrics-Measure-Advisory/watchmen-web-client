import {FactorId} from '@/services/data/tuples/factor-types';
import {Navigation, NavigationIndicator, NavigationIndicatorCriteria} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {IndicatorCriteriaArithmetic, IndicatorCriteriaFactor, IndicatorCriteriaIndex} from './widgets';

export const IndicatorCriteriaEditor = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
	factorCandidates: Array<DropdownOption>;
	index: number;
}) => {
	const {navigation, navigationIndicator, criteria, factorCandidates, index} = props;

	const {fire} = useNavigationEventBus();
	const forceUpdate = useForceUpdate();

	const onCriteriaFactorChanged = (criteria: NavigationIndicatorCriteria) => (option: DropdownOption) => {
		criteria.factorId = option.value as FactorId;
		if (navigationIndicator.criteria == null) {
			navigationIndicator.criteria = [];
		}
		if (!navigationIndicator.criteria.includes(criteria)) {
			navigationIndicator.criteria.push(criteria);
		}
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
		forceUpdate();
	};

	return <>
		<IndicatorCriteriaIndex>{index + 1}</IndicatorCriteriaIndex>
		<IndicatorCriteriaFactor>
			<Dropdown value={criteria.factorId} options={factorCandidates}
			          onChange={onCriteriaFactorChanged(criteria)}
			          please={Lang.INDICATOR_WORKBENCH.NAVIGATION.PLEASE_SELECT_CRITERIA_FACTOR}/>
		</IndicatorCriteriaFactor>
		<IndicatorCriteriaArithmetic>

		</IndicatorCriteriaArithmetic>
	</>;
};