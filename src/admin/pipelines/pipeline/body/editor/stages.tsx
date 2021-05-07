import React, {useEffect} from 'react';
import {useForceUpdate} from '../../../../../basic-widgets/utils';
import {Pipeline} from '../../../../../services/tuples/pipeline-types';
import {Topic} from '../../../../../services/tuples/topic-types';
import {generateUuid} from '../../../../../services/tuples/utils';
import {usePipelineEventBus} from '../../pipeline-event-bus';
import {PipelineEventTypes} from '../../pipeline-event-bus-types';
import {StageEditor} from '../stage';
import {StageEventBusProvider} from '../stage/stage-event-bus';
import {Stage2PipelineBridge} from './stage-2-pipeline-bridge';

export const Stages = (props: {
    pipeline: Pipeline;
    topics: Array<Topic>;
    topic: Topic;
}) => {
    const {pipeline, topics, topic} = props;

    const {on, off} = usePipelineEventBus();
    const forceUpdate = useForceUpdate();
    useEffect(() => {
        on(PipelineEventTypes.STAGE_ADDED, forceUpdate);
        on(PipelineEventTypes.STAGE_REMOVED, forceUpdate);
        on(PipelineEventTypes.STAGE_SORTED, forceUpdate);
        return () => {
            off(PipelineEventTypes.STAGE_ADDED, forceUpdate);
            off(PipelineEventTypes.STAGE_REMOVED, forceUpdate);
            off(PipelineEventTypes.STAGE_SORTED, forceUpdate);
        };
    }, [on, off, forceUpdate]);

    return <>
        {pipeline.stages.map(stage => {
            if (!stage.stageId) {
                stage.stageId = generateUuid();
            }
            return <StageEventBusProvider key={stage.stageId}>
                <Stage2PipelineBridge pipeline={pipeline} stage={stage}/>
                <StageEditor pipeline={pipeline} stage={stage}
                             topics={topics} topic={topic}/>
            </StageEventBusProvider>;
        })}
    </>;
};