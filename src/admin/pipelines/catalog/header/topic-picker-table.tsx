import {Input} from '../../../../basic-widgets/input';
import {CheckBox} from '../../../../basic-widgets/checkbox';
import React, {ChangeEvent, useState} from 'react';
import {
	TopicPickerTableBody,
	TopicPickerTableBodyCell,
	TopicPickerTableBodyRow,
	TopicPickerTableHeader,
	TopicPickerTableHeaderCell
} from './widgets';
import {Topic} from '../../../../services/tuples/topic-types';
import {useForceUpdate} from '../../../../basic-widgets/utils';

interface Filter {
	value: string;
	handler?: number;
}

interface TopicCandidate {
	topic: Topic;
	picked: boolean;
}

export const TopicPickerTable = (props: { candidates: Array<TopicCandidate> }) => {
	const {candidates} = props;

	const [items, setItems] = useState(candidates);
	const [filter, setFilter] = useState<Filter>({value: ''});
	const forceUpdate = useForceUpdate();

	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (filter.handler) {
			clearTimeout(filter.handler);
		}
		setFilter({
			value, handler: window.setTimeout(() => {
				delete filter.handler;
				const text = value.trim().toLowerCase();
				if (text === '') {
					setItems(candidates);
				} else {
					setItems(candidates.filter(({topic}) => (topic.name || 'Noname Topic').toLowerCase().includes(text)));
				}
			}, 300)
		});
	};
	const onSelectionChange = (candidate: TopicCandidate) => (value: boolean) => {
		candidate.picked = value;
		forceUpdate();
	};

	return <>
		<TopicPickerTableHeader>
			<TopicPickerTableHeaderCell>#</TopicPickerTableHeaderCell>
			<TopicPickerTableHeaderCell>View</TopicPickerTableHeaderCell>
			<TopicPickerTableHeaderCell>
				<span>Topic</span>
				<Input placeholder="Filter by name..."
				       value={filter.value} onChange={onFilterTextChanged}/>
			</TopicPickerTableHeaderCell>
		</TopicPickerTableHeader>
		<TopicPickerTableBody>
			{items.map((candidate, index) => {
				return <TopicPickerTableBodyRow key={candidate.topic.topicId}>
					<TopicPickerTableBodyCell>{index + 1}</TopicPickerTableBodyCell>
					<TopicPickerTableBodyCell>
						<CheckBox value={candidate.picked} onChange={onSelectionChange(candidate)}/>
					</TopicPickerTableBodyCell>
					<TopicPickerTableBodyCell>{candidate.topic.name || 'Noname Topic'}</TopicPickerTableBodyCell>
				</TopicPickerTableBodyRow>;
			})}
		</TopicPickerTableBody>
	</>;
};