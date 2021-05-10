import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {ICON_PIPELINE} from '../../../basic-widgets/constants';
import {PageHeaderButton} from '../../../basic-widgets/page-header-buttons';
import {DropdownOption} from '../../../basic-widgets/types';
import {Pipeline} from '../../../services/tuples/pipeline-types';
import {useEventBus} from '../../../events/event-bus';
import {useSimulatorEventBus} from '../simulator-event-bus';
import {SimulatorEventTypes} from '../simulator-event-bus-types';
import {useCacheEventBus} from '../../cache/cache-event-bus';
import {AdminCacheEventTypes} from '../../cache/cache-event-bus-types';
import {EventTypes} from '../../../events/types';
import {TupleSwitch} from './switch-dialog';
import {AdminCacheData} from '../../../local-persist/types';
import {getPipelineName} from '../utils';

const toOption = (pipeline: Pipeline) => {
	return {
		value: pipeline,
		label: (option: DropdownOption) => {
			const p = option.value as Pipeline;
			return {
				node: getPipelineName(p),
				label: getPipelineName(p)
			};
		},
		key: (option: DropdownOption) => (option.value as Pipeline).pipelineId
	};
};

export const HeaderFromPipelineButton = () => {
	const {fire} = useEventBus();
	const {once: onceCache} = useCacheEventBus();
	const {fire: fireSimulator} = useSimulatorEventBus();
	const onSelected = (pipeline: Pipeline) => {
		fireSimulator(SimulatorEventTypes.START_PIPELINE, pipeline);
	};
	const doSelectPipeline = () => {
		onceCache(AdminCacheEventTypes.REPLY_DATA, (data?: AdminCacheData) => {
			const candidates = (data?.pipelines || []).sort((a, b) => {
				if (!a.name) {
					return b.name ? 1 : a.pipelineId.localeCompare(b.pipelineId);
				} else if (!b.name) {
					return a.name ? -1 : a.pipelineId.localeCompare(b.pipelineId);
				} else {
					return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
				}
			});
			fire(EventTypes.SHOW_DIALOG,
				<TupleSwitch candidates={candidates} toOption={toOption}
				             switchTo={onSelected}
				             label="Please select a pipeline to start:"/>);
		}).fire(AdminCacheEventTypes.ASK_DATA);

	};
	const onClicked = () => {
		const ask = () => {
			onceCache(AdminCacheEventTypes.REPLY_DATA_LOADED, (loaded: boolean) => {
				if (loaded) {
					doSelectPipeline();
				} else {
					setTimeout(() => ask(), 100);
				}
			}).fire(AdminCacheEventTypes.ASK_DATA_LOADED);
		};
		ask();
	};

	return <PageHeaderButton tooltip="Starts from Pipeline" onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_PIPELINE}/>
	</PageHeaderButton>;
};