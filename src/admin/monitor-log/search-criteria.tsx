import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Button } from '../../basic-widgets/button';
import { Calendar, CALENDAR_FORMAT } from '../../basic-widgets/calendar';
import { ICON_SEARCH } from '../../basic-widgets/constants';
import { Dropdown } from '../../basic-widgets/dropdown';
import { ButtonInk, DropdownOption } from '../../basic-widgets/types';
import { Pipeline } from '../../services/tuples/pipeline-types';
import { Topic } from '../../services/tuples/topic-types';
import { SearchCriteriaContainer, SearchLabel } from './widgets';

interface Criteria {
	topicId?: string;
	pipelineId?: string;
	startDate?: string;
	endDate?: string;
}

const matchPipeline = (topicId: string) => (pipeline: Pipeline) => {
	if (pipeline.topicId == topicId) {
		return true;
	}
	return (pipeline.stages || []).some(stage => (stage.units || []).some(unit => (unit.do || []).some(action => (action as any).topicId == topicId)));
};

const findPipelinesByTopic = (pipelines: Array<Pipeline>, topicId?: string): Array<Pipeline> => {
	if (!topicId) {
		return pipelines;
	}
	return pipelines.filter(matchPipeline(topicId));
};

export const SearchCriteria = (props: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}) => {
	const { topics, pipelines } = props;

	const [ criteria, setCriteria ] = useState<Criteria>({
		startDate: dayjs().startOf('date').format(CALENDAR_FORMAT),
		endDate: dayjs().format(CALENDAR_FORMAT)
	});

	const onTopicChanged = (option: DropdownOption) => {
		const topicId = option.value;
		if (topicId && criteria.pipelineId) {
			// eslint-disable-next-line
			const pipeline = findPipelinesByTopic(pipelines, topicId).find(pipeline => pipeline.pipelineId == criteria.pipelineId);
			// eslint-disable-next-line
			if (!pipeline || pipeline.topicId != topicId) {
				setCriteria({ ...criteria, topicId, pipelineId: '' });
				return;
			}
		}
		setCriteria({ ...criteria, topicId: option.value });
	};
	const onPipelineChanged = (option: DropdownOption) => {
		setCriteria({ ...criteria, pipelineId: option.value });
	};
	const onStartDateChanged = (value?: string) => {
		setCriteria({ ...criteria, startDate: value });
	};
	const onEndDateChanged = (value?: string) => {
		setCriteria({ ...criteria, endDate: value });
	};

	const topicOptions: Array<DropdownOption> = [
		{ value: '', label: 'Any Topic' },
		...topics.map(topic => {
			return {
				value: topic.topicId,
				label: topic.name
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];
	const pipelineOptions: Array<DropdownOption> = [
		{ value: '', label: 'Any Pipeline' },
		...findPipelinesByTopic(pipelines, criteria.topicId).map(pipeline => {
			return {
				value: pipeline.pipelineId,
				label: pipeline.name || 'Noname Pipeline'
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];

	return <SearchCriteriaContainer>
		<SearchLabel>Search By</SearchLabel>
		<SearchLabel>Topic</SearchLabel>
		<Dropdown options={topicOptions} value={criteria.topicId} onChange={onTopicChanged}/>
		<SearchLabel>Pipeline</SearchLabel>
		<Dropdown options={pipelineOptions} value={criteria.pipelineId} onChange={onPipelineChanged}/>
		<SearchLabel>From</SearchLabel>
		<Calendar value={criteria.startDate} onChange={onStartDateChanged}/>
		<SearchLabel>To</SearchLabel>
		<Calendar value={criteria.endDate} onChange={onEndDateChanged}/>
		<Button ink={ButtonInk.PRIMARY}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
			<span>Find</span>
		</Button>
	</SearchCriteriaContainer>;
};