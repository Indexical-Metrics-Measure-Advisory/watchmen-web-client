import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import React from 'react';
import {Indicators} from './indicators';

const IndicatorWorkbenchPrepareIndex = () => {
	return <FixWidthPage>
		<PageHeader title="Prepare Indicators"/>
		<Indicators/>
	</FixWidthPage>;
};

export default IndicatorWorkbenchPrepareIndex;