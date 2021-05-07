import React from 'react';
import {Factor} from '../../../../services/tuples/factor-types';
import {Topic} from '../../../../services/tuples/topic-types';
import {FactorName, FactorRowContainer, FactorTypeSmall} from './topic-widgets';

export const FactorRow = (props: { topic: Topic, factor: Factor }) => {
    const {factor} = props;

    return <FactorRowContainer>
        <FactorName>{factor.label || factor.name}</FactorName>
        <FactorTypeSmall factor={factor}/>
    </FactorRowContainer>;
};