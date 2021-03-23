import React, { useEffect, useState } from 'react';
import { Dropdown } from '../../basic-widgets/dropdown';
import { DropdownOption } from '../../basic-widgets/types';
import { fetchMonitorLogs, MonitorLogCriteria, MonitorLogsDataPage } from '../../services/admin/logs';
import { Pipeline } from '../../services/tuples/pipeline-types';
import { Topic } from '../../services/tuples/topic-types';
import { useMonitorLogEventBus } from './monitor-log-event-bus';
import { MonitorLogEventTypes } from './monitor-log-event-bus-types';
import { SearchResultBody, SearchResultBodyRow, SearchResultContainer, SearchResultHeader } from './widgets';

interface State extends MonitorLogsDataPage {
	criteria: MonitorLogCriteria;
}

const PAGE_SIZE = 100;

export const SearchResult = (props: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}) => {
	const { topics, pipelines } = props;

	const { on, off } = useMonitorLogEventBus();
	const [ logs, setLogs ] = useState<State>({
		criteria: {},
		data: [],
		itemCount: 0,
		pageCount: 1,
		pageNumber: 1,
		pageSize: PAGE_SIZE
	});
	useEffect(() => {
		const onSearch = async (criteria: MonitorLogCriteria) => {
			const page = await fetchMonitorLogs({ criteria, pageNumber: 1, pageSize: PAGE_SIZE });
			setLogs({ ...page, criteria });
		};
		on(MonitorLogEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(MonitorLogEventTypes.DO_SEARCH, onSearch);
		};
	}, [ on, off ]);

	const onPageChange = (option: DropdownOption) => {
		if (option.value === logs.pageNumber) {
			return;
		}
		(async () => {
			const page = await fetchMonitorLogs({
				criteria: logs.criteria,
				pageNumber: option.value,
				pageSize: PAGE_SIZE
			});
			setLogs({ ...page, criteria: logs.criteria });
		})();
	};

	const pipelineMap = pipelines.reduce((map, pipeline) => {
		map.set(pipeline.pipelineId, pipeline);
		return map;
	}, new Map<string, Pipeline>());
	const topicMap = topics.reduce((map, topic) => {
		map.set(topic.topicId, topic);
		return map;
	}, new Map<string, Topic>());

	const pageOptions: Array<DropdownOption> = new Array(logs.pageCount).fill(1).map((v, index) => {
		return { value: index + 1, label: `${index + 1}` };
	});

	return <SearchResultContainer>
		<SearchResultHeader>
			<div>
				<div>
					<span>Page</span>
					<span>
						<Dropdown value={logs.pageNumber} options={pageOptions} onChange={onPageChange}/>
					</span>
					<span>/</span>
					<span>{logs.pageCount}</span>
					<span>, Total</span>
					<span>{logs.itemCount}</span>
					<span>Rows</span>
				</div>
			</div>
			<div>#</div>
			<div>Run ID.</div>
			<div>Pipeline Name</div>
			<div>From Topic</div>
			<div>Status</div>
			<div>Run At</div>
		</SearchResultHeader>
		<SearchResultBody>
			{logs.data.map((row, index) => {
				return <SearchResultBodyRow key={row.uid}>
					<div>{index + 1 + logs.pageSize * (logs.pageNumber - 1)}</div>
					<div><span>{row.uid}</span></div>
					<div><span>{pipelineMap.get(row.pipelineId)?.name || row.pipelineId}</span></div>
					<div><span>{topicMap.get(row.topicId)?.name || row.topicId}</span></div>
					<div>{row.status}</div>
					<div>{row.startTime}</div>
				</SearchResultBodyRow>;
			})
			}
		</SearchResultBody>
	</SearchResultContainer>;
};