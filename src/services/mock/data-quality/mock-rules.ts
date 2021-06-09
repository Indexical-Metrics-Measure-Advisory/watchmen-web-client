import {MonitorRules, RulesCriteria} from '../../data-quality/rules';

export const fetchMockRules = async (options: { criteria: RulesCriteria }): Promise<MonitorRules> => {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([] as MonitorRules);
		}, 500);
	});
};
