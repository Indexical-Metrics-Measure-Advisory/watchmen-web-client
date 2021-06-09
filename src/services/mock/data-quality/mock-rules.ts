import {MonitorRules, MonitorRulesCriteria} from '../../data-quality/rules';

export const fetchMockRules = async (options: { criteria: MonitorRulesCriteria }): Promise<MonitorRules> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([] as MonitorRules);
		}, 500);
	});
};
