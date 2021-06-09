import {isMockService} from '../utils';
import {Apis, post} from '../apis';
import {fetchMockRules} from '../mock/data-quality/mock-rules';

export enum RuleGrade {
	GLOBAL = 'global',
	TOPIC = 'topic',
	FACTOR = 'factor'
}

export interface RulesCriteria {
	grade: RuleGrade.GLOBAL | RuleGrade.TOPIC;
	topicId?: string;
	enabled?: boolean;
}

export interface MonitorRule {
	uid: string;
	grade: RuleGrade;
}

export interface MonitorRuleOnTopic extends MonitorRule {
	topicId: string;
}

export interface MonitorRuleOnFactor extends MonitorRuleOnTopic {
	factorId: string;
}

export type MonitorRules = Array<MonitorRule>;

export const fetchMonitorRules = async (options: { criteria: RulesCriteria }): Promise<MonitorRules> => {
	if (isMockService()) {
		return await fetchMockRules(options);
	} else {
		return post({
			api: Apis.QUERY_RULE,
			data: {criteria: options.criteria}
		});
	}
};
