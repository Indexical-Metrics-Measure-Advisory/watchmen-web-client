import {Navigation, NavigationIndicator, NavigationIndicatorCriteria} from '@/services/data/tuples/navigation-types';
import {noop} from '@/services/utils';
import {ICON_DELETE} from '@/widgets/basic/constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigationEventBus} from '../../../navigation-event-bus';
import {NavigationEventTypes} from '../../../navigation-event-bus-types';
import {useNavigationEditEventBus} from '../navigation-edit-event-bus';
import {NavigationEditEventTypes} from '../navigation-edit-event-bus-types';
import {IndicatorCriteriaButton, IndicatorCriteriaButtons} from './widgets';

export const IndicatorCriteriaOperators = (props: {
	navigation: Navigation;
	navigationIndicator: NavigationIndicator;
	criteria: NavigationIndicatorCriteria;
}) => {
	const {navigation, navigationIndicator, criteria} = props;

	const {fire} = useNavigationEventBus();
	const {fire: fireEdit} = useNavigationEditEventBus();

	const onDeleteClicked = () => {
		const index = (navigationIndicator.criteria || []).indexOf(criteria);
		if (index === -1) {
			return;
		}

		(navigationIndicator.criteria || []).splice(index, 1);
		fireEdit(NavigationEditEventTypes.INDICATOR_CRITERIA_REMOVED, navigation, navigationIndicator);
		fire(NavigationEventTypes.SAVE_NAVIGATION, navigation, noop);
	};

	const canBeDeleted = (navigationIndicator.criteria || []).includes(criteria);

	return <IndicatorCriteriaButtons>
		{canBeDeleted
			? <IndicatorCriteriaButton onClick={onDeleteClicked}>
				<FontAwesomeIcon icon={ICON_DELETE}/>
			</IndicatorCriteriaButton>
			: null}
	</IndicatorCriteriaButtons>;
};