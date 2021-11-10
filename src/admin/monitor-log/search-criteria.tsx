import {MonitorLogCriteria, MonitorLogStatus} from '@/services/data/admin/logs';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {Button} from '@/widgets/basic/button';
import {Calendar, CALENDAR_FORMAT} from '@/widgets/basic/calendar';
import {ICON_SEARCH} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {Input} from '@/widgets/basic/input';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, {ChangeEvent, useState} from 'react';
import {useMonitorLogEventBus} from './monitor-log-event-bus';
import {MonitorLogEventTypes} from './monitor-log-event-bus-types';
import {SearchCriteriaContainer, SearchLabel} from './widgets';

const matchPipeline = (topicId: TopicId) => (pipeline: Pipeline) => {
	// eslint-disable-next-line
	if (pipeline.topicId == topicId) {
		return true;
	}
	// eslint-disable-next-line
	return (pipeline.stages || []).some(stage => (stage.units || []).some(unit => (unit.do || []).some(action => (action as any).topicId == topicId)));
};

const findPipelinesByTopic = (pipelines: Array<Pipeline>, topicId?: TopicId): Array<Pipeline> => {
	if (!topicId) {
		return pipelines;
	}
	return pipelines.filter(matchPipeline(topicId));
};

export const SearchCriteria = (props: {
	topics: Array<Topic>;
	pipelines: Array<Pipeline>;
}) => {
	const {topics, pipelines} = props;

	const {fire} = useMonitorLogEventBus();
	const [criteria, setCriteria] = useState<MonitorLogCriteria>({
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
				setCriteria({...criteria, topicId, pipelineId: ''});
				return;
			}
		}
		setCriteria({...criteria, topicId: option.value});
	};
	const onPipelineChanged = (option: DropdownOption) => {
		setCriteria({...criteria, pipelineId: option.value});
	};
	const onStatusChanged = (option: DropdownOption) => {
		setCriteria({...criteria, status: option.value});
	};
	const onTraceIdChanged = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		setCriteria(({...criteria, traceId: value}));
	};
	const onStartDateChanged = (value?: string) => {
		setCriteria({...criteria, startDate: value});
	};
	const onEndDateChanged = (value?: string) => {
		setCriteria({...criteria, endDate: value});
	};
	const onSearchClicked = () => fire(MonitorLogEventTypes.DO_SEARCH, {
		...criteria,
		traceId: criteria.traceId?.trim()
	});

	const topicOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Topic'},
		...topics.map(topic => {
			return {
				value: topic.topicId,
				label: topic.name
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];
	const pipelineOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Pipeline'},
		...findPipelinesByTopic(pipelines, criteria.topicId).map(pipeline => {
			return {
				value: pipeline.pipelineId,
				label: pipeline.name || 'Noname Pipeline'
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];
	const statusOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Status'},
		{value: MonitorLogStatus.ERROR, label: 'Error'},
		{value: MonitorLogStatus.DONE, label: 'Done'}
	];

	return <SearchCriteriaContainer>
		<SearchLabel>Search By</SearchLabel>
		<SearchLabel>Trace ID</SearchLabel>
		<Input value={criteria.traceId || ''} onChange={onTraceIdChanged}/>
		<SearchLabel>Topic</SearchLabel>
		<Dropdown options={topicOptions} value={criteria.topicId} onChange={onTopicChanged}/>
		<SearchLabel>Pipeline</SearchLabel>
		<Dropdown options={pipelineOptions} value={criteria.pipelineId} onChange={onPipelineChanged}/>
		<SearchLabel>Status</SearchLabel>
		<Dropdown options={statusOptions} value={criteria.status} onChange={onStatusChanged}/>
		<SearchLabel>From</SearchLabel>
		<Calendar value={criteria.startDate} onChange={onStartDateChanged}/>
		<SearchLabel>To</SearchLabel>
		<Calendar value={criteria.endDate} onChange={onEndDateChanged}/>
		<Button ink={ButtonInk.PRIMARY} onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
			<span>Find</span>
		</Button>
	</SearchCriteriaContainer>;
};