import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {Indicators} from './indicators';
import {IndicatorsEventBusProvider} from './indicators-event-bus';

const IndicatorWorkbenchIndicatorIndex = () => {
	return <IndicatorsEventBusProvider>
		<FixWidthPage maxWidth="80%">
			<PageHeader title={Lang.INDICATOR_WORKBENCH.INDICATOR.TITLE}/>
			<Indicators/>
		</FixWidthPage>
	</IndicatorsEventBusProvider>;
};

export default IndicatorWorkbenchIndicatorIndex;