import {Topic} from '@/services/data/tuples/topic-types';
import {ButtonInk} from '@/widgets/basic/types';
import React from 'react';
import {DataRow} from '../../../types';
import {getTopicName} from '../../../utils';
import {toString} from './utils';
import {
	DataTable,
	DataTableBodyCell,
	DataTableBodyRow,
	DataTableHeader,
	DataTableHeaderCell,
	SectionTitle,
	TriggerDataFirstHeaderCell,
	TriggerDataNoOldCell
} from './widgets';

export const TriggerData = (props: {
	topic: Topic;
	oldOne?: DataRow;
	newOne: DataRow
}) => {
	const {topic, oldOne, newOne} = props;
	const factors = topic.factors;

	// only top level factors
	// use json object/array string for raw topic
	// eslint-disable-next-line
	const availableFactors = factors.filter(f => f.name.indexOf('.') == -1);
	const factorsCount = availableFactors.length;

	return <>
		<SectionTitle ink={ButtonInk.WARN}>Trigger By: {getTopicName(topic)}</SectionTitle>
		<DataTable>
			<DataTableHeader firstWidth={80} columnCount={factorsCount}>
				<DataTableHeaderCell>#</DataTableHeaderCell>
				{availableFactors.map(factor => {
					return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
				})}
			</DataTableHeader>
			<DataTableBodyRow firstWidth={80} columnCount={factorsCount}>
				<TriggerDataFirstHeaderCell>new</TriggerDataFirstHeaderCell>
				{availableFactors.map(factor => {
					return <DataTableBodyCell key={factor.factorId}>
						{toString(newOne[factor.name])}
					</DataTableBodyCell>;
				})}
			</DataTableBodyRow>
			<DataTableBodyRow firstWidth={80} columnCount={factorsCount}>
				<TriggerDataFirstHeaderCell>old</TriggerDataFirstHeaderCell>
				{oldOne == null
					? <TriggerDataNoOldCell columnCount={factorsCount}>
						Trigger data is inserted, old one doesn't exist.
					</TriggerDataNoOldCell>
					: availableFactors.map(factor => {
						return <DataTableBodyCell key={factor.factorId}>
							{toString(oldOne[factor.name])}
						</DataTableBodyCell>;
					})
				}
			</DataTableBodyRow>
		</DataTable>
	</>;
};