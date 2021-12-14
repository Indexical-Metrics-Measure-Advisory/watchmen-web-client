import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {NavigationEventBusProvider} from './navigation-event-bus';

const IndicatorWorkbenchNavigationIndex = () => {
	return <NavigationEventBusProvider>
		<FixWidthPage maxWidth="80%">
			<PageHeader title={Lang.INDICATOR_WORKBENCH.NAVIGATION.TITLE}/>
		</FixWidthPage>
	</NavigationEventBusProvider>;
};

export default IndicatorWorkbenchNavigationIndex;