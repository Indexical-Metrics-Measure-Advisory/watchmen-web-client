import {MonitorRule, MonitorRuleCompareOperator, MonitorRuleParameters} from '../../../services/data-quality/rules';
import {
	ParameterEditor,
	ParameterEditorContainer,
	ParameterEditorDropdownEditor,
	ParameterEditorDropdownLabel,
	ParameterEditorIcon,
	ParameterEditorLabel
} from './widgets';
import {ICON_EDIT} from '../../../basic-widgets/constants';
import React, {Fragment, useState} from 'react';
import {MonitorRuleDef, MonitorRuleParameterType} from '../utils';
import {ButtonInk} from '../../../basic-widgets/types';
import {useEventBus} from '../../../events/event-bus';
import {EventTypes} from '../../../events/types';
import {DialogBody, DialogFooter} from '../../../dialog/widgets';
import {Button} from '../../../basic-widgets/button';
import {RuleParameter} from './rule-parameters';
import {Factor} from '../../../services/tuples/factor-types';
import {Topic} from '../../../services/tuples/topic-types';
import {DQCCacheData} from '../../cache/types';
import {DataQualityCacheEventTypes} from '../../cache/cache-event-bus-types';
import {useDataQualityCacheEventBus} from '../../cache/cache-event-bus';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {useDataQualityCacheData} from '../../cache/use-cache-data';
import {getTopicName} from '../../utils';
import {RulesEventTypes} from '../rules-event-bus-types';
import {useRulesEventBus} from '../rules-event-bus';

const ParametersLabel = (props: {
	def: MonitorRuleDef;
	params?: MonitorRuleParameters;
	topic?: Topic;
}) => {
	const {def, params, topic} = props;

	const [topics, setTopics] = useState<Array<Topic>>([]);
	useDataQualityCacheData({
		onDataRetrieved: (data?: DQCCacheData) => {
			setTopics(data?.topics || []);
		}
	});
	if (!def.parameters || def.parameters.length === 0) {
		return null;
	}

	const compareOperators: { [key in string]: string } = {
		[MonitorRuleCompareOperator.EQUAL]: 'equal',
		[MonitorRuleCompareOperator.LESS_THAN]: 'less than',
		[MonitorRuleCompareOperator.LESS_THAN_OR_EQUAL]: 'less than or equal',
		[MonitorRuleCompareOperator.GREATER_THAN]: 'greater than',
		[MonitorRuleCompareOperator.GREATER_THAN_EQUAL]: 'greater than or equal'
	};

	return <>
		{def.parameters.map(param => {
			switch (param) {
				case MonitorRuleParameterType.AGGREGATION:
					return `Aggregation=${params?.aggregation ? `${params?.aggregation}%` : ''}`;
				case MonitorRuleParameterType.COVERAGE_RATE:
					return `Coverage=${params?.coverageRate ? `${params?.coverageRate}%` : ''}`;
				case MonitorRuleParameterType.QUANTILE:
					return `Quantile=${params?.quantile ? `${params?.quantile}%` : ''}`;
				case MonitorRuleParameterType.COMPARE_OPERATOR:
					return `Compare Operator=${compareOperators[params?.compareOperator || ''] || ''}`;
				case MonitorRuleParameterType.LENGTH:
					return `Length=${params?.length || ''}`;
				case MonitorRuleParameterType.MAX_LENGTH:
				case MonitorRuleParameterType.MAX_NUMBER:
					return `Max=${params?.max || ''}`;
				case MonitorRuleParameterType.MIN_LENGTH:
				case MonitorRuleParameterType.MIN_NUMBER:
					return `Min=${params?.min || ''}`;
				case MonitorRuleParameterType.REGEXP:
					return `Regexp=${params?.regexp || ''}`;
				case MonitorRuleParameterType.STATISTICAL_INTERVAL:
					return `Statistical Interval=${params?.statisticalInterval || ''}`;
				case MonitorRuleParameterType.TOPIC:
					const topicId = params?.topicId;
					// eslint-disable-next-line
					const anotherTopic = topics.find(topic => topic.topicId == topicId);
					return `Topic=${anotherTopic ? getTopicName(anotherTopic) : ''}`;
				case MonitorRuleParameterType.FACTOR:
					const factorId = params?.factorId;
					// eslint-disable-next-line
					const factor = (topic?.factors || []).find(factor => factor.factorId == factorId);
					return `Factor=${factor ? (factor.name || 'Noname Factor') : ''}`;
				default:
					throw new Error(`Parameter[${param}] not supported.`);
			}
		}).filter(x => x).join(', ')}
	</>;
};

export const RuleParameters = (props: {
	rule: MonitorRule;
	def: MonitorRuleDef;
	topic?: Topic;
	factor?: Factor;
}) => {
	const {rule, def, topic, factor} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire} = useRulesEventBus();
	const {once} = useDataQualityCacheEventBus();

	const forceUpdate = useForceUpdate();

	const onConfirmClicked = (params: MonitorRuleParameters) => () => {
		rule.params = params;
		forceUpdate();
		fireGlobal(EventTypes.HIDE_DIALOG);
		fire(RulesEventTypes.RULE_CHANGED, rule);
	};
	const onCancelClicked = () => fireGlobal(EventTypes.HIDE_DIALOG);
	const onClicked = () => {
		const askData = () => {
			once(DataQualityCacheEventTypes.REPLY_DATA, (data?: DQCCacheData) => {
				const topics = data ? data.topics : [];

				// clone, therefore cancel is possible
				const params = JSON.parse(JSON.stringify(rule.params || {}));
				fireGlobal(EventTypes.SHOW_DIALOG, <>
					<DialogBody>
						<ParameterEditor>
							{def.parameters!.map(param => {
								return <Fragment key={param}>
									<ParameterEditorDropdownLabel>
										{param.replace('-', ' ')}
									</ParameterEditorDropdownLabel>
									<ParameterEditorDropdownEditor>
										<RuleParameter params={params} type={param}
										               topic={topic} factor={factor}
										               topics={topics}/>
									</ParameterEditorDropdownEditor>
								</Fragment>;
							})}
						</ParameterEditor>
					</DialogBody>
					<DialogFooter>
						<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked(params)}>OK</Button>
						<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>Cancel</Button>
					</DialogFooter>
				</>);
			}).fire(DataQualityCacheEventTypes.ASK_DATA);
		};
		const askDataLoaded = (askData: () => void) => {
			once(DataQualityCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
				if (loaded) {
					askData();
				} else {
					setTimeout(() => askDataLoaded(askData), 100);
				}
			}).fire(DataQualityCacheEventTypes.ASK_DATA_LOADED);
		};
		askDataLoaded(askData);
	};

	return <ParameterEditorContainer onClick={onClicked}>
		<ParameterEditorLabel>
			<ParametersLabel def={def} params={rule.params} topic={topic}/>
		</ParameterEditorLabel>
		<ParameterEditorIcon icon={ICON_EDIT}/>
	</ParameterEditorContainer>;
};
