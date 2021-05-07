import React from 'react';
import {Parameter} from '../../../../../../services/tuples/factor-calculator-types';
import {Topic} from '../../../../../../services/tuples/topic-types';
import {ComputedEditor} from '../../parameter/compute';
import {ConstantEditor} from '../../parameter/constant';
import {ParameterFromEditor} from '../../parameter/param-from';
import {TopicFactorEditor} from '../../parameter/topic-factor';
import {ExpressionSideContainer} from './widgets';

export const ExpressionSide = (props: { parameter: Parameter, topics: Array<Topic>, visible?: boolean }) => {
    const {parameter, topics, visible = true} = props;

    return <ExpressionSideContainer visible={visible}>
        <ParameterFromEditor parameter={parameter}/>
        <TopicFactorEditor parameter={parameter} topics={topics}/>
        <ConstantEditor parameter={parameter}/>
        <ComputedEditor parameter={parameter} topics={topics}/>
    </ExpressionSideContainer>;
};