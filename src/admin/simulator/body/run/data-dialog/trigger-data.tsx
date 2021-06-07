import {Topic} from '../../../../../services/tuples/topic-types';
import {DataRow} from '../../../simulator-event-bus-types';
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
import React from 'react';
import {getTopicName} from '../../../utils';
import {ButtonInk} from '../../../../../basic-widgets/types';

export const TriggerData = (props: {
	topic: Topic;
	oldOne?: DataRow;
	newOne: DataRow
}) => {
	const {topic, oldOne, newOne} = props;
	const factors = topic.factors;

	return <>
		<SectionTitle ink={ButtonInk.WARN}>Trigger By: {getTopicName(topic)}</SectionTitle>
		<DataTable>
			<DataTableHeader firstWidth={80} columnCount={factors.length}>
				<DataTableHeaderCell>#</DataTableHeaderCell>
				{factors.map(factor => {
					return <DataTableHeaderCell key={factor.factorId}>{factor.name}</DataTableHeaderCell>;
				})}
			</DataTableHeader>
			<DataTableBodyRow firstWidth={80} columnCount={factors.length}>
				<TriggerDataFirstHeaderCell>new</TriggerDataFirstHeaderCell>
				{factors.map(factor => {
					return <DataTableBodyCell key={factor.factorId}>
						{JSON.stringify(newOne[factor.name])}
					</DataTableBodyCell>;
				})}
			</DataTableBodyRow>
			<DataTableBodyRow firstWidth={80} columnCount={factors.length}>
				<TriggerDataFirstHeaderCell>old</TriggerDataFirstHeaderCell>
				{oldOne == null
					? <TriggerDataNoOldCell columnCount={factors.length}>
						Trigger data is inserted, old one doesn't exist.
					</TriggerDataNoOldCell>
					: factors.map(factor => {
						return <DataTableBodyCell key={factor.factorId}>
							{JSON.stringify(oldOne[factor.name])}
						</DataTableBodyCell>;
					})
				}
			</DataTableBodyRow>
		</DataTable>
	</>;
};