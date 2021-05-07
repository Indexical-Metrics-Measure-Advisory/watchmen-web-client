import React from 'react';
import {Factor} from '../../../services/tuples/factor-types';
import {Topic} from '../../../services/tuples/topic-types';
import {FactorSerialCellContainer} from './widgets';

export const FactorSerialCell = (props: { topic: Topic, factor: Factor }) => {
    const {topic, factor} = props;

    const index = topic.factors.indexOf(factor) + 1;

    return <FactorSerialCellContainer>{index}</FactorSerialCellContainer>;
};