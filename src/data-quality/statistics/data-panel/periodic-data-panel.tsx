import {MonitorRuleCode, MonitorRuleLog, MonitorRuleLogs} from '@/services/data/data-quality/rule-types';
import {fetchMonitorRuleLogs} from '@/services/data/data-quality/rules';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {ICON_BACK, ICON_REFRESH} from '@/widgets/basic/constants';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import React, {useEffect, useState} from 'react';
import {useDataQualityCacheEventBus} from '../../cache/cache-event-bus';
import {DataQualityCacheEventTypes} from '../../cache/cache-event-bus-types';
import {DQCCacheData} from '../../cache/types';
import {RuleDefs} from '../../rule-defs';
import {getTopicName} from '../../utils';
import {DEFAULT_LAYOUTS} from '../constants';
import {DataPanels} from '../types';
import {AdditionalDataPanelHeaderButton, DataPanel} from './index';
import {useLayout} from './use-layout';
import {
	DataPanelBody,
	DataPanelBodyBreakdownCell,
	DataPanelBodyDataCell,
	DataPanelBodyDataRow,
	DataPanelBodyDataSeqCell,
	DataPanelBodyHeader,
	DataPanelBodyHeaderCell,
	DataPanelBodyHeaderSeqCell,
	DataPanelBodyNoDataCell,
	HorizontalValue,
	HorizontalValueBar
} from './widgets';

const GRID_COLUMN_ALL = '35% 1fr 150px';

interface State {
	ruleCode?: MonitorRuleCode;
	topicId?: TopicId;
}

interface DataRow extends MonitorRuleLog {
	topicName?: string;
	factorName?: string;
}

