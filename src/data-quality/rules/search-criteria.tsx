import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {Button} from '../../basic-widgets/button';
import {ICON_SEARCH, ICON_SELECTED} from '../../basic-widgets/constants';
import {Dropdown} from '../../basic-widgets/dropdown';
import {ButtonInk, DropdownOption} from '../../basic-widgets/types';
import {GradePickerContainer, SearchCriteriaContainer, SearchLabel} from './widgets';
import {useRulesEventBus} from './rules-event-bus';
import {RulesEventTypes} from './rules-event-bus-types';
import {MonitorRuleGrade, MonitorRulesCriteria} from '../../services/data-quality/rules';
import {useDataQualityCacheData} from '../cache/use-cache-data';
import {DQCCacheData} from '../cache/types';
import {Topic} from '../../services/tuples/topic-types';
import {EventTypes} from '../../events/types';
import {AlertLabel} from '../../alert/widgets';
import {useEventBus} from '../../events/event-bus';

export const SearchCriteria = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useRulesEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [criteria, setCriteria] = useState<MonitorRulesCriteria>({grade: MonitorRuleGrade.GLOBAL});
	useDataQualityCacheData({
		onDataRetrieved: (data?: DQCCacheData) => {
			if (data) {
				setTopics(data.topics);
			}
		}
	});

	const onGradeClicked = (grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC) => () => {
		if (grade === MonitorRuleGrade.GLOBAL) {
			setCriteria({grade, enabled: criteria.enabled});
		} else {
			setCriteria(({...criteria, grade}));
		}
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
	const onSearchClicked = () => {
		if (criteria.grade === MonitorRuleGrade.TOPIC) {
			// eslint-disable-next-line
			const topic = topics.find(topic => topic.topicId == criteria.topicId);
			if (!topic) {
				fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>Please pick a topic first.</AlertLabel>);
			} else {
				fire(RulesEventTypes.DO_SEARCH, criteria, topic);
			}
		} else {
			fire(RulesEventTypes.DO_SEARCH, criteria);
		}
	};

	const topicOptions: Array<DropdownOption> = [
		...topics.map(topic => {
			return {
				value: topic.topicId,
				label: topic.name
			};
		}).sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase()))
	];
	const statusOptions: Array<DropdownOption> = [
		{value: '', label: 'Any'},
		{value: true, label: 'Effective'},
		{value: false, label: 'Suspended'}
	];

	return <SearchCriteriaContainer>
		<SearchLabel>Grade</SearchLabel>
		<GradePickerContainer>
			<Button ink={criteria.grade === MonitorRuleGrade.GLOBAL ? ButtonInk.PRIMARY : ButtonInk.WAIVE}
			        onClick={onGradeClicked(MonitorRuleGrade.GLOBAL)}>
				<span>Global</span>
				{criteria.grade === MonitorRuleGrade.GLOBAL ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}
			</Button>
			<Button ink={criteria.grade === MonitorRuleGrade.TOPIC ? ButtonInk.PRIMARY : ButtonInk.WAIVE}
			        onClick={onGradeClicked(MonitorRuleGrade.TOPIC)}>
				<span>On Topic</span>
				{criteria.grade === MonitorRuleGrade.TOPIC ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}
			</Button>
		</GradePickerContainer>
		{criteria.grade === MonitorRuleGrade.TOPIC
			? <>
				<SearchLabel>Topic</SearchLabel>
				<Dropdown options={topicOptions} value={criteria.topicId} onChange={onTopicChanged}/>
			</>
			: null}
		<SearchLabel>Enabled</SearchLabel>
		<Dropdown options={statusOptions} value={criteria.enabled} onChange={onStatusChanged}/>
		<Button ink={ButtonInk.PRIMARY} onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
			<span>Find</span>
		</Button>
	</SearchCriteriaContainer>;
};