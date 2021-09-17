import {MonitorRuleOnFactor} from '@/services/data/data-quality/rule-types';

export type RuleMap = { [key in string]: { [key in string]: MonitorRuleOnFactor } }
