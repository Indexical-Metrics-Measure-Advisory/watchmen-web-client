import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {AlertLabel} from '@/widgets/alert/widgets';
import {ICON_ENABLE} from '@/widgets/basic/constants';
import {PageHeaderButton} from '@/widgets/basic/page-header-buttons';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {usePipelinesEventBus} from '../../pipelines-event-bus';
import {PipelinesEventTypes} from '../../pipelines-event-bus-types';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';
import {useValidate} from '../validator/use-validate';

export const HeaderEnableButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {fire: fireGlobal} = useEventBus();
	const {once: oncePipelines} = usePipelinesEventBus();
	const {fire} = usePipelineEventBus();
	const validate = useValidate();

	const onClicked = () => {
		if (pipeline.enabled) {
			fire(PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, pipeline);
		} else {
			oncePipelines(PipelinesEventTypes.REPLY_TOPICS, async (topics: Array<Topic>) => {
				const result = await validate(pipeline, topics);
				if (!result.pass) {
					pipeline.enabled = false;
					fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{result.message}</AlertLabel>);
				} else {
					pipeline.enabled = true;
					fire(PipelineEventTypes.TOGGLE_PIPELINE_ENABLED, pipeline);
					if (result.message) {
						// warning message
						fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{result.message}</AlertLabel>);
					}
				}
			}).fire(PipelinesEventTypes.ASK_TOPICS);
		}
	};

	return <PageHeaderButton tooltip="Enable Pipeline"
	                         onClick={onClicked}>
		<FontAwesomeIcon icon={ICON_ENABLE}/>
	</PageHeaderButton>;
};