import {FullWidthPage} from '@/widgets/basic/page';
import {FullWidthPageHeaderContainer, PageTitle} from '@/widgets/basic/page-header';
import React from 'react';
import {StatisticsPageBody} from './body';
import {DailyPanel} from './daily';
import {FreeWalkPanel} from './free-walk';
import {StatisticsEventBusProvider} from './statistics-event-bus';
import {WeeklyPanel} from './weekly';

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