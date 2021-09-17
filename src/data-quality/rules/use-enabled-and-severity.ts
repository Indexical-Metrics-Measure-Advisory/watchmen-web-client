import {MonitorRule} from '@/services/data/data-quality/rule-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import {useRulesEventBus} from './rules-event-bus';
import {RulesEventTypes} from './rules-event-bus-types';

export const useEnabledAndSeverity = (rules: Array<MonitorRule>) => {
	const {fire} = useRulesEventBus();
	const forceUpdate = useForceUpdate();

	const onEnabledChanged = (rule: MonitorRule) => (value: boolean) => {
		rule.enabled = value;
		if (!rules.includes(rule)) {
			rules.push(rule);
		}
		fire(RulesEventTypes.RULE_CHANGED, rule);
		forceUpdate();
	};
	const onSeverityChanged = (rule: MonitorRule) => (option: DropdownOption) => {
		rule.severity = option.value;
		if (!rules.includes(rule)) {
			rules.push(rule);
		}
		fire(RulesEventTypes.RULE_CHANGED, rule);
		forceUpdate();
	};

	return {onEnabledChanged, onSeverityChanged};
};