import React from 'react';
import { VerticalMarginOneUnit } from '../../basic-widgets/margin';
import { FixWidthPage } from '../../basic-widgets/page';
import { PageHeader } from '../../basic-widgets/page-header';
import { Lang } from '../../langs';
import { ConnectedSpacesSection } from './connected-spaces-section';
import { DashboardsSection } from './dashboards-section';

const ConsoleHomeIndex = () => {
	return <FixWidthPage>
		<PageHeader title={Lang.CONSOLE.HOME.TITLE}/>
		<VerticalMarginOneUnit/>
		<ConnectedSpacesSection/>
		<DashboardsSection/>
		<VerticalMarginOneUnit/>
	</FixWidthPage>;
};

export default ConsoleHomeIndex;