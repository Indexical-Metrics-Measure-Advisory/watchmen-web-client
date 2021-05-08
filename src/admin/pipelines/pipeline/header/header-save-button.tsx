import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React, {useEffect, useState} from 'react';
import {Button} from '../../../../basic-widgets/button';
import {ICON_SAVE} from '../../../../basic-widgets/constants';
import {ButtonInk} from '../../../../basic-widgets/types';
import {DialogBody, DialogFooter, DialogLabel} from '../../../../dialog/widgets';
import {useEventBus} from '../../../../events/event-bus';
import {EventTypes} from '../../../../events/types';
import {Lang} from '../../../../langs';
import {Pipeline} from '../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {usePipelinesEventBus} from '../../pipelines-event-bus';
import {PipelinesEventTypes} from '../../pipelines-event-bus-types';
import {usePipelineEventBus} from '../pipeline-event-bus';
import {PipelineEventTypes} from '../pipeline-event-bus-types';
import {useValidate} from '../valiator/use-validate';
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
            <Button ink={ButtonInk.PRIMARY} onClick={onConfirmClicked}>{Lang.ACTIONS.CONFIRM}</Button>
            <Button ink={ButtonInk.WAIVE} onClick={onCancelClicked}>{Lang.ACTIONS.CANCEL}</Button>
        </DialogFooter>
    </>;
};

export const HeaderSaveButton = (props: { pipeline: Pipeline }) => {
    const {pipeline} = props;

    const {fire: fireGlobal} = useEventBus();
    const {once: oncePipelines} = usePipelinesEventBus();
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
        oncePipelines(PipelinesEventTypes.REPLY_TOPICS, async (topics: Array<Topic>) => {
            const pass = await validate(pipeline, topics);
            if (pass !== true) {
                fireGlobal(EventTypes.SHOW_DIALOG,
                    <StillSaveDialog message={pass}
                                     onSave={() => fire(PipelineEventTypes.SAVE_PIPELINE, pipeline)}/>);
            } else {
                fire(PipelineEventTypes.SAVE_PIPELINE, pipeline);
            }
        }).fire(PipelinesEventTypes.ASK_TOPICS);
    };

    return <PipelineSaveButton tooltip='Save Pipeline'
                               onClick={onClicked}
                               changed={changed}>
        <FontAwesomeIcon icon={ICON_SAVE}/>
        {changed ? <PipelineChangeLabel>Pipeline Changed</PipelineChangeLabel> : null}
    </PipelineSaveButton>;
};