import {CheckBox} from '@/widgets/basic/checkbox';
import {Input} from '@/widgets/basic/input';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent, useState} from 'react';
import {SpaceCandidate, TopicCandidate} from './types';
import {getCandidateKey, getCandidateName, getCandidateType, isSpaceCandidate, isTopicCandidate} from './utils';
import {
	PickerTableBody,
	PickerTableBodyCell,
	PickerTableBodyRow,
	PickerTableHeader,
	PickerTableHeaderCell
} from './widgets';

interface Filter {
	value: string;
	handler?: number;
}

export const TopicPickerTable = (props: { candidates: Array<TopicCandidate | SpaceCandidate> }) => {
	const {candidates} = props;

	const [items, setItems] = useState(candidates);
	const [filter, setFilter] = useState<Filter>({value: ''});
	const forceUpdate = useForceUpdate();

	const onFilterTextChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (filter.handler) {
			window.clearTimeout(filter.handler);
		}
		setFilter({
			value, handler: window.setTimeout(() => {
				delete filter.handler;
				const text = value.trim().toLowerCase();
				if (text === '') {
					setItems(candidates);
				} else {
					setItems(candidates.filter(candidate => getCandidateName(candidate).toLowerCase().includes(text)));
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
	const onSelectionChange = (candidate: TopicCandidate | SpaceCandidate) => (value: boolean) => {
		candidate.picked = value;
		if (isTopicCandidate(candidate) && !candidate.picked) {
			// unpick a topic, unpick related spaces as well
			candidates.filter(isSpaceCandidate).forEach(spaceCandidate => {
				// eslint-disable-next-line
				if ((spaceCandidate.space.topicIds || []).some(topicId => topicId == candidate.topic.topicId)) {
					spaceCandidate.picked = false;
				}
			});
		} else if (isSpaceCandidate(candidate) && candidate.picked) {
			// pick a space, pick related topics as well
			candidates.filter(isTopicCandidate).forEach(topicCandidate => {
				// eslint-disable-next-line
				if ((candidate.space.topicIds || []).some(topicId => topicId == topicCandidate.topic.topicId)) {
					topicCandidate.picked = true;
				}
			});
		}
		forceUpdate();
	};

	const allSelected = items.every(item => item.picked);

	return <>
		<PickerTableHeader>
			<PickerTableHeaderCell>#</PickerTableHeaderCell>
			<PickerTableHeaderCell>
				<CheckBox value={allSelected} data-checked={allSelected} onChange={onAllSelectionChange}/>
			</PickerTableHeaderCell>
			<PickerTableHeaderCell>Tuple Type</PickerTableHeaderCell>
			<PickerTableHeaderCell>
				<span>Name</span>
				<Input placeholder="Filter by name..."
				       value={filter.value} onChange={onFilterTextChanged}/>
			</PickerTableHeaderCell>
		</PickerTableHeader>
		<PickerTableBody>
			{items.map((candidate, index) => {
				return <PickerTableBodyRow key={getCandidateKey(candidate)}>
					<PickerTableBodyCell>{index + 1}</PickerTableBodyCell>
					<PickerTableBodyCell>
						<CheckBox value={candidate.picked} data-checked={candidate.picked}
						          onChange={onSelectionChange(candidate)}/>
					</PickerTableBodyCell>
					<PickerTableBodyCell>{getCandidateType(candidate)}</PickerTableBodyCell>
					<PickerTableBodyCell>{getCandidateName(candidate)}</PickerTableBodyCell>
				</PickerTableBodyRow>;
			})}
		</PickerTableBody>
	</>;
};