export const PeriodicPanel = (props: {
	which: DataPanels;
	title: string;
	period: {
		start: () => string;
		end: () => string;
	}
}) => {
	const {which, title: givenTitle, period: {start, end}} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useDataQualityCacheEventBus();
	const {layout} = useLayout(which);

	const [title, setTitle] = useState(givenTitle);
	const [state, setState] = useState<State>({});
	const [data, setData] = useState<Array<DataRow>>([]);
	useEffect(() => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchMonitorRuleLogs({
				criteria: {
					startDate: start(),
					endDate: end(),
					ruleCode: state.ruleCode,
					topicId: state.topicId
				}
			}),
			(logs: MonitorRuleLogs) => {
				if (state.ruleCode) {
					fireCache(DataQualityCacheEventTypes.ASK_DATA, (data?: DQCCacheData) => {
						const topics = data?.topics || [];
						const topicMap = topics.reduce((map, topic) => {
							map[topic.topicId] = topic;
							return map;
						}, {} as Record<TopicId, Topic>);
						setData(logs.sort((r1, r2) => r1.count === r2.count ? 0 : (r1.count < r2.count) ? 1 : -1)
							.map(row => {
								const {topicId, factorId} = row;
								if (topicId) {
									const topic = topicMap[topicId];
									if (factorId) {
										return {
											...row,
											topicName: topic ? getTopicName(topic) : topicId,
											// eslint-disable-next-line
											factorName: (topic?.factors || []).find(factor => factor.factorId == factorId)?.name || 'Noname Factor'
										};
									} else {
										return {
											...row,
											topicName: topic ? getTopicName(topic) : topicId,
											factorName: '-'
										};
									}
								}
								return row;
							}));
						if (state.topicId) {
							const topic = topicMap[state.topicId];
							const topicName = topic ? getTopicName(topic) : state.topicId;
							setTitle(`${givenTitle} @ ${RuleDefs[state.ruleCode!].name} @ ${topicName}`);
						} else {
							setTitle(`${givenTitle} @ ${RuleDefs[state.ruleCode!].name}`);
						}
					});
				} else {
					setTitle(givenTitle);
					setData(logs.sort((r1, r2) => r1.count === r2.count ? 0 : (r1.count < r2.count) ? 1 : -1));
				}
			});
		// load data once
		// eslint-disable-next-line
	}, [state]);

	const canBreakdown = !state.topicId;
	const onBreakdownClicked = (ruleCode: MonitorRuleCode, topicId?: TopicId) => () => {
		setState({ruleCode, topicId});
	};
	const format = new Intl.NumberFormat(undefined, {useGrouping: true});

	let headerButton;
	let breakdownHeaderCell: JSX.Element;
	let breakdownCell: (row: DataRow) => JSX.Element;
	if (state.ruleCode && state.topicId) {
		// rule code and topic fixed
		headerButton = {
			iconProps: {icon: ICON_BACK, transform: {rotate: 180}},
			tooltip: 'Back to Topic',
			action: () => setState({ruleCode: state.ruleCode})
		};
		breakdownHeaderCell = <DataPanelBodyHeaderCell>Factor</DataPanelBodyHeaderCell>;
		breakdownCell = (row) => <DataPanelBodyDataCell>
			<span>{row.factorName}</span>
		</DataPanelBodyDataCell>;
	} else if (state.ruleCode) {
		// rule code fixed
		headerButton = {
			iconProps: {icon: ICON_BACK, transform: {rotate: 180}},
			tooltip: 'Back to All',
			action: () => setState({})
		};
		breakdownHeaderCell = <DataPanelBodyHeaderCell>Topic</DataPanelBodyHeaderCell>;
		breakdownCell = (row) => {
			// noinspection TypeScriptValidateTypes
			if ([
				MonitorRuleCode.RAW_MISMATCH_STRUCTURE,
				MonitorRuleCode.ROWS_NOT_EXISTS,
				MonitorRuleCode.ROWS_NO_CHANGE,
				MonitorRuleCode.ROWS_COUNT_MISMATCH_AND_ANOTHER
			].includes(row.ruleCode)) {
				// topic level rule, cannot breakdown anymore
				return <DataPanelBodyDataCell>
					<span>{row.topicName}</span>
				</DataPanelBodyDataCell>;
			} else {
				return <DataPanelBodyBreakdownCell breakdown={canBreakdown}
				                                   onClick={onBreakdownClicked(row.ruleCode, row.topicId)}>
					<span>{row.topicName}</span>
				</DataPanelBodyBreakdownCell>;
			}
		};
	} else {
		// all
		breakdownHeaderCell = <DataPanelBodyHeaderCell>Rule</DataPanelBodyHeaderCell>;
		breakdownCell = (row) => <DataPanelBodyBreakdownCell breakdown={canBreakdown}
		                                                     onClick={onBreakdownClicked(row.ruleCode)}>
			<span>{RuleDefs[row.ruleCode].name}</span>
		</DataPanelBodyBreakdownCell>;
	}

	const headerButtons = [
		headerButton,
		{iconProps: {icon: ICON_REFRESH}, tooltip: 'Refresh', action: () => setState({...state})}
	].filter(x => !!x) as Array<AdditionalDataPanelHeaderButton>;

	return <DataPanel which={which} title={title}
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[which]}
	                  buttons={headerButtons}>
		<DataPanelBody>
			<DataPanelBodyHeader columns={GRID_COLUMN_ALL}>
				<DataPanelBodyHeaderSeqCell>#</DataPanelBodyHeaderSeqCell>
				{breakdownHeaderCell}
				<DataPanelBodyHeaderCell>Occurred Times</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Last Occurred</DataPanelBodyHeaderCell>
			</DataPanelBodyHeader>
			{data.length === 0
				? <DataPanelBodyDataRow columns={GRID_COLUMN_ALL}>
					<DataPanelBodyNoDataCell>No rule monitored.</DataPanelBodyNoDataCell>
				</DataPanelBodyDataRow>
				: data.map((row, index) => {
					return <DataPanelBodyDataRow columns={GRID_COLUMN_ALL} key={index}>
						<DataPanelBodyDataSeqCell>{index + 1}</DataPanelBodyDataSeqCell>
						{breakdownCell(row)}
						<DataPanelBodyDataCell>
							<HorizontalValueBar value={row.count / 100}/>
							<HorizontalValue>{format.format(row.count)}</HorizontalValue>
						</DataPanelBodyDataCell>
						<DataPanelBodyDataCell>{row.lastOccurredTime}</DataPanelBodyDataCell>
					</DataPanelBodyDataRow>;
				})}
		</DataPanelBody>
	</DataPanel>;
};