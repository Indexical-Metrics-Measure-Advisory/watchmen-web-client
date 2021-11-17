import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {Indicators} from './indicators';
import {IndicatorsEventBusProvider} from './indicators-event-bus';

const IndicatorWorkbenchPrepareIndex = () => {
	return <IndicatorsEventBusProvider>
		<FixWidthPage maxWidth="80%">
			<PageHeader title={Lang.INDICATOR_WORKBENCH.PREPARE.TITLE}/>
			<Indicators/>
		</FixWidthPage>
	</IndicatorsEventBusProvider>;
};

export default IndicatorWorkbenchPrepareIndex;