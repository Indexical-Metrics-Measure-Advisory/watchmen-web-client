import { isMockService } from "../utils";
import { fetchMockMonitorRuleLogs, fetchMockRules } from "../mock/data-quality/mock-rules";
import {
	MonitorRule,
	MonitorRuleLogCriteria,
	MonitorRuleLogs,
	MonitorRuleOnFactor,
	MonitorRuleOnTopic,
	MonitorRules,
	MonitorRulesCriteria,
} from "./rule-types";
import { Apis, post } from "../apis";

export const fetchMonitorRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	if (isMockService()) {
		return await fetchMockRules(options);
	} else {
		// TODO
		// return await fetchMockRules(options);
		return post({
			api: Apis.QUERY_RULE,
			data: { criteria: options.criteria },
		});
	}
};

export const saveMonitorRules = async (options: { rules: MonitorRules }): Promise<MonitorRules> => {
	const { rules } = options;
	if (isMockService()) {
		return new Promise<MonitorRules>((resolve) => {
			setTimeout(() => resolve(rules || []), 1000);
		});
	} else {
		// TODO
		return post({
			api: Apis.SAVE_RULE_LIST,
			data: rules,
		});
	}
};

export const fetchMonitorRuleLogs = async (options: { criteria: MonitorRuleLogCriteria }): Promise<MonitorRuleLogs> => {
	// console.log(options.criteria)
	if (isMockService()) {
		return await fetchMockMonitorRuleLogs(options);
	} else {
		// TODO
		return post({
			api: Apis.QUERY_RULE_RESULT,
			data: options,
		});
	}
};

export const isRuleOnTopic = (rule: MonitorRule): rule is MonitorRuleOnTopic => {
	const x = rule as any;
	return x.topicId && !x.factorId;
};
export const isRuleOnFactor = (rule: MonitorRule): rule is MonitorRuleOnFactor => {
	return (rule as any).factorId;
};
