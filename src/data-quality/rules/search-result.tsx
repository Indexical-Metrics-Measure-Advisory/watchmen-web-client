import {MonitorRuleGrade, MonitorRules, MonitorRulesCriteria} from '@/services/data/data-quality/rule-types';
import {fetchMonitorRules, saveMonitorRules} from '@/services/data/data-quality/rules';
import {Factor} from '@/services/data/tuples/factor-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {Button} from '@/widgets/basic/button';
import {ICON_LOADING, ICON_SAVE, ICON_SORT_ASC} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {ButtonInk, DropdownOption} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {Fragment, useEffect, useState} from 'react';
import {getTopicName} from '../utils';
import {GlobalRules} from './global-rules';
import {useRulesEventBus} from './rules-event-bus';
import {RulesEventTypes} from './rules-event-bus-types';
import {TopicRules} from './topic-rules';
import {
	SearchResultBody,
	SearchResultContainer,
	SearchResultHeader,
	SearchResultHeaderCell,
	SearchResultHeaderSeqCell,
	SearchResultTargetLabel
} from './widgets';

interface State {
	grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC;
	topic?: Topic;
	rules: MonitorRules;
}

const useRuleChanged = (topic?: Topic) => {
	const [changed, setChanged] = useState(false);
	const {on, off, fire} = useRulesEventBus();
	useEffect(() => {
		const onAskRuleChanged = (onChangedGet: (changed: boolean) => void) => {
			onChangedGet(changed);
		};
		on(RulesEventTypes.ASK_RULE_CHANGED, onAskRuleChanged);
		return () => {
			off(RulesEventTypes.ASK_RULE_CHANGED, onAskRuleChanged);
		};
	}, [on, off, fire, changed]);
	useEffect(() => {
		const onRuleChanged = () => setChanged(true);
		on(RulesEventTypes.RULE_CHANGED, onRuleChanged);
		return () => {
			off(RulesEventTypes.RULE_CHANGED, onRuleChanged);
		};
	}, [on, off]);
	useEffect(() => {
		const onSaved = () => setChanged(false);
		on(RulesEventTypes.SAVED, onSaved);
		return () => {
			off(RulesEventTypes.SAVED, onSaved);
		};
	}, [on, off]);
	useEffect(() => setChanged(false), [topic]);

	return changed;
};

export const TopicResultHeader = (props: { topic: Topic; rules: MonitorRules }) => {
	const {topic, rules} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useRulesEventBus();
	const [factor, setFactor] = useState<Factor | '' | '-'>('');
	const [saving, setSaving] = useState(false);
	useEffect(() => setFactor(''), [topic]);
	const changed = useRuleChanged(topic);

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
		if (!changed) {
			return;
		}

		setSaving(true);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveMonitorRules({rules}),
			() => {
				fire(RulesEventTypes.SAVED, rules);
				setSaving(false);
			});
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
		<Button ink={ButtonInk.PRIMARY} onClick={onSaveClicked} disabled={!changed}>
			<FontAwesomeIcon icon={saving ? ICON_LOADING : ICON_SAVE} spin={saving}/>
			<span>Save</span>
		</Button>
	</SearchResultTargetLabel>;
};

/**
 * FEAT global rules is disabled now
 */
const GlobalResultHeader = (props: { rules: MonitorRules }) => {
	const {rules} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useRulesEventBus();
	const [saving, setSaving] = useState(false);
	const changed = useRuleChanged();

	const onSaveClicked = () => {
		if (!changed) {
			return;
		}

		setSaving(true);
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await saveMonitorRules({rules}),
			(rules: MonitorRules) => {
				fire(RulesEventTypes.SAVED, rules);
				setSaving(false);
			});
	};

	return <SearchResultTargetLabel>
		<span>Global Rules</span>
		<Button ink={ButtonInk.PRIMARY} onClick={onSaveClicked} disabled={!changed}>
			<FontAwesomeIcon icon={saving ? ICON_LOADING : ICON_SAVE} spin={saving}/>
			<span>Save</span>
		</Button>
	</SearchResultTargetLabel>;
};

const EmptyResult = () => {
	useRuleChanged();

	return <Fragment/>;
};

export const SearchResult = () => {
	const {fire: fireGlobal} = useEventBus();
	const {fire, on, off} = useRulesEventBus();
	const [state, setState] = useState<State>({grade: MonitorRuleGrade.TOPIC, rules: []});
	useEffect(() => {
		const onSearch = async (criteria: MonitorRulesCriteria, topic?: Topic) => {
			fire(RulesEventTypes.ASK_RULE_CHANGED, (changed) => {
				if (changed) {
					fireGlobal(EventTypes.SHOW_YES_NO_DIALOG,
						'Data is changed, are you sure to discard them and load another?',
						() => {
							fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
								async () => await fetchMonitorRules({criteria}),
								(data: MonitorRules) => setState({grade: criteria.grade, topic, rules: data}));
							fireGlobal(EventTypes.HIDE_DIALOG);
						},
						() => fireGlobal(EventTypes.HIDE_DIALOG));
				} else {
					fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
						async () => await fetchMonitorRules({criteria}),
						(data: MonitorRules) => setState({grade: criteria.grade, topic, rules: data}));
				}
			});
		};
		on(RulesEventTypes.DO_SEARCH, onSearch);
		return () => {
			off(RulesEventTypes.DO_SEARCH, onSearch);
		};
	}, [fire, on, off, fireGlobal]);
	useEffect(() => {
		const onSaved = (rules: MonitorRules) => {
			setState(state => {
				return {...state, rules};
			});
		};
		on(RulesEventTypes.SAVED, onSaved);
		return () => {
			off(RulesEventTypes.SAVED, onSaved);
		};
	}, [on, off]);

	const onTopic = state.grade === MonitorRuleGrade.TOPIC;
	if (onTopic && state.topic == null) {
		return <SearchResultContainer>
			<EmptyResult/>
		</SearchResultContainer>;
	}

	return <SearchResultContainer>
		{onTopic
			? <TopicResultHeader topic={state.topic!} rules={state.rules}/>
			: <GlobalResultHeader rules={state.rules}/>}
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
				? <TopicRules topic={state.topic!} rules={state.rules}/>
				: <GlobalRules rules={state.rules}/>}
		</SearchResultBody>
	</SearchResultContainer>;
};