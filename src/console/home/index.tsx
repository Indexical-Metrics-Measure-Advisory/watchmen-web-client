import {VerticalMarginOneUnit} from '@/widgets/basic/margin';
import {FixWidthPage} from '@/widgets/basic/page';
import {PageHeader} from '@/widgets/basic/page-header';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {ConnectedSpacesSection} from './connected-spaces-section';
import {DashboardsSection} from './dashboards-section';

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