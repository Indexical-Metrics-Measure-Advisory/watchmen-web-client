import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import React from 'react';
import {Indicators} from './indicators';
import {IndicatorsEventBusProvider} from './indicators-event-bus';

const IndicatorWorkbenchPrepareIndex = () => {
	return <IndicatorsEventBusProvider>
		<FixWidthPage>
			<PageHeader title="Prepare Indicators"/>
			<Indicators/>
		</FixWidthPage>
	</IndicatorsEventBusProvider>;
};

export default IndicatorWorkbenchPrepareIndex;