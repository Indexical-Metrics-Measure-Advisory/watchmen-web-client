import {
	AllDataNoDataCell,
	DataTable,
	DataTableBodyCell,
	DataTableBodyRow,
	DataTableHeader,
	DataTableHeaderCell,
	SectionTitle,
	TriggerDataFirstHeaderCell
} from './widgets';
import React from 'react';
import {TopicsData} from '../../state/types';
import {AllTopics} from '../types';
import {getTopicName} from '../../../utils';

export const AllData = (props: {
	topics: AllTopics;
	data: TopicsData;
}) => {
	const {topics, data} = props;

	const topicsData = Object.keys(topics)
		.map(topicId => topics[topicId]!)
		.sort((t1, t2) => {
			return getTopicName(t1).localeCompare(getTopicName(t2));
		}).map(topic => {
			return {
				topic,
				data: data[topic.topicId]
			};
		}).filter(x => x.data != null);

	return <>
		{topicsData.map(({topic, data}) => {
			const factors = topic.factors;
			return <>
				<SectionTitle>Before Run: {getTopicName(topic)}</SectionTitle>
				<DataTable>
					<DataTableHeader columnCount={factors.length}>
						<DataTableHeaderCell>#</DataTableHeaderCell>
						{factors.map(factor => {
							return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
						})}
					</DataTableHeader>
					{data.length === 0
						? <AllDataNoDataCell columnCount={factors.length}>No Data.</AllDataNoDataCell>
						: data.map((row, rowIndex) => {
							return <DataTableBodyRow columnCount={factors.length} key={rowIndex}>
								<TriggerDataFirstHeaderCell>{rowIndex + 1}</TriggerDataFirstHeaderCell>
								{factors.map(factor => {
									return <DataTableBodyCell key={factor.factorId}>
										{row[factor.name]}
									</DataTableBodyCell>;
								})}
							</DataTableBodyRow>;
						})
					}
				</DataTable>
			</>;
		})}
	</>;
};