import {getWriteExternalAdapters, isWriteExternalEnabled} from '@/feature-switch';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isWriteToExternalAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {WriteToExternalAction} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useState} from 'react';
import {useActionType} from '../action-effect/use-action-type';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {ActionLeadLabelThin} from '../widgets';
import {AdapterDropdown, AdapterFinderContainer, IncorrectOptionLabel} from './widgets';

const RealWriteToExternal = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: WriteToExternalAction;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {action} = props;

	const {fire} = useActionEventBus();
	const [adapters] = useState<Array<string>>(getWriteExternalAdapters());
	const forceUpdate = useForceUpdate();

	const onAdapterChange = ({value}: DropdownOption) => {
		if (action.adapter === value) {
			return;
		}

		action.adapter = value;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	const options: Array<DropdownOption> = adapters.map(adapter => ({value: adapter, label: adapter}));
	if (adapters.every(adapter => adapter !== action.adapter)) {
		options.push({
			value: action.adapter,
			label: () => ({node: <IncorrectOptionLabel>{action.adapter}</IncorrectOptionLabel>, label: action.adapter})
		});
	}

	return <>
		<ActionLeadLabelThin>Adapter:</ActionLeadLabelThin>
		<AdapterFinderContainer>
			<AdapterDropdown value={action.adapter || ''} options={options} onChange={onAdapterChange}
			                 please="External Writer?"/>
		</AdapterFinderContainer>
	</>;
};

export const WriteToExternal = (props: {
	pipeline: Pipeline;
	stage: PipelineStage;
	unit: PipelineStageUnit;
	action: PipelineStageUnitAction;
	topics: Array<Topic>;
	triggerTopic: Topic;
}) => {
	const {pipeline, stage, unit, action, topics, triggerTopic} = props;

	useActionType(action);

	if (!isWriteExternalEnabled() || !isWriteToExternalAction(action)) {
		return null;
	}

	return <RealWriteToExternal pipeline={pipeline} stage={stage} unit={unit} action={action}
	                            topics={topics} triggerTopic={triggerTopic}/>;
};