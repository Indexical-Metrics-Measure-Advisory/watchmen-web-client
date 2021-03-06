import React from 'react';
import {FullWidthPage} from '../../basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '../../basic-widgets/page-header';
import {Body} from './widgets';
import {RulesEventBusProvider} from './rules-event-bus';
import {SearchCriteria} from './search-criteria';
import {SearchResult} from './search-result';

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