import React, { useEffect, useState } from 'react';
import { fetchMonitorLogs, MonitorLogCriteria, MonitorLogsDataPage } from '../../services/admin/logs';
import { Pipeline } from '../../services/tuples/pipeline-types';
import { Topic } from '../../services/tuples/topic-types';
import { useMonitorLogEventBus } from './monitor-log-event-bus';
import { MonitorLogEventTypes } from './monitor-log-event-bus-types';
import { SearchResultBody, SearchResultBodyRow, SearchResultContainer, SearchResultHeader } from './widgets';

const PAGE_SIZE = 100;

export const SearchResult = (props: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}) => {
	const { topics, pipelines } = props;

	const { on, off } = useMonitorLogEventBus();
	const [ logs, setLogs ] = useState<MonitorLogsDataPage>({
		data: [],
		itemCount: 0,
		pageCount: 1,
		pageNumber: 1,
		pageSize: PAGE_SIZE
	});
	useEffect(() => {
		const onSearch = async (criteria: MonitorLogCriteria) => {
			const logs = await fetchMonitorLogs({ criteria, pageNumber: 1, pageSize: PAGE_SIZE });
			setLogs(logs);
		};
		on(MonitorLogEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(MonitorLogEventTypes.DO_SEARCH, onSearch);
		};
	}, [ on, off ]);

	const pipelineMap = pipelines.reduce((map, pipeline) => {
		map.set(pipeline.pipelineId, pipeline);
		return map;
	}, new Map<string, Pipeline>());
	const topicMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());

	return <SearchResultContainer>
		<SearchResultHeader>
			<div>#</div>
			<div>Run ID.</div>
			<div>Pipeline Name</div>
			<div>From Topic</div>
			<div>Status</div>
			<div>Complete At</div>
		</SearchResultHeader>
		<SearchResultBody>
			{logs.data.map((row, index) => {
				return <SearchResultBodyRow key={row.uid}>
					<div>{index + 1 + logs.pageSize * (logs.pageNumber - 1)}</div>
					<div><span>{row.uid}</span></div>
					<div><span>{pipelineMap.get(row.pipelineId)?.name || row.pipelineId}</span></div>
					<div><span>{topicMap.get(row.topicId)?.name || row.topicId}</span></div>
					<div>{row.status}</div>
					<div>{row.completeTime}</div>
				</SearchResultBodyRow>;
			})
			}
		</SearchResultBody>
	</SearchResultContainer>;
};