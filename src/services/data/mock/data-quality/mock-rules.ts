import {
	MonitorRuleCode,
	MonitorRuleGrade,
	MonitorRuleLogCriteria,
	MonitorRuleLogs,
	MonitorRuleOnFactor,
	MonitorRuleOnTopic,
	MonitorRules,
	MonitorRulesCriteria,
	MonitorRuleSeverity,
	MonitorRuleStatisticalInterval
} from '../../data-quality/rule-types';
import {getCurrentTime} from '../../utils';
import {DemoTopics} from '../tuples/mock-data-topics';

export const fetchMockRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	const {criteria} = options;
	if (criteria.topicId === '2') {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve([
					{
						code: MonitorRuleCode.ROWS_COUNT_MISMATCH_AND_ANOTHER,
						grade: MonitorRuleGrade.TOPIC,
						topicId: '2',
						severity: MonitorRuleSeverity.WARN,
						enabled: true,
						params: {statisticalInterval: MonitorRuleStatisticalInterval.DAILY, topicId: '1'}
					} as MonitorRuleOnTopic,
					{
						code: MonitorRuleCode.FACTOR_NOT_IN_RANGE,
						grade: MonitorRuleGrade.FACTOR,
						topicId: '2',
						factorId: '207',
						severity: MonitorRuleSeverity.FATAL,
						enabled: true,
						params: {min: 100, max: 99999999}
					} as MonitorRuleOnFactor
				] as MonitorRules);
			}, 500);
		});
	} else {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve([] as MonitorRules);
			}, 500);
		});
	}
};

export const fetchMockMonitorRuleLogs = async (options: { criteria: MonitorRuleLogCriteria }): Promise<MonitorRuleLogs> => {
	const {criteria: {ruleCode, topicId}} = options;
	const codes = Object.values(MonitorRuleCode);

	if (ruleCode && topicId) {
		// eslint-disable-next-line
		const topic = DemoTopics.find(topic => topic.topicId == topicId);
		return (topic?.factors || []).map(factor => {
			return {
				ruleCode,
				topicId,
				factorId: factor.factorId,
				count: Math.round(Math.random() * 10000),
				lastOccurredTime: getCurrentTime()
			};
		});
	} else if (ruleCode && !topicId) {
		return DemoTopics.map(topic => {
			return {
				ruleCode,
				topicId: topic.topicId,
				count: Math.round(Math.random() * 10000),
				lastOccurredTime: getCurrentTime()
			};
		});
	} else if (!ruleCode && !topicId) {
		return new Array(20).fill(1).map(() => {
			return {
				ruleCode: codes[Math.floor(Math.random() * codes.length)] as MonitorRuleCode,
				count: Math.round(Math.random() * 10000),
				lastOccurredTime: getCurrentTime()
			};
		});
	} else if (!ruleCode && topicId) {
		// eslint-disable-next-line
		const topic = DemoTopics.find(topic => topic.topicId == topicId);
		return new Array(Math.ceil(Math.random() * 4)).fill(1).map(() => {
			return (topic?.factors || []).map(factor => {
				return {
					ruleCode: codes[Math.floor(Math.random() * codes.length)] as MonitorRuleCode,
					topicId,
					factorId: factor.factorId,
					count: Math.round(Math.random() * 10000),
					lastOccurredTime: getCurrentTime()
				};
			});
		}).flat();
	} else {
		return [];
	}
};
