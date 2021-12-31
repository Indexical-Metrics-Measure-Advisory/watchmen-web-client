import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEffect, useState} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';

export const useShowAddIndicator = (navigation: Navigation) => {
	const {on, off} = useNavigationEventBus();
	const [visible, setVisible] = useState(true);
	useEffect(() => {
		const onSwitchIndicatorCandidates = (aNavigation: Navigation, visible: boolean) => {
			if (aNavigation !== navigation) {
				return;
			}
			setVisible(visible);
		};
		on(NavigationEventTypes.SWITCH_INDICATOR_CANDIDATES, onSwitchIndicatorCandidates);
		return () => {
			off(NavigationEventTypes.SWITCH_INDICATOR_CANDIDATES, onSwitchIndicatorCandidates);
		};
	}, [on, off, navigation]);

	return visible;
};