import {isMockService} from '../utils';
import {Apis, post} from '../apis';
import {fetchMockRules} from '../mock/data-quality/mock-rules';

export enum MonitorRuleGrade {
	GLOBAL = 'global',
	TOPIC = 'topic',
	FACTOR = 'factor'
}

export interface MonitorRulesCriteria {
	grade: MonitorRuleGrade.GLOBAL | MonitorRuleGrade.TOPIC;
	topicId?: string;
	enabled?: boolean;
}

export enum MonitorRuleCode {
	RAW_MATCH_STRUCTURE = 'raw-match-structure',

	ROWS_NO_CHANGE = 'rows-no-change',
	ROWS_COUNT = 'rows-count',
	ROWS_COUNT_INCREASING_RATE = 'rows-count-increasing-rate',

	FACTOR_MATCH_ENUM = 'factor-match-enum',
	FACTOR_MATCH_TYPE = 'factor-match-type',
	FACTOR_MATCH_DATE_TYPE = 'factor-match-date-type',
	FACTOR_MONOTONE_INCREASING = 'factor-monotone-increasing',
	FACTOR_MONOTONE_DECREASING = 'factor-monotone-decreasing'
}

export enum MonitorRuleSeverity {
	FATAL = 'fatal',
	WARN = 'warn',
	TRACE = 'trace'
}

export interface MonitorRule {
	uid?: string;
	code: MonitorRuleCode;
	grade: MonitorRuleGrade;
	severity: MonitorRuleSeverity;
	enabled: boolean;
}

export interface MonitorRuleOnTopic extends MonitorRule {
	topicId: string;
}

export interface MonitorRuleOnFactor extends MonitorRuleOnTopic {
	factorId: string;
}

export type MonitorRules = Array<MonitorRule>;

export const GlobalRuleDefs = [
	MonitorRuleCode.RAW_MATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE
];

export const TopicRuleDefs = [
	MonitorRuleCode.RAW_MATCH_STRUCTURE,
	MonitorRuleCode.FACTOR_MATCH_TYPE,
	MonitorRuleCode.FACTOR_MATCH_ENUM,
	MonitorRuleCode.FACTOR_MATCH_DATE_TYPE,

	MonitorRuleCode.ROWS_NO_CHANGE,
	MonitorRuleCode.ROWS_COUNT,
	MonitorRuleCode.ROWS_COUNT_INCREASING_RATE
];

export const fetchMonitorRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	if (isMockService()) {
		return await fetchMockRules(options);
	} else {
		return post({
			api: Apis.QUERY_RULE,
			data: {criteria: options.criteria}
		});
	}
};
