import {fetchAllPipelines} from '@/services/data/pipeline/all-pipelines';
import {fetchAllTopics} from '@/services/data/pipeline/all-topics';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {FullWidthPage} from '@/widgets/basic/page';
import {FullWidthPageHeaderContainer, PageTitle} from '@/widgets/basic/page-header';
import React, {useEffect, useState} from 'react';
import {MonitorLogEventBusProvider} from './monitor-log-event-bus';
import {SearchCriteria} from './search-criteria';
import {SearchResult} from './search-result';
import {Body} from './widgets';

interface State {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}

const AdminMonitorLogsIndex = () => {
	const [state, setState] = useState<State>({topics: [], pipelines: []});
	useEffect(() => {
		(async () => {
			const [pipelines, topics] = await Promise.all([
				fetchAllPipelines(),
				fetchAllTopics()
			]);
			setState({topics, pipelines});
		})();
	}, []);

	return <FullWidthPage>
		<FullWidthPageHeaderContainer>
			<PageTitle>Monitor Logs</PageTitle>
		</FullWidthPageHeaderContainer>
		<Body>
			<MonitorLogEventBusProvider>
				<SearchCriteria topics={state.topics} pipelines={state.pipelines}/>
				<SearchResult topics={state.topics} pipelines={state.pipelines}/>
			</MonitorLogEventBusProvider>
		</Body>
	</FullWidthPage>;
};

export default AdminMonitorLogsIndex;