import React, { useEffect, useState } from 'react';
import { DropdownOption } from '../../basic-widgets/types';
import { fetchMonitorLogs, MonitorLogCriteria, MonitorLogsDataPage } from '../../services/admin/logs';
import { Pipeline } from '../../services/tuples/pipeline-types';
import { Topic } from '../../services/tuples/topic-types';
import { useMonitorLogEventBus } from './monitor-log-event-bus';
import { MonitorLogEventTypes } from './monitor-log-event-bus-types';
import {
	SearchResultBody,
	SearchResultBodyCell,
	SearchResultBodyRow,
	SearchResultBodySeqCell,
	SearchResultBodyStatusCell,
	SearchResultContainer,
	SearchResultHeader,
	SearchResultHeaderCell,
	SearchResultHeaderOperators,
	SearchResultHeaderPagination,
	SearchResultHeaderPaginationDropdown,
	SearchResultHeaderPaginationLabel,
	SearchResultHeaderSeqCell
} from './widgets';

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
			<SearchResultHeaderOperators>
				<SearchResultHeaderPagination>
					<SearchResultHeaderPaginationLabel>Page</SearchResultHeaderPaginationLabel>
					<SearchResultHeaderPaginationDropdown value={logs.pageNumber} options={pageOptions}
					                                      onChange={onPageChange}/>
					<SearchResultHeaderPaginationLabel>/</SearchResultHeaderPaginationLabel>
					<SearchResultHeaderPaginationLabel>{logs.pageCount}</SearchResultHeaderPaginationLabel>
					<SearchResultHeaderPaginationLabel>, Total</SearchResultHeaderPaginationLabel>
					<SearchResultHeaderPaginationLabel>{logs.itemCount}</SearchResultHeaderPaginationLabel>
					<SearchResultHeaderPaginationLabel>Rows</SearchResultHeaderPaginationLabel>
				</SearchResultHeaderPagination>
			</SearchResultHeaderOperators>
			<SearchResultHeaderSeqCell>#</SearchResultHeaderSeqCell>
			<SearchResultHeaderCell>Run ID.</SearchResultHeaderCell>
			<SearchResultHeaderCell>Pipeline Name</SearchResultHeaderCell>
			<SearchResultHeaderCell>From Topic</SearchResultHeaderCell>
			<SearchResultHeaderCell>Status</SearchResultHeaderCell>
			<SearchResultHeaderCell>Run At</SearchResultHeaderCell>
		</SearchResultHeader>
		<SearchResultBody>
			{logs.data.map((row, index) => {
				return <SearchResultBodyRow key={row.uid}>
					<SearchResultBodySeqCell>{index + 1 + logs.pageSize * (logs.pageNumber - 1)}</SearchResultBodySeqCell>
					<SearchResultBodyCell><span>{row.uid}</span></SearchResultBodyCell>
					<SearchResultBodyCell><span>{pipelineMap.get(row.pipelineId)?.name || row.pipelineId}</span></SearchResultBodyCell>
					<SearchResultBodyCell><span>{topicMap.get(row.topicId)?.name || row.topicId}</span></SearchResultBodyCell>
					<SearchResultBodyStatusCell>{row.status}</SearchResultBodyStatusCell>
					<SearchResultBodyCell>{row.startTime}</SearchResultBodyCell>
				</SearchResultBodyRow>;
			})
			}
		</SearchResultBody>
	</SearchResultContainer>;
};