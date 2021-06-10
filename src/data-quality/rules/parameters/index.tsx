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
import {Factor} from '../../../services/tuples/factor-types';
import {Topic} from '../../../services/tuples/topic-types';
import {DQCCacheData} from '../../cache/types';
import {DataQualityCacheEventTypes} from '../../cache/cache-event-bus-types';
import {useDataQualityCacheEventBus} from '../../cache/cache-event-bus';

export const RuleParameters = (props: {
	rule: MonitorRule;
	def: MonitorRuleDef;
	topic?: Topic;
	factor?: Factor;
}) => {
	const {rule, def, topic, factor} = props;

	const {fire} = useEventBus();
	const {once} = useDataQualityCacheEventBus();
	const onConfirmClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};
	const onClicked = () => {
		const askData = () => {
			once(DataQualityCacheEventTypes.REPLY_DATA, (data?: DQCCacheData) => {
				const topics = data ? data.topics : [];
				fire(EventTypes.SHOW_DIALOG, <>
					<DialogBody>
						<ParameterEditor>
							{def.parameters!.map(param => {
								return <Fragment key={param}>
									<ParameterEditorDropdownLabel>
										{param.replace('-', ' ')}
									</ParameterEditorDropdownLabel>
									<ParameterEditorDropdownEditor>
										<RuleParameter parameter={param} rule={rule}
										               topic={topic} factor={factor}
										               topics={topics}/>
									</ParameterEditorDropdownEditor>
								</Fragment>;
							})}
						</ParameterEditor>
					</DialogBody>
					<DialogFooter>
						<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>OK</Button>
					</DialogFooter>
				</>);
			}).fire(DataQualityCacheEventTypes.ASK_DATA);
		};
		const askDataLoaded = (askData: () => void) => {
			once(DataQualityCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
				if (loaded) {
					askData();
				} else {
					setTimeout(() => askDataLoaded(askData), 100);
				}
			}).fire(DataQualityCacheEventTypes.ASK_DATA_LOADED);
		};
		askDataLoaded(askData);
	};

	return <ParameterEditorContainer onClick={onClicked}>
		<ParameterEditorLabel/>
		<ParameterEditorIcon icon={ICON_EDIT}/>
	</ParameterEditorContainer>;
};
