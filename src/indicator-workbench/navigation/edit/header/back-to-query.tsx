import {ICON_INDICATOR_NAVIGATION} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';

export const BackToQueryButton = () => {
	const {fire} = useNavigationEventBus();

	const onBackClicked = () => {
		fire(NavigationEventTypes.BACK_TO_QUERY);
	};

	return <PageHeaderButton tooltip={Lang.INDICATOR_WORKBENCH.NAVIGATION.BACK_TO_QUERY} onClick={onBackClicked}>
		<FontAwesomeIcon icon={ICON_INDICATOR_NAVIGATION}/>
	</PageHeaderButton>;
};