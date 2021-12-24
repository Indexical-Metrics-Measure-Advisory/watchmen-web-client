import {MonitorRuleGrade, MonitorRulesCriteria} from '@/services/data/data-quality/rule-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_SEARCH, ICON_SELECTED} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useState} from 'react';
import {DQCCacheData} from '../cache/types';
import {useDataQualityCacheData} from '../cache/use-cache-data';
import {useRulesEventBus} from './rules-event-bus';
import {RulesEventTypes} from './rules-event-bus-types';
import {GradePickerContainer, SearchCriteriaContainer, SearchLabel} from './widgets';

export const SearchCriteria = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire} = useRulesEventBus();
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [criteria, setCriteria] = useState<MonitorRulesCriteria>({grade: MonitorRuleGrade.TOPIC});
	const [onDataRetrieved] = useState(() => {
		return (data?: DQCCacheData) => {
			if (data) {
				setTopics(data.topics);
			}
		};
	});
	useDataQualityCacheData({onDataRetrieved});

	const onGradeClicked = (grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC) => () => {
		if (grade === MonitorRuleGrade.GLOBAL) {
			setCriteria({grade});
		} else {
			setCriteria(({...criteria, grade}));
		}
	};
	const onTopicChanged = (option: DropdownOption) => {
		setCriteria({...criteria, topicId: option.value});
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

	return <SearchCriteriaContainer>
		<SearchLabel>Grade</SearchLabel>
		<GradePickerContainer>
			{/*<Button ink={criteria.grade === MonitorRuleGrade.GLOBAL ? ButtonInk.PRIMARY : ButtonInk.WAIVE}*/}
			{/*        onClick={onGradeClicked(MonitorRuleGrade.GLOBAL)}>*/}
			{/*	<span>Global</span>*/}
			{/*	{criteria.grade === MonitorRuleGrade.GLOBAL ? <FontAwesomeIcon icon={ICON_SELECTED}/> : null}*/}
			{/*</Button>*/}
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
		<Button ink={ButtonInk.PRIMARY} onClick={onSearchClicked}>
			<FontAwesomeIcon icon={ICON_SEARCH}/>
			<span>Find</span>
		</Button>
	</SearchCriteriaContainer>;
};