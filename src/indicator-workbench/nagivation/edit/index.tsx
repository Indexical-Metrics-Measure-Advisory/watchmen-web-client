import {Router} from '@/routes/types';
import {Navigation} from '@/services/data/tuples/navigation-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {Lang} from '@/widgets/langs';
import React, {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useNavigationEventBus} from '../navigation-event-bus';
import {NavigationEventTypes} from '../navigation-event-bus-types';

const InternalNavigationEdit = (props: { navigation: Navigation }) => {
	const {navigation} = props;
	return <FixWidthPage maxWidth="80%">
		<PageHeader title={navigation.name || 'Noname'}/>
	</FixWidthPage>;
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
	}, [fire]);

	return navigation == null ? null : <InternalNavigationEdit navigation={navigation}/>;
};