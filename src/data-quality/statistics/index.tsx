import React from 'react';
import {FullWidthPage} from '@/basic-widgets/page';
import {FullWidthPageHeaderContainer, PageTitle} from '@/basic-widgets/page-header';
import {StatisticsEventBusProvider} from './statistics-event-bus';
import {StatisticsPageBody} from './body';
import {DailyPanel} from './daily';
import {WeeklyPanel} from './weekly';
import {FreeWalkPanel} from './free-walk';

const DataQualityStatisticsIndex = () => {
	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Run Statistics</PageTitle>
		</FullWidthPageHeaderContainer>
		<StatisticsEventBusProvider>
			<StatisticsPageBody>
				<DailyPanel/>
				<WeeklyPanel/>
				<FreeWalkPanel/>
			</StatisticsPageBody>
		</StatisticsEventBusProvider>
	</FullWidthPage>;
};

export default DataQualityStatisticsIndex;