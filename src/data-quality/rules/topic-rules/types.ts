import {MonitorRuleOnFactor} from '../../../services/data-quality/rules';

export type RuleMap = { [key in string]: { [key in string]: MonitorRuleOnFactor } }
