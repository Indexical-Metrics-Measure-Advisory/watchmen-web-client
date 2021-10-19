import {PipelinesMap, TopicsMap} from '@/services/data/pipeline/pipeline-relations';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {CheckBox} from '@/widgets/basic/checkbox';
import {Input} from '@/widgets/basic/input';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent, useState} from 'react';
import {PipelineCandidate, TopicCandidate} from './types';
import {getCandidateName, isPipelineCandidate, isTopicCandidate} from './utils';
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

interface Candidates {
	topics: Array<TopicCandidate>;
	pipelines: Array<PipelineCandidate>;
}

export const ImportPickerTable = (props: { candidates: Candidates; cachedTopics: Array<Topic>; cachedPipelines: Array<Pipeline>; }) => {
	const {candidates: {topics: topicCandidates, pipelines: pipelineCandidates}, cachedTopics, cachedPipelines} = props;

	const [items, setItems] = useState([...topicCandidates, ...pipelineCandidates]);
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
					setItems([...topicCandidates, ...pipelineCandidates]);
				} else {
					setItems([...topicCandidates, ...pipelineCandidates].filter(candidate => {
						return getCandidateName(candidate).toLowerCase().includes(text);
					}));
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
	const onSelectionChange = (candidate: TopicCandidate | PipelineCandidate) => (value: boolean) => {
		candidate.picked = value;
		forceUpdate();
	};

	const allSelected = items.every(item => item.picked);

	const topicsMap: TopicsMap = cachedTopics.reduce((map, topic) => {
		map[topic.topicId] = topic;
		return map;
	}, {} as TopicsMap);
	const pipelinesMap: PipelinesMap = cachedPipelines.reduce((map, pipeline) => {
		map[pipeline.pipelineId] = pipeline;
		return map;
	}, {} as PipelinesMap);

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
				let key;
				let name;
				let comment;
				if (isTopicCandidate(candidate)) {
					key = `t-${candidate.topic.topicId}`;
					name = candidate.topic.name || 'Noname Topic';
					if (topicsMap[candidate.topic.topicId] != null) {
						comment = 'Already exists.';
					}
				} else if (isPipelineCandidate(candidate)) {
					key = `p-${candidate.pipeline.pipelineId}`;
					name = candidate.pipeline.name || 'Noname Pipeline';
					if (pipelinesMap[candidate.pipeline.pipelineId] != null) {
						comment = 'Already exists.';
					}
				} else {
					return null;
				}
				return <PickerTableBodyRow columns={4} key={key}>
					<PickerTableBodyCell>{index + 1}</PickerTableBodyCell>
					<PickerTableBodyCell>
						<CheckBox value={candidate.picked} onChange={onSelectionChange(candidate)}/>
					</PickerTableBodyCell>
					<PickerTableBodyCell>{name}</PickerTableBodyCell>
					<PickerTableBodyCell>{comment}</PickerTableBodyCell>
				</PickerTableBodyRow>;
			}).filter(x => x)}
		</PickerTableBody>
	</>;
};