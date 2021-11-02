import {MonitorRuleCode, MonitorRuleLog, MonitorRuleLogs} from '@/services/data/data-quality/rule-types';
import {fetchMonitorRuleLogs} from '@/services/data/data-quality/rules';
import {Topic, TopicId} from '@/services/data/tuples/topic-types';
import {Calendar} from '@/widgets/basic/calendar';
import {ICON_REFRESH} from '@/widgets/basic/constants';
import {Dropdown} from '@/widgets/basic/dropdown';
import {DropdownOption} from '@/widgets/basic/types';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import dayjs from 'dayjs';
import React, {useEffect, useState} from 'react';
import {useDataQualityCacheEventBus} from '../../cache/cache-event-bus';
import {DataQualityCacheEventTypes} from '../../cache/cache-event-bus-types';
import {DQCCacheData} from '../../cache/types';
import {RuleDefs} from '../../rule-defs';
import {getTopicName} from '../../utils';
import {DEFAULT_LAYOUTS} from '../constants';
import {DataPanel} from '../data-panel';
import {useLayout} from '../data-panel/use-layout';
import {
	DataPanelBody,
	DataPanelBodyDataCell,
	DataPanelBodyDataRow,
	DataPanelBodyDataSeqCell,
	DataPanelBodyHeader,
	DataPanelBodyHeaderCell,
	DataPanelBodyHeaderSeqCell,
	DataPanelBodyNoDataCell,
	HorizontalValue,
	HorizontalValueBar
} from '../data-panel/widgets';
import {DataPanels} from '../types';
import {DataPanelCriteria, DataPanelCriteriaLabel} from './widgets';

const GRID_ALL_COLUMNS = '20% 15% 20% 1fr 150px';
const GRID_COLUMNS_NO_FACTOR = '20% 20% 1fr 150px';
const GRID_COLUMNS_NO_TOPIC = '35% 1fr 150px';

interface Criteria {
	startDate: string;
	endDate: string;
	ruleCode?: MonitorRuleCode;
	topicId?: TopicId;
}

interface State extends Criteria {
	loader?: number;
}

