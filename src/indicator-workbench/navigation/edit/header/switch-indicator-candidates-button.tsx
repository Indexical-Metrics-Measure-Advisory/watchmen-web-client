import {Navigation} from '@/services/data/tuples/navigation-types';
import {ICON_EDIT} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {ButtonInk} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';

export const SwitchIndicatorCandidatesButton = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const {fire} = useNavigationEventBus();
	const [visible, setVisible] = useState(true);

	const onViewModeClicked = () => {
		setVisible(!visible);
		fire(NavigationEventTypes.SWITCH_INDICATOR_CANDIDATES, navigation, !visible);
	};

	const tooltip = visible
		? Lang.INDICATOR_WORKBENCH.NAVIGATION.SWITCH_TO_EDIT_MODE
		: Lang.INDICATOR_WORKBENCH.NAVIGATION.SWITCH_TO_VIEW_MODE;

	return <PageHeaderButton tooltip={tooltip}
	                         ink={visible ? undefined : ButtonInk.PRIMARY}
	                         onClick={onViewModeClicked}>
		<FontAwesomeIcon icon={ICON_EDIT}/>
	</PageHeaderButton>;
};