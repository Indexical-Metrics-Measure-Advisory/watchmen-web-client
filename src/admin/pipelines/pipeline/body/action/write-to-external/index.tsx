import {isWriteExternalEnabled} from '@/feature-switch';
import {ExternalWriter} from '@/services/data/tuples/external-writer-types';
import {PipelineStage} from '@/services/data/tuples/pipeline-stage-types';
import {PipelineStageUnitAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-types';
import {isWriteToExternalAction} from '@/services/data/tuples/pipeline-stage-unit-action/pipeline-stage-unit-action-utils';
import {WriteToExternalAction} from '@/services/data/tuples/pipeline-stage-unit-action/system-actions-types';
import {PipelineStageUnit} from '@/services/data/tuples/pipeline-stage-unit-types';
import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AdminCacheData} from '@/services/local-persist/types';
import {DropdownOption} from '@/widgets/basic/types';
import {useForceUpdate} from '@/widgets/basic/utils';
import React, {useEffect, useState} from 'react';
// noinspection ES6PreferShortImport
import {useAdminCacheEventBus} from '../../../../../cache/cache-event-bus';
// noinspection ES6PreferShortImport
import {AdminCacheEventTypes} from '../../../../../cache/cache-event-bus-types';
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

	const {once: onceCache} = useAdminCacheEventBus();
	const {fire} = useActionEventBus();
	const [externalWriters, setExternalWriters] = useState<Array<ExternalWriter>>([]);
	const forceUpdate = useForceUpdate();
	useEffect(() => {
		const askData = () => {
			onceCache(AdminCacheEventTypes.REPLY_DATA_LOADED, (loaded) => {
				if (loaded) {
					onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
						setExternalWriters(data?.externalWriters || []);
					}).fire(AdminCacheEventTypes.ASK_DATA);
				} else {
					setTimeout(() => askData(), 100);
				}
			}).fire(AdminCacheEventTypes.ASK_DATA_LOADED);
		};
		askData();
	}, [onceCache]);

	const onAdapterChange = ({value}: DropdownOption) => {
		if (action.externalWriterId === value) {
			return;
		}

		action.externalWriterId = value;
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
			label: () => ({
				node: <IncorrectOptionLabel>{action.externalWriterId}</IncorrectOptionLabel>,
				label: action.externalWriterId
			})
		});
	}

	return <>
		<ActionLeadLabelThin>Adapter:</ActionLeadLabelThin>
		<AdapterFinderContainer>
			<AdapterDropdown value={action.externalWriterId || ''} options={options} onChange={onAdapterChange}
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