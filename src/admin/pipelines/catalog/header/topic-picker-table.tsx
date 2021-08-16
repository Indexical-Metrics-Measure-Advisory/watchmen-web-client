import {Input} from '../../../../basic-widgets/input';
import {CheckBox} from '../../../../basic-widgets/checkbox';
import React, {ChangeEvent, useState} from 'react';
import {
	PickerTableBody,
	PickerTableBodyCell,
	PickerTableBodyRow,
	PickerTableHeader,
	PickerTableHeaderCell
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
	const onAllSelectionChange = () => {
		const allSelected = items.every(item => item.picked);
		if (allSelected) {
			items.forEach(item => item.picked = false);
		} else {
			items.forEach(item => item.picked = true);
		}
		forceUpdate();
	};
	const onSelectionChange = (candidate: TopicCandidate) => (value: boolean) => {
		candidate.picked = value;
		forceUpdate();
	};

	const allSelected = items.every(item => item.picked);

	return <>
		<PickerTableHeader>
			<PickerTableHeaderCell>#</PickerTableHeaderCell>
			<PickerTableHeaderCell>
				<CheckBox value={allSelected} onChange={onAllSelectionChange}/>
			</PickerTableHeaderCell>
			<PickerTableHeaderCell>
				<span>Topic</span>
				<Input placeholder="Filter by name..."
				       value={filter.value} onChange={onFilterTextChanged}/>
			</PickerTableHeaderCell>
		</PickerTableHeader>
		<PickerTableBody>
			{items.map((candidate, index) => {
				return <PickerTableBodyRow key={candidate.topic.topicId}>
					<PickerTableBodyCell>{index + 1}</PickerTableBodyCell>
					<PickerTableBodyCell>
						<CheckBox value={candidate.picked} onChange={onSelectionChange(candidate)}/>
					</PickerTableBodyCell>
					<PickerTableBodyCell>{candidate.topic.name || 'Noname Topic'}</PickerTableBodyCell>
				</PickerTableBodyRow>;
			})}
		</PickerTableBody>
	</>;
};