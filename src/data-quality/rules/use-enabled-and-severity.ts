import {useForceUpdate} from '../../basic-widgets/utils';
import {MonitorRule} from '../../services/data-quality/rules';
import {DropdownOption} from '../../basic-widgets/types';
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