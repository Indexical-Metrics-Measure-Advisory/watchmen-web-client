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

interface State {
	grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC;
	topic?: Topic;
	data: MonitorRules;
}

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
		<SearchResultTargetLabel>
			{!onTopic ? 'Global Rules' : `Topic Rules on ${getTopicName(state.topic!)}`}
		</SearchResultTargetLabel>
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
				? <TopicRules rules={state.data}/>
				: <GlobalRules rules={state.data}/>}
		</SearchResultBody>
	</SearchResultContainer>;
};