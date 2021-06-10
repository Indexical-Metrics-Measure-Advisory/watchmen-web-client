import {MonitorRule} from '../../../services/data-quality/rules';
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
import {MonitorRuleDef} from '../utils';
import {ButtonInk} from '../../../basic-widgets/types';
import {useEventBus} from '../../../events/event-bus';
import {EventTypes} from '../../../events/types';
import {DialogBody, DialogFooter} from '../../../dialog/widgets';
import {Button} from '../../../basic-widgets/button';
import {RuleParameter} from './rule-parameters';

export const RuleParameters = (props: { rule: MonitorRule, def: MonitorRuleDef }) => {
	const {rule, def} = props;

	const {fire} = useEventBus();
	const onConfirmClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};
	const onClicked = () => {
		fire(EventTypes.SHOW_DIALOG, <>
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