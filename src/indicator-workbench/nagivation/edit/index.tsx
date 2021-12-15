import {Router} from '@/routes/types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {FullWidthPage} from '@/widgets/basic/page';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
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
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useNavigationEventBus();
	const [navigation, setNavigation] = useState<Navigation | null>(null);
	useEffect(() => {
		fire(NavigationEventTypes.ASK_NAVIGATION, (navigation?: Navigation) => {
			if (navigation == null) {
				fireGlobal(EventTypes.SHOW_ALERT,
					<AlertLabel>
						{Lang.INDICATOR_WORKBENCH.NAVIGATION.NAVIGATION_NOT_FOUND}
					</AlertLabel>, () => {
						history.replace(Router.INDICATOR_WORKBENCH_NAVIGATION_QUERY);
					});
			} else {
				setNavigation(navigation);
			}
		});
	}, [fire, fireGlobal, history]);

	return navigation == null ? null : <InternalNavigationEdit navigation={navigation}/>;
};