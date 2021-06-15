import {
	MonitorRuleCode,
	MonitorRuleLogCriteria,
	MonitorRuleLogs,
	MonitorRules,
	MonitorRulesCriteria
} from '../../data-quality/rule-types';
import {getCurrentTime} from '../../utils';

export const fetchMockRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([] as MonitorRules);
		}, 500);
	});
};

export const fetchMockMonitorRuleLogs = async (options: { criteria: MonitorRuleLogCriteria }): Promise<MonitorRuleLogs> => {
	const codes = Object.values(MonitorRuleCode);
	return new Array(20).fill(1).map(() => {
		return {
			ruleCode: codes[Math.floor(Math.random() * codes.length)] as MonitorRuleCode,
			count: Math.round(Math.random() * 10000),
			lastOccurredTime: getCurrentTime()
		};
	});
};
