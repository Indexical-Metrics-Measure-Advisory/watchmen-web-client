import {FullWidthPage} from '@/widgets/basic/page';
import {FullWidthPageHeaderContainer, PageTitle} from '@/widgets/basic/page-header';
import React, {Fragment, useState} from 'react';
import {Loading} from './loading';

const IndicatorWorkbenchPrepareIndex = () => {
	const [initialized, setInitialized] = useState(false);

	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Prepare Indicators</PageTitle>
		</FullWidthPageHeaderContainer>
		{initialized
			? <Fragment/>
			: <Loading/>}
	</FullWidthPage>;
};

export default IndicatorWorkbenchPrepareIndex;