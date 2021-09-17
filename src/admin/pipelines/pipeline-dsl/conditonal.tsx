import {Conditional} from '@/services/data/tuples/pipeline-super-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {BooleanValue, PropName} from './dsl-widgets';
import {JointLine} from './joint/joint';

export const ConditionalLine = (props: { conditional: Conditional, topicsMap: Map<string, Topic>, indent?: number }) => {
	const {conditional, topicsMap, indent = 0} = props;

	if (!conditional.conditional) {
		return <>
			<PropName indent={indent}>conditional</PropName>
			<BooleanValue>false</BooleanValue>
		</>;
	} else {
		return <>
			<PropName indent={indent}>conditional</PropName>
			<JointLine joint={conditional.on} topicsMap={topicsMap} indent={indent}/>
		</>;
	}
};