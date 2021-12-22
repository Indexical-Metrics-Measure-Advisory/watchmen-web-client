import {SAVE_TIMEOUT} from '@/services/constants';
import {saveNavigation} from '@/services/data/tuples/navigation';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {useThrottler} from '@/widgets/throttler';
import {Fragment, useEffect} from 'react';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

export const NavigationSaver = (props: { navigation: Navigation }) => {
	const {navigation} = props;

	const {fire: fireGlobal} = useEventBus();
	const {on, off, fire} = useNavigationEventBus();
	const saveQueue = useThrottler();
	useEffect(() => saveQueue.clear(true), [navigation, saveQueue]);
	useEffect(() => {
		const onSaveNavigation = (aNavigation: Navigation, onSaved: (navigation: Navigation, saved: boolean) => void) => {
			if (aNavigation !== navigation) {
				return;
			}

			saveQueue.replace(() => {
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => await saveNavigation(navigation),
					() => {
						fire(NavigationEventTypes.NAVIGATION_SAVED, navigation);
						onSaved(navigation, true);
					}, () => {
						onSaved(navigation, false);
					});
			}, SAVE_TIMEOUT);
		};
		on(NavigationEventTypes.NAME_CHANGED, onSaveNavigation);
		on(NavigationEventTypes.SAVE_NAVIGATION, onSaveNavigation);
		return () => {
			off(NavigationEventTypes.NAME_CHANGED, onSaveNavigation);
			off(NavigationEventTypes.SAVE_NAVIGATION, onSaveNavigation);
		};
	}, [fireGlobal, on, off, fire, saveQueue, navigation]);

	return <Fragment/>;
};