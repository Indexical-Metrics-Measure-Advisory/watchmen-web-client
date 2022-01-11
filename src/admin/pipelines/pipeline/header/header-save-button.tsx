import {Pipeline} from '@/services/data/tuples/pipeline-types';
import {Topic} from '@/services/data/tuples/topic-types';
import {noop} from '@/services/utils';
import {AlertLabel} from '@/widgets/alert/widgets';
import {Button} from '@/widgets/basic/button';
import {ICON_SAVE} from '@/widgets/basic/constants';
import {ButtonInk} from '@/widgets/basic/types';
import {DialogBody, DialogFooter, DialogLabel} from '@/widgets/dialog/widgets';
import {useEventBus} from '@/widgets/events/event-bus';
import {EventTypes} from '@/widgets/events/types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {usePipelinesEventBus} from '../../pipelines-event-bus';
import {PipelinesEventTypes} from '../../pipelines-event-bus-types';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';
import {useValidate} from '../validator/use-validate';
import {PipelineChangeLabel, PipelineSaveButton} from './widgets';

const StillSaveDialog = (props: { message: string, onSave: () => void }) => {
	const {message, onSave} = props;

	const {fire} = useEventBus();

	const onConfirmClicked = async () => {
		onSave();
		fire(EventTypes.HIDE_DIALOG);
	};
	const onCancelClicked = () => {
		fire(EventTypes.HIDE_DIALOG);
	};

	return <>
		<DialogBody>
			<DialogLabel>{message}</DialogLabel>
			<DialogLabel style={{display: 'block'}}>Click "Confirm" to save it anyway.</DialogLabel>
		</DialogBody>
		<DialogFooter>
			<Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>Confirm</Button>
			<Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>Cancel</Button>
		</DialogFooter>
	</>;
};

export const HeaderSaveButton = (props: { pipeline: Pipeline }) => {
	const {pipeline} = props;

	const {fire: fireGlobal} = useEventBus();
	const {fire: firePipelines} = usePipelinesEventBus();
	const {on, off, fire} = usePipelineEventBus();
	const [changed, setChanged] = useState(false);
	const validate = useValidate();
	useEffect(() => {
		const onPipelineChanged = () => setChanged(true);
		const onPipelineSaved = (pipeline: Pipeline, saved: boolean) => {
			if (saved) {
				setChanged(false);
			}
		};
		on(PipelineEventTypes.TRIGGER_TYPE_CHANGED, onPipelineChanged);
		on(PipelineEventTypes.CONDITION_CHANGED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_ADDED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_REMOVED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_CHANGED, onPipelineChanged);
		on(PipelineEventTypes.STAGE_SORTED, onPipelineChanged);

		on(PipelineEventTypes.PIPELINE_SAVED, onPipelineSaved);
		return () => {
			off(PipelineEventTypes.TRIGGER_TYPE_CHANGED, onPipelineChanged);
			off(PipelineEventTypes.CONDITION_CHANGED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_ADDED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_REMOVED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_CHANGED, onPipelineChanged);
			off(PipelineEventTypes.STAGE_SORTED, onPipelineChanged);

			off(PipelineEventTypes.PIPELINE_SAVED, onPipelineSaved);
		};
	}, [on, off]);

	const onClicked = () => {
		firePipelines(PipelinesEventTypes.ASK_TOPICS, async (topics: Array<Topic>) => {
			const result = await validate(pipeline, topics);
			if (!result.pass) {
				fireGlobal(EventTypes.SHOW_DIALOG,
					<StillSaveDialog message={result.message || ''}
					                 onSave={() => {
						                 fire(PipelineEventTypes.SAVE_PIPELINE, pipeline, noop);
					                 }}/>);
			} else {
				fire(PipelineEventTypes.SAVE_PIPELINE, pipeline, noop);
				if (result.message) {
					// warning message
					fireGlobal(EventTypes.SHOW_ALERT, <AlertLabel>{result.message}</AlertLabel>);
				}
			}
		});
	};

	return <PipelineSaveButton tooltip="Save Pipeline"
	                           onClick={onClicked}
	                           changed={changed}>
		<FontAwesomeIcon icon={ICON_SAVE}/>
		{changed ? <PipelineChangeLabel>Pipeline Changed</PipelineChangeLabel> : null}
	</PipelineSaveButton>;
};