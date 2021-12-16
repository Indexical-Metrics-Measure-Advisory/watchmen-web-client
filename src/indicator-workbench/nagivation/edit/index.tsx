import {fetchNavigation} from '@/services/data/tuples/navigation';
import {Navigation, NavigationId} from '@/services/data/tuples/navigation-types';
import {FullWidthPage} from '@/widgets/basic/page';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';
import {NavigationEditPageBody} from './body';
import {NavigationEditPageHeader} from './header';
import {NavigationSaver} from './saver';

const InternalNavigationEdit = (props: { navigation: Navigation }) => {
	const {navigation} = props;
	return <FullWidthPage>
		<NavigationEditPageHeader navigation={navigation}/>
		<NavigationEditPageBody navigation={navigation}/>
		<NavigationSaver navigation={navigation}/>
	</FullWidthPage>;
};

export const NavigationEdit = () => {
	const history = useHistory();
	const {navigationId} = useParams<{ navigationId: NavigationId }>();
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useNavigationEventBus();
	const [navigation, setNavigation] = useState<Navigation | null>(null);
	useEffect(() => {
		fire(NavigationEventTypes.ASK_NAVIGATION, (navigation?: Navigation) => {
			// eslint-disable-next-line
			if (navigation == null || navigation.navigationId != navigationId) {
				// not in memory yet, or not same one
				fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
					async () => {
						const {navigation} = await fetchNavigation(navigationId);
						return {tuple: navigation};
					},
					({tuple}) => {
						setNavigation(tuple as Navigation);
						fire(NavigationEventTypes.NAVIGATION_PICKED, tuple as Navigation);
					});
			} else {
				setNavigation(navigation);
			}
		});
	}, [fire, fireGlobal, history, navigationId]);

	return navigation == null ? null : <InternalNavigationEdit navigation={navigation}/>;
};