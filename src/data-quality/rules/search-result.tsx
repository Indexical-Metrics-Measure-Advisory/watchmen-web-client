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
import {fetchMonitorRules, MonitorRules, RuleGrade, RulesCriteria} from '../../services/data-quality/rules';
import {RulesEventTypes} from './rules-event-bus-types';
import {useRulesEventBus} from './rules-event-bus';
import {getTopicName} from '../utils';

interface State {
	grade: RuleGrade.GLOBAL | RuleGrade.TOPIC;
	topic?: Topic;
	data: MonitorRules;
}

export const SearchResult = () => {
	const {fire: fireGlobal} = useEventBus();
	const {on, off} = useRulesEventBus();
	const [state, setState] = useState<State>({grade: RuleGrade.GLOBAL, data: []});
	useEffect(() => {
		const onSearch = async (criteria: RulesCriteria, topic?: Topic) => {
			fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
				async () => await fetchMonitorRules({criteria}),
				(data: MonitorRules) => setState({grade: criteria.grade, topic, data}));
		};
		on(RulesEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(RulesEventTypes.DO_SEARCH, onSearch);
		};
	}, [on, off, fireGlobal]);

	const onTopic = state.grade === RuleGrade.TOPIC;

	return <SearchResultContainer>
		<SearchResultTargetLabel>
			{!onTopic ? 'Global Rules' : `Topic Rules on ${getTopicName(state.topic!)}`}
		</SearchResultTargetLabel>
		<SearchResultHeader onTopic={onTopic}>
			<SearchResultHeaderSeqCell>#</SearchResultHeaderSeqCell>
			<SearchResultHeaderCell>Rule Name</SearchResultHeaderCell>
			{onTopic ? <SearchResultHeaderCell>Factor</SearchResultHeaderCell> : null}
			<SearchResultHeaderCell>Status</SearchResultHeaderCell>
			<SearchResultHeaderCell>Parameters</SearchResultHeaderCell>
		</SearchResultHeader>
		<SearchResultBody>
			{/*{state.data.map((row, index) => {*/}
			{/*	return <SearchResultRow row={row} index={index + 1 + state.pageSize * (state.pageNumber - 1)}*/}
			{/*	                        pipelinesMap={pipelinesMap} topicsMap={topicsMap}*/}
			{/*	                        key={row.uid}/>;*/}
			{/*})}*/}
		</SearchResultBody>
	</SearchResultContainer>;
};