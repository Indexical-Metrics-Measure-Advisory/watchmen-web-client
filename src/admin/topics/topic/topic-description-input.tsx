import React from 'react';
import {useForceUpdate} from '../../../basic-widgets/utils';
import {Topic} from '../../../services/tuples/topic-types';
import {TuplePropertyInputLines} from '../../widgets/tuple-workbench/tuple-editor';
import {useTopicEventBus} from '../topic-event-bus';
import {TopicEventTypes} from '../topic-event-bus-types';

export const TopicDescriptionInput = (props: { topic: Topic }) => {
    const {topic} = props;

    const {fire} = useTopicEventBus();
    const forceUpdate = useForceUpdate();

    const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (topic.description !== event.target.value) {
            topic.description = event.target.value;
            fire(TopicEventTypes.TOPIC_DESCRIPTION_CHANGED, topic);
            forceUpdate();
        }
    };

    return <TuplePropertyInputLines value={topic.description || ''} onChange={onDescriptionChange}/>;
};