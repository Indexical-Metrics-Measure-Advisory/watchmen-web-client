import {
	MonitorRuleCode,
	MonitorRuleLogCriteria,
	MonitorRuleLogs,
	MonitorRules,
	MonitorRulesCriteria
} from '../../data-quality/rule-types';
import {getCurrentTime} from '../../utils';
import {DemoTopics} from '../tuples/mock-data-topics';

export const fetchMockRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([] as MonitorRules);
		}, 500);
	});
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
		return new Array(Math.floor(Math.random() * 5)).fill(1).map(() => {
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
