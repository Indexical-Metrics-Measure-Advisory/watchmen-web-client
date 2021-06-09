import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {Button} from '../../basic-widgets/button';
import {ICON_SEARCH, ICON_SELECTED} from '../../basic-widgets/constants';
import {Dropdown} from '../../basic-widgets/dropdown';
import {ButtonInk, DropdownOption} from '../../basic-widgets/types';
import {GradePickerContainer, SearchCriteriaContainer, SearchLabel} from './widgets';
import {useRulesEventBus} from './rules-event-bus';
import {RulesEventTypes} from './rules-event-bus-types';
import {RuleGrade, RulesCriteria} from '../../services/data-quality/rules';
import {useDataQualityCacheData} from '../cache/use-cache-data';
import {DQCCacheData} from '../cache/types';
import {Topic} from '../../services/tuples/topic-types';

export const SearchCriteria = () => {
	const {fire} = useRulesEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [criteria, setCriteria] = useState<RulesCriteria>({grade: RuleGrade.GLOBAL});
	useDataQualityCacheData({
		onDataRetrieved: (data?: DQCCacheData) => {
			if (data) {
				setTopics(data.topics);
			}
		}
	});

	const onGradeClicked = (grade: RuleGrade) => () => {
		setCriteria(({...criteria, grade}));
	};
	const onTopicChanged = (option: DropdownOption) => {
		setCriteria({...criteria, topicId: option.value});
	};
	const onStatusChanged = (option: DropdownOption) => {
		if (option.value === '') {
			setCriteria({grade: criteria.grade, topicId: criteria.topicId});
		} else {
			setCriteria({...criteria, enabled: option.value});
		}
	};
	const onSearchClicked = () => fire(RulesEventTypes.DO_SEARCH, criteria);

	const topicOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Topic'},
		...topics.map(topic => {
			return {
				value: topic.topicId,
				label: topic.name
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];
	const statusOptions: Array<DropdownOption> = [
		{value: '', label: 'Any Status'},
		{value: true, label: 'Effective'},
		{value: false, label: 'Suspended'}
	];

	return <SearchCriteriaContainer>
		<SearchLabel>Grade</SearchLabel>
		<GradePickerContainer>
			<Button ink={criteria.grade === RuleGrade.GLOBAL ? ButtonInk.PRIMARY : ButtonInk.WAIVE}
			        onClick={onGradeClicked(RuleGrade.GLOBAL)}>
				<span>Global</span>
				{criteria.grade === RuleGrade.GLOBAL ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}
			</Button>
			<Button ink={criteria.grade === RuleGrade.TOPIC ? ButtonInk.PRIMARY : ButtonInk.WAIVE}
			        onClick={onGradeClicked(RuleGrade.TOPIC)}>
				<span>On Topic</span>
				{criteria.grade === RuleGrade.TOPIC ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}
			</Button>
		</GradePickerContainer>
		{criteria.grade === RuleGrade.TOPIC
			? <>
				<SearchLabel>Topic</SearchLabel>
				<Dropdown options={topicOptions} value={criteria.topicId} onChange={onTopicChanged}/>
			</>
			: null}
		<SearchLabel>Status</SearchLabel>
		<Dropdown options={statusOptions} value={criteria.enabled} onChange={onStatusChanged}/>
		<Button ink={ButtonInk.PRIMARY} onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
			<span>Find</span>
		</Button>
	</SearchCriteriaContainer>;
};