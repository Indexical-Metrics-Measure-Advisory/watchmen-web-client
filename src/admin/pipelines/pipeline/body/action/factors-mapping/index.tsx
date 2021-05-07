import React from 'react';
import {
    MappingRow,
    WriteTopicAction
} from '../../../../../../services/tuples/pipeline-stage-unit-action/write-topic-actions-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {Factors} from './factors';
import {FactorsMappingEventBusProvider} from './factors-mapping-event-bus';

export const FactorsMapping = (props: { action: WriteTopicAction & MappingRow, topics: Array<Topic>, topic: Topic }) => {
    const {action, topics, topic} = props;

    return <FactorsMappingEventBusProvider>
        <Factors action={action} topics={topics} topic={topic}/>
    </FactorsMappingEventBusProvider>;
};