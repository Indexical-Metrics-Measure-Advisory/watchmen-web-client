import {
	ChangedDataFirstHeaderCell,
	ChangedDataNoDataCell,
	DataTable,
	DataTableBodyCell,
	DataTableBodyRow,
	DataTableHeader,
	DataTableHeaderCell,
	SectionTitle
} from './widgets';
import React, {Fragment} from 'react';
import {AllTopics, ChangedDataRow} from '../types';
import {getTopicName} from '../../../utils';
import {Topic} from '../../../../../services/tuples/topic-types';

export const ChangedData = (props: {
	topics: AllTopics;
	data: Array<ChangedDataRow>;
}) => {
	const {topics, data} = props;

	const dataMap = data.reduce((map, changedRow) => {
		const {topicId} = changedRow;
		let rows = map.get(topicId);
		if (!rows) {
			rows = [];
			map.set(topicId, rows);
		}
		rows.push(changedRow);
		return map;
	}, new Map<string, Array<ChangedDataRow>>());

	const topicsData = Object.keys(topics)
		.map(topicId => topics[topicId]!)
		.sort((t1, t2) => {
			return getTopicName(t1).localeCompare(getTopicName(t2));
		}).map(topic => {
			return {
				topic,
				data: dataMap.get(topic.topicId)
			};
		}).filter(x => x.data != null && x.data.length !== 0) as Array<{ topic: Topic, data: Array<ChangedDataRow> }>;

	return <>
		{topicsData.map(({topic, data}) => {
			const factors = topic.factors;
			const factorsCount = factors.length;
			return <Fragment key={topic.topicId}>
				<SectionTitle>Changed: {getTopicName(topic)}</SectionTitle>
				<DataTable>
					<DataTableHeader firstWidth={80} columnCount={factorsCount}>
						<DataTableHeaderCell>#</DataTableHeaderCell>
						{factors.map(factor => {
							return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
						})}
					</DataTableHeader>
					{data.map((row, rowIndex) => {
						return <Fragment key={rowIndex}>
							{row.before == null
								? <DataTableBodyRow firstWidth={80} columnCount={factorsCount}>
									<ChangedDataFirstHeaderCell>{rowIndex + 1}.org</ChangedDataFirstHeaderCell>
									<ChangedDataNoDataCell columnCount={factorsCount - 1}>
										Original data not exists.
									</ChangedDataNoDataCell>
								</DataTableBodyRow>
								: <DataTableBodyRow firstWidth={80} columnCount={factorsCount}>
									<ChangedDataFirstHeaderCell>{rowIndex + 1}.org</ChangedDataFirstHeaderCell>
									{factors.map(factor => {
										return <DataTableBodyCell key={factor.factorId}>
											{row.before ? row.before[factor.name] : null}
										</DataTableBodyCell>;
									})}
								</DataTableBodyRow>
							}
							<DataTableBodyRow firstWidth={80} columnCount={factorsCount}>
								<ChangedDataFirstHeaderCell>{rowIndex + 1}.chg</ChangedDataFirstHeaderCell>
								{factors.map(factor => {
									return <DataTableBodyCell key={factor.factorId}>
										{row.after ? row.after[factor.name] : null}
									</DataTableBodyCell>;
								})}
							</DataTableBodyRow>
						</Fragment>;
					})}
				</DataTable>
			</Fragment>;
		})}
	</>;
};