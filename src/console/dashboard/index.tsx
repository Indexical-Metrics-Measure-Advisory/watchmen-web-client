import React from 'react';
import { VerticalMarginOneUnit } from '../../basic-widgets/margin';
import { FullWidthPage } from '../../basic-widgets/page';
import { PageHeader } from '../../basic-widgets/page-header';
import { Lang } from '../../langs';

const ConsoleDashboardIndex = () => {
	return <FullWidthPage>
		<PageHeader title={Lang.CONSOLE.HOME.TITLE}/>
		<VerticalMarginOneUnit/>
	</FullWidthPage>;
};

export default ConsoleDashboardIndex;