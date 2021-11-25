import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {Inspection} from './inspection';
import {InspectionEventBusProvider} from './inspection-event-bus';

const IndicatorWorkbenchInspectionIndex = () => {
	return <InspectionEventBusProvider>
		<FixWidthPage maxWidth="80%">
			<PageHeader title={Lang.INDICATOR_WORKBENCH.INSPECTION.TITLE}/>
			<Inspection/>
		</FixWidthPage>
	</InspectionEventBusProvider>;
};

export default IndicatorWorkbenchInspectionIndex;