import {ButtonInk} from '@/widgets/basic/types';
import React, {Fragment} from 'react';
import {getTopicName} from '../../../utils';
import {TopicsData} from '../../state/types';
import {AllTopics} from '../types';
import {toString} from './utils';
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

export const AllData = (props: {
	topics: AllTopics;
	data: TopicsData;
	before: boolean;
}) => {
	const {topics, data, before} = props;

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
			// only top level factors
			// use json object/array string for raw topic
			// eslint-disable-next-line
			const availableFactors = factors.filter(f => f.name.indexOf('.') == -1);
			const factorsCount = availableFactors.length;

			return <Fragment key={topic.topicId}>
				<SectionTitle ink={before ? (void 0) : ButtonInk.SUCCESS}>
					{before ? 'Before' : 'After'} Run: {getTopicName(topic)}
				</SectionTitle>
				<DataTable>
					<DataTableHeader firstWidth={80} columnCount={factorsCount}>
						<DataTableHeaderCell>#</DataTableHeaderCell>
						{availableFactors.map(factor => {
							return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
						})}
					</DataTableHeader>
					{data.length === 0
						? <DataTableBodyRow firstWidth={80} columnCount={factorsCount}>
							<AllDataNoDataCell columnCount={factorsCount}>No Data.</AllDataNoDataCell>
						</DataTableBodyRow>
						: data.map((row, rowIndex) => {
							return <DataTableBodyRow firstWidth={80} columnCount={factorsCount} key={rowIndex}>
								<TriggerDataFirstHeaderCell>{rowIndex + 1}</TriggerDataFirstHeaderCell>
								{availableFactors.map(factor => {
									return <DataTableBodyCell key={factor.factorId}>
										{toString(row[factor.name])}
									</DataTableBodyCell>;
								})}
							</DataTableBodyRow>;
						})
					}
				</DataTable>
			</Fragment>;
		})}
	</>;
};