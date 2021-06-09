import React, {useEffect, useState} from 'react';
import {useEventBus} from '../../events/event-bus';
import {EventTypes} from '../../events/types';
import {Topic} from '../../services/tuples/topic-types';
import {
	SearchResultBody,
	SearchResultContainer,
	SearchResultHeader,
	SearchResultHeaderCell,
	SearchResultHeaderSeqCell,
	SearchResultTargetLabel
} from './widgets';
import {
	fetchMonitorRules,
	MonitorRuleGrade,
	MonitorRules,
	MonitorRulesCriteria
} from '../../services/data-quality/rules';
import {RulesEventTypes} from './rules-event-bus-types';
import {useRulesEventBus} from './rules-event-bus';
import {getTopicName} from '../utils';
import {GlobalRules} from './global-rules';
import {TopicRules} from './topic-rules';
import {Button} from '../../basic-widgets/button';
import {ButtonInk, DropdownOption} from '../../basic-widgets/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ICON_SAVE, ICON_SORT_ASC} from '../../basic-widgets/constants';
import {Dropdown} from '../../basic-widgets/dropdown';
import {Factor} from '../../services/tuples/factor-types';

interface State {
	grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC;
	topic?: Topic;
	data: MonitorRules;
}

export const TopicResultHeader = (props: { topic: Topic }) => {
	const {topic} = props;

	const {fire} = useRulesEventBus();
	const [factor, setFactor] = useState<Factor | '' | '-'>('');
	const onFactorFilterChanged = (option: DropdownOption) => {
		const value = option.value;
		if (!value) {
			setFactor('');
			fire(RulesEventTypes.FILTER_BY_FACTOR, true, false);
		} else if (value === '-') {
			setFactor('-');
			fire(RulesEventTypes.FILTER_BY_FACTOR, false, true);
		} else {
			// eslint-disable-next-line
			const factor = topic.factors.find(factor => factor.factorId == value);
			setFactor(factor ?? '');
			fire(RulesEventTypes.FILTER_BY_FACTOR, false, false, factor);
		}
	};
	const onSortFactorsClicked = () => fire(RulesEventTypes.SORT_FACTORS);
	const onSaveClicked = () => {
		// TODO
	};

	const factorFilterOptions = [
		{value: '', label: 'Show All Defined'},
		{value: '-', label: 'Show Topic Rules Only'},
		...[...topic!.factors].sort((f1, f2) => {
			return (f1.name || '').toLowerCase().localeCompare((f2.name || '').toLowerCase());
		}).map(factor => {
			return {value: factor.factorId, label: factor.name || 'Noname Factor'};
		})];

	const filterValue = factor === '' ? '' : (factor === '-' ? '-' : factor.factorId);

	return <SearchResultTargetLabel>
		<span>Topic Rules on {getTopicName(topic)}</span>
		<Dropdown value={filterValue} options={factorFilterOptions} onChange={onFactorFilterChanged}/>
		<Button ink={ButtonInk.PRIMARY} onClick={onSortFactorsClicked} disabled={!!factor}>
			<FontAwesomeIcon icon={ICON_SORT_ASC}/>
			<span>Sort Factors</span>
		</Button>
		<Button ink={ButtonInk.PRIMARY} onClick={onSaveClicked}>
			<FontAwesomeIcon icon={ICON_SAVE}/>
			<span>Save</span>
		</Button>
	</SearchResultTargetLabel>;
};

const GlobalResultHeader = () => {
	const onSaveClicked = () => {
		// TODO
	};

	return <SearchResultTargetLabel>
		<span>Global Rules</span>
		<Button ink={ButtonInk.PRIMARY} onClick={onSaveClicked}>
			<FontAwesomeIcon icon={ICON_SAVE}/>
			<span>Save</span>
		</Button>
	</SearchResultTargetLabel>;
};

export const SearchResult = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useRulesEventBus();
	const [state, setState] = useState<State>({grade: MonitorRuleGrade.GLOBAL, data: []});
	useEffect(() => {
		const onSearch = async (criteria: MonitorRulesCriteria, topic?: Topic) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchMonitorRules({criteria}),
				(data: MonitorRules) => setState({grade: criteria.grade, topic, data}));
		};
		on(RulesEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(RulesEventTypes.DO_SEARCH, onSearch);
		};
	}, [on, off, fireGlobal]);

	const onTopic = state.grade === MonitorRuleGrade.TOPIC;

	return <SearchResultContainer>
		{onTopic
			? <TopicResultHeader topic={state.topic!}/>
			: <GlobalResultHeader/>}
		<SearchResultHeader grade={state.grade}>
			<SearchResultHeaderSeqCell>#</SearchResultHeaderSeqCell>
			{onTopic ? <SearchResultHeaderCell>Factor</SearchResultHeaderCell> : null}
			<SearchResultHeaderCell>Rule Name</SearchResultHeaderCell>
			<SearchResultHeaderCell>Enabled</SearchResultHeaderCell>
			<SearchResultHeaderCell>Severity</SearchResultHeaderCell>
			{onTopic ? <SearchResultHeaderCell>Parameters</SearchResultHeaderCell> : null}
		</SearchResultHeader>
		<SearchResultBody>
			{onTopic
				? <TopicRules topic={state.topic!} rules={state.data}/>
				: <GlobalRules rules={state.data}/>}
		</SearchResultBody>
	</SearchResultContainer>;
};