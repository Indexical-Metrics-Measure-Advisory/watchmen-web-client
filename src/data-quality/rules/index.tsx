import {FullWidthPage} from '@/widgets/basic/page';
import {FullWidthPageHeaderContainer, PageTitle} from '@/widgets/basic/page-header';
import React from 'react';
import {RulesEventBusProvider} from './rules-event-bus';
import {SearchCriteria} from './search-criteria';
import {SearchResult} from './search-result';
import {Body} from './widgets';

const DataQualityMonitorRulesIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Monitor Rules</PageTitle>
		</FullWidthPageHeaderContainer>
		<Body>
			<RulesEventBusProvider>
				<SearchCriteria/>
				<SearchResult/>
			</RulesEventBusProvider>
		</Body>
	</FullWidthPage>;
};

export default DataQualityMonitorRulesIndex;