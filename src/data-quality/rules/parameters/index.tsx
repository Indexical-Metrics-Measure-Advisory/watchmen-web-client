import {MonitorRule, MonitorRuleStatisticalInterval} from '../../../services/data-quality/rules';
import {
	ParameterEditor,
	ParameterEditorContainer,
	ParameterEditorDropdownEditor,
	ParameterEditorDropdownLabel,
	ParameterEditorIcon,
	ParameterEditorLabel
} from './widgets';
import {ICON_EDIT} from '../../../basic-widgets/constants';
import React, {Fragment} from 'react';
import {MonitorRuleDef, RuleParameterType} from '../utils';
import {Dropdown} from '../../../basic-widgets/dropdown';
import {ButtonInk, DropdownOption} from '../../../basic-widgets/types';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {useEventBus} from '../../../events/event-bus';
import {EventTypes} from '../../../events/types';
import {DialogBody, DialogFooter} from '../../../dialog/widgets';
import {Button} from '../../../basic-widgets/button';

const StatisticalIntervalOptions = [
	{value: MonitorRuleStatisticalInterval.DAILY, label: 'Daily'},
	{value: MonitorRuleStatisticalInterval.WEEKLY, label: 'Weekly'},
	{value: MonitorRuleStatisticalInterval.MONTHLY, label: 'Monthly'}
];
const StatisticalInterval = (props: { rule: MonitorRule }) => {
	const {rule} = props;

	const forceUpdate = useForceUpdate();
	const onChanged = (option: DropdownOption) => {
		rule.params = (rule.params || {});
		rule.params.statisticalInterval = option.value;
		forceUpdate();
	};

	return <Dropdown options={StatisticalIntervalOptions} onChange={onChanged}/>;
};

const RuleParameter = (props: { rule: MonitorRule, parameter: RuleParameterType }) => {
	const {rule, parameter} = props;

	if (parameter === RuleParameterType.TOPIC) {
		return null;
	} else if (parameter === RuleParameterType.FACTOR) {
		return null;
	} else if (parameter === RuleParameterType.STATISTICAL_INTERVAL) {
		return <StatisticalInterval rule={rule}/>;
	} else if ([RuleParameterType.COVERAGE_RATE, RuleParameterType.QUANTILE, RuleParameterType.AGGREGATION].includes(parameter)) {
		return null;
	} else if (parameter === RuleParameterType.REGEXP) {
		return null;
	} else if (parameter === RuleParameterType.COMPARE_OPERATOR) {
		return null;
	} else if ([
		RuleParameterType.LENGTH, RuleParameterType.MIN_LENGTH, RuleParameterType.MAX_LENGTH,
		RuleParameterType.MIN_NUMBER, RuleParameterType.MAX_NUMBER
	].includes(parameter)) {
		return null;
	} else {
		return null;
	}
};

export const RuleParameters = (props: { rule: MonitorRule, def: MonitorRuleDef }) => {
	const {rule, def} = props;

	const {fire} = useEventBus();
	const onConfirmClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};
	const onClicked = () => {
		fire(EventTypes.SHOW_DIALOG,
			<>
				<DialogBody>
					<ParameterEditor>
						{def.parameters!.map(param => {
							return <Fragment key={param}>
								<ParameterEditorDropdownLabel>
									{param.replace('-', ' ')}
								</ParameterEditorDropdownLabel>
								<ParameterEditorDropdownEditor>
									<RuleParameter parameter={param} rule={rule}/>
								</ParameterEditorDropdownEditor>
							</Fragment>;
						})}
					</ParameterEditor>
				</DialogBody>
				<DialogFooter>
					<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>OK</Button>
				</DialogFooter>
			</>);
	};

	return <ParameterEditorContainer onClick={onClicked}>
		<ParameterEditorLabel/>
		<ParameterEditorIcon icon={ICON_EDIT}/>
	</ParameterEditorContainer>;
};