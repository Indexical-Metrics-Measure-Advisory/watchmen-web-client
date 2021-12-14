import React from 'react';
import {NavigationEventBusProvider} from './navigation-event-bus';
import {NavigationRoute} from './route';

const IndicatorWorkbenchNavigationIndex = () => {
	return <NavigationEventBusProvider>
		<NavigationRoute/>
	</NavigationEventBusProvider>;
};

export default IndicatorWorkbenchNavigationIndex;