import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { ICON_DOWNLOAD, ICON_DOWNLOAD_PAGE } from '../../basic-widgets/constants';
import { ButtonInk, DropdownOption } from '../../basic-widgets/types';
import { useEventBus } from '../../events/event-bus';
import { EventTypes } from '../../events/types';
import { fetchMonitorLogs, MonitorLogCriteria, MonitorLogs, MonitorLogsDataPage } from '../../services/admin/logs';
import { Pipeline } from '../../services/tuples/pipeline-types';
import { Topic } from '../../services/tuples/topic-types';
import { MAX_MONITOR_LOGS_DATASET_SIZE } from './constants';
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
	SearchResultHeaderButton,
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

	const { fire: fireGlobal } = useEventBus();
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
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchMonitorLogs({ criteria, pageNumber: 1, pageSize: PAGE_SIZE }),
				(page: MonitorLogsDataPage) => setLogs({ ...page, criteria }));
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
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchMonitorLogs({
				criteria: logs.criteria,
				pageNumber: option.value,
				pageSize: PAGE_SIZE
			}),
			(page) => setLogs({ ...page, criteria: logs.criteria }));
	};
	const download = (data: MonitorLogs) => {
		const content = JSON.stringify(data);
		const link = document.createElement('a');
		link.href = 'data:application/json;charset=utf-8,' + encodeURI(content);
		link.target = '_blank';
		link.download = `monitor-logs-${dayjs().format('YYYYMMDDHHmmss')}.json`;
		link.click();
	};
	const onDownloadPageClicked = () => {
		download(logs.data || []);
	};
	const onDownloadAllClicked = () => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchMonitorLogs({
				criteria: logs.criteria,
				pageNumber: 1,
				pageSize: MAX_MONITOR_LOGS_DATASET_SIZE
			}),
			(data) => download(data));
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
				<SearchResultHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadPageClicked}>
					<FontAwesomeIcon icon={ICON_DOWNLOAD_PAGE}/>
					<span>Download Page</span>
				</SearchResultHeaderButton>
				<SearchResultHeaderButton ink={ButtonInk.PRIMARY} onClick={onDownloadAllClicked}>
					<FontAwesomeIcon icon={ICON_DOWNLOAD}/>
					<span>Download All</span>
				</SearchResultHeaderButton>
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