import React, {useState} from 'react';
import {MonitorLogRow} from '@/services/admin/logs';
import {Pipeline} from '@/services/tuples/pipeline-types';
import {Topic} from '@/services/tuples/topic-types';
import {ResultRowDetail} from '../result-row-detail';
import {
	SearchResultBodyCell,
	SearchResultBodyRow,
	SearchResultBodySeqCell,
	SearchResultBodyStatusCell
} from './widgets';

export const SearchResultRow = (props: {
	row: MonitorLogRow;
	index: number;
	pipelinesMap: Map<string, Pipeline>;
	topicsMap: Map<string, Topic>;
}) => {
	const {row, index, pipelinesMap, topicsMap} = props;

	const [showDetail, setShowDetail] = useState(false);

	const pipeline = pipelinesMap.get(row.pipelineId);
	const onShowDetailClicked = () => {
		if (!showDetail && pipeline) {
			setShowDetail(true);
		}
	};
	const closeDetail = () => setShowDetail(false);

	return <SearchResultBodyRow detail={showDetail}
	                            onClick={onShowDetailClicked}>
		<SearchResultBodySeqCell>{index}</SearchResultBodySeqCell>
		<SearchResultBodyCell><span>{row.uid}</span></SearchResultBodyCell>
		<SearchResultBodyCell><span>{pipeline?.name || row.pipelineId}</span></SearchResultBodyCell>
		<SearchResultBodyCell><span>{topicsMap.get(row.topicId)?.name || row.topicId}</span></SearchResultBodyCell>
		<SearchResultBodyStatusCell>{row.status}</SearchResultBodyStatusCell>
		<SearchResultBodyCell>{(row.startTime || '').replace('T', ' ')}</SearchResultBodyCell>
		{(showDetail && pipeline)
			? <ResultRowDetail row={row}
			                   pipeline={pipeline} topicsMap={topicsMap}
			                   onClose={closeDetail}/>
			: null}
	</SearchResultBodyRow>;
};