export const FreeWalkPanel = () => {
	const {layout} = useLayout(DataPanels.FREE_WALK);

	const {fire: fireGlobal} = useEventBus();
	const {fire: fireCache} = useDataQualityCacheEventBus();
	const [criteria, setCriteria] = useState<Criteria>({
		startDate: dayjs().subtract(3, 'day').startOf('date').format('YYYY/MM/DD HH:mm:ss'),
		endDate: dayjs().startOf('date').subtract(1, 'millisecond').format('YYYY/MM/DD HH:mm:ss')
	});
	const [state, setState] = useState<State>({
		startDate: dayjs().subtract(3, 'day').startOf('date').format('YYYY/MM/DD HH:mm:ss'),
		endDate: dayjs().startOf('date').subtract(1, 'millisecond').format('YYYY/MM/DD HH:mm:ss')
	});
	const [topics, setTopics] = useState<Array<Topic>>([]);
	const [data, setData] = useState<Array<MonitorRuleLog>>([]);
	useEffect(() => {
		const ask = () => {
			fireCache(DataQualityCacheEventTypes.ASK_DATA_LOADED, (loaded: boolean) => {
				if (loaded) {
					fireCache(DataQualityCacheEventTypes.ASK_DATA, (data?: DQCCacheData) => {
						setTopics(data?.topics || []);
					});
				} else {
					setTimeout(() => ask(), 100);
				}
			});
		};
		ask();
		// only once
		// eslint-disable-next-line
	}, []);
	useEffect(() => {
		fetchData(criteria);
		// only once
		// eslint-disable-next-line
	}, []);
	const fetchData = (criteria: Criteria) => {
		fireGlobal(EventTypes.INVOKE_REMOTE_REQUEST,
			async () => await fetchMonitorRuleLogs({criteria}),
			(logs: MonitorRuleLogs) => {
				setData(logs.sort((r1, r2) => r1.count === r2.count ? 0 : (r1.count < r2.count) ? 1 : -1));
				setState({...criteria, loader: (void 0)});
			});
	};

	const changeCriteria = (newCriteria: Partial<Criteria>) => {
		if (state.loader) {
			window.clearTimeout(state.loader);
		}
		setCriteria({...criteria, ...newCriteria});
		setState({...state, loader: window.setTimeout(() => fetchData({...criteria, ...newCriteria}), 500)});
	};
	const onStartDateChanged = (value?: string) => {
		changeCriteria({
			startDate: value || dayjs().subtract(1, 'month').add(1, 'day').startOf('date').format('YYYY/MM/DD HH:mm:ss')
		});
	};
	const onEndDateChanged = (value?: string) => {
		changeCriteria({
			endDate: value || dayjs().endOf('date').format('YYYY/MM/DD HH:mm:ss')
		});
	};
	const onRuleCodeChanged = (option: DropdownOption) => {
		const {value} = option;
		changeCriteria({ruleCode: value === '' ? (void 0) : value});
	};
	const onTopicChanged = (option: DropdownOption) => {
		const {value} = option;
		changeCriteria({topicId: value === '' ? (void 0) : value});
	};

	const showCriteria = layout.spanColumn === 3 && layout.spanRow === 3;
	let gridColumns = GRID_ALL_COLUMNS;
	let showTopicColumn = true;
	let showFactorColumn = true;
	if (state.ruleCode && state.topicId) {
	} else if (state.ruleCode && !state.topicId) {
		// show rule code & topic
		gridColumns = GRID_COLUMNS_NO_FACTOR;
		showFactorColumn = false;
	} else if (!state.ruleCode && state.topicId) {
		// show all
	} else {
		// show rule only
		gridColumns = GRID_COLUMNS_NO_TOPIC;
		showTopicColumn = false;
		showFactorColumn = false;
	}
	const ruleOptions = [
		{value: '', label: 'Any Rule'},
		...Object.keys(RuleDefs).filter(ruleCode => {
			return RuleDefs[ruleCode as MonitorRuleCode].enabled;
		}).map(ruleCode => {
			return {value: ruleCode, label: RuleDefs[ruleCode as MonitorRuleCode].name};
		}).sort((o1, o2) => {
			return o1.label.toLowerCase().localeCompare(o2.label.toLowerCase());
		})
	];
	const topicMap = topics.reduce((map, topic) => {
		map[topic.topicId] = topic;
		return map;
	}, {} as Record<TopicId, Topic>);
	const topicOptions = [
		{value: '', label: 'Any Topic'},
		...topics.map(topic => {
			return {value: topic.topicId, label: getTopicName(topic)};
		}).sort((o1, o2) => {
			return o1.label.toLowerCase().localeCompare(o2.label.toLowerCase());
		})
	];
	const format = new Intl.NumberFormat(undefined, {useGrouping: true});
	const headerButtons = [{iconProps: {icon: ICON_REFRESH}, tooltip: 'Refresh', action: () => fetchData(criteria)}];

	return <DataPanel which={DataPanels.FREE_WALK} title="Free Walk"
	                  layout={layout} defaultLayout={DEFAULT_LAYOUTS[DataPanels.FREE_WALK]}
	                  buttons={headerButtons}>
		{showCriteria
			? <DataPanelCriteria>
				<DataPanelCriteriaLabel>From</DataPanelCriteriaLabel>
				<Calendar value={criteria.startDate} onChange={onStartDateChanged}/>
				<DataPanelCriteriaLabel>To</DataPanelCriteriaLabel>
				<Calendar value={criteria.endDate} onChange={onEndDateChanged}/>
				<DataPanelCriteriaLabel>Rule</DataPanelCriteriaLabel>
				<Dropdown value={criteria.ruleCode || ''} options={ruleOptions} onChange={onRuleCodeChanged}/>
				<DataPanelCriteriaLabel>Topic</DataPanelCriteriaLabel>
				<Dropdown value={criteria.topicId || ''} options={topicOptions} onChange={onTopicChanged}/>
			</DataPanelCriteria>
			: null}
		<DataPanelBody>
			<DataPanelBodyHeader columns={gridColumns}>
				<DataPanelBodyHeaderSeqCell>#</DataPanelBodyHeaderSeqCell>
				{showTopicColumn ? <DataPanelBodyHeaderCell>Topic</DataPanelBodyHeaderCell> : null}
				{showFactorColumn ? <DataPanelBodyHeaderCell>Factor</DataPanelBodyHeaderCell> : null}
				<DataPanelBodyHeaderCell>Rule</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Occurred Times</DataPanelBodyHeaderCell>
				<DataPanelBodyHeaderCell>Last Occurred</DataPanelBodyHeaderCell>
			</DataPanelBodyHeader>
			{data.length === 0
				? <DataPanelBodyDataRow columns={gridColumns}>
					<DataPanelBodyNoDataCell>No rule monitored.</DataPanelBodyNoDataCell>
				</DataPanelBodyDataRow>
				: data.map((row, index) => {
					const {ruleCode, topicId, factorId} = row;
					const ruleName = RuleDefs[ruleCode].name;
					const topic = topicId ? topicMap[topicId] : (void 0);
					const topicName = topic ? getTopicName(topic) : '';
					let factorName;
					if (factorId) {
						// eslint-disable-next-line
						factorName = (topic?.factors || []).find(factor => factor.factorId == factorId)?.name || 'Noname Factor';
					} else if (topicId) {
						factorName = '-';
					}
					return <DataPanelBodyDataRow columns={gridColumns} key={index}>
						<DataPanelBodyDataSeqCell>{index + 1}</DataPanelBodyDataSeqCell>
						{showTopicColumn ? <DataPanelBodyDataCell>{topicName}</DataPanelBodyDataCell> : null}
						{showFactorColumn ? <DataPanelBodyDataCell>{factorName}</DataPanelBodyDataCell> : null}
						<DataPanelBodyDataCell>{ruleName}</DataPanelBodyDataCell>
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