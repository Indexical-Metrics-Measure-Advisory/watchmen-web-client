import {isWriteExternalEnabled} from '@/feature-switch';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {
	PipelineStageUnitAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {
	isWriteToExternalAction
} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {WriteToExternalAction} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {ChangeEvent} from 'react';
// noinspection ES6PreferShortImport
import {useExternalWriters} from '../../../../../cache/use-external-writers';
import {useActionType} from '../action-effect/use-action-type';
import {useActionEventBus} from '../action-event-bus';
import {ActionEventTypes} from '../action-event-bus-types';
import {ActionLeadLabelThin} from '../widgets';
import {
	AdapterDropdown,
	AdapterFinderContainer,
	EventCodeInput,
	EventCodeInputContainer,
	EventCodeLabel,
	IncorrectOptionLabel
} from './widgets';

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
	const forceUpdate = useForceUpdate();
	const [externalWriters] = useExternalWriters();

	const onAdapterChange = ({value}: DropdownOption) => {
		if (action.externalWriterId === value) {
			return;
		}

		action.externalWriterId = value;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};
	const onEventCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
		const {value} = event.target;
		if (value === action.eventCode) {
			return;
		}

		action.eventCode = value;
		forceUpdate();
		fire(ActionEventTypes.ACTION_CONTENT_CHANGED, action);
	};

	const options: Array<DropdownOption> = externalWriters.map(adapter => ({
		value: adapter.writerId,
		label: adapter.writerCode
	}));
	// eslint-disable-next-line
	if (action.externalWriterId && externalWriters.every(writer => writer.writerId != action.externalWriterId)) {
		options.push({
			value: action.externalWriterId,
			label: () => {
				return {
					node: <IncorrectOptionLabel>{action.externalWriterId}</IncorrectOptionLabel>,
					label: action.externalWriterId
				};
			}
		});
	}

	return <>
		<ActionLeadLabelThin>Adapter:</ActionLeadLabelThin>
		<AdapterFinderContainer>
			<AdapterDropdown value={action.externalWriterId || ''} options={options} onChange={onAdapterChange}
			                 please="External Writer?"/>
		</AdapterFinderContainer>
		<ActionLeadLabelThin>Event Code:</ActionLeadLabelThin>
		<EventCodeInputContainer>
			<EventCodeLabel>{action.eventCode || ''}</EventCodeLabel>
			<EventCodeInput value={action.eventCode || ''} onChange={onEventCodeChange}/>
		</EventCodeInputContainer>
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