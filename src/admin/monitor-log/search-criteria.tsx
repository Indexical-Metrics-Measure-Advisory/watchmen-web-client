import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Button } from '../../basic-widgets/button';
import { Calendar, CALENDAR_FORMAT } from '../../basic-widgets/calendar';
import { ICON_SEARCH } from '../../basic-widgets/constants';
import { Dropdown } from '../../basic-widgets/dropdown';
import { ButtonInk, DropdownOption } from '../../basic-widgets/types';
import { SearchCriteriaContainer, SearchLabel } from './widgets';

interface Criteria {
	topicId?: string;
	pipelineId?: string;
	startDate?: string;
	endDate?: string;
}

export const SearchCriteria = () => {
	const [ criteria, setCriteria ] = useState<Criteria>({
		startDate: dayjs().startOf('date').format(CALENDAR_FORMAT),
		endDate: dayjs().format(CALENDAR_FORMAT)
	});

	const onTopicChanged = (option: DropdownOption) => {
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

	const topicOptions: Array<DropdownOption> = [];
	const pipelineOptions: Array<DropdownOption> = [];

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