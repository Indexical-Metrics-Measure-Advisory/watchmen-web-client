import {Navigation} from '@/services/data/tuples/navigation-types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {Lang} from '@/widgets/langs';
import {useEffect, useRef} from 'react';
import {useNavigationEventBus} from '../../navigation-event-bus';
import {NavigationEventTypes} from '../../navigation-event-bus-types';
import {NavigationRootNode} from './widgets';

export const NavigationRoot = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const ref = useRef<HTMLDivElement>(null);
	const {on, off} = useNavigationEventBus();
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const onNameChanged = (aNavigation: Navigation) => {
			if (aNavigation !== navigation) {
				return;
			}
			forceUpdate();
		};
		on(NavigationEventTypes.NAME_CHANGED, onNameChanged);
		return () => {
			off(NavigationEventTypes.NAME_CHANGED, onNameChanged);
		};
	}, [on, off, forceUpdate, navigation]);

	return <NavigationRootNode ref={ref}>
		{navigation.name || Lang.INDICATOR_WORKBENCH.NAVIGATION.ROOT}
	</NavigationRootNode>;
};