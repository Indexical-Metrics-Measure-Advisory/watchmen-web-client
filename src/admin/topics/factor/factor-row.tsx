import React from 'react';
import {Factor} from '../../../services/tuples/factor-types';
import {QueryEnumForHolder} from '../../../services/tuples/query-enum-types';
import {Topic} from '../../../services/tuples/topic-types';
import {FactorButtons} from './factor-buttons';
import {FactorDefaultValueCell} from './factor-default-value-cell';
import {FactorEnumCell} from './factor-enum-cell';
import {FactorIndexGroupCell} from './factor-index-group-cell';
import {FactorLabelCell} from './factor-label-cell';
import {FactorNameCell} from './factor-name-cell';
import {FactorTypeCell} from './factor-type-cell';
import {FactorPropLabel, FactorRowContainer} from './widgets';
import {FactorFlattenCell} from './factor-flatten-cell';

export const FactorRow = (props: {
	topic: Topic;
	factor: Factor;
	enums: Array<QueryEnumForHolder>;
}) => {
	const {topic, factor, enums} = props;

	return <FactorRowContainer>
		{/*<FactorSerialCell topic={topic} factor={factor}/>*/}
		<FactorPropLabel><span>#{topic.factors.indexOf(factor) + 1}</span> Name</FactorPropLabel>
		<FactorNameCell topic={topic} factor={factor}/>
		<FactorPropLabel>Label</FactorPropLabel>
		<FactorLabelCell factor={factor}/>
		<FactorPropLabel>Type</FactorPropLabel>
		<FactorTypeCell topic={topic} factor={factor}/>
		<FactorEnumCell factor={factor} enums={enums}/>
		<FactorPropLabel>Default Value</FactorPropLabel>
		<FactorDefaultValueCell factor={factor}/>
		<FactorPropLabel>Index Group</FactorPropLabel>
		<FactorIndexGroupCell factor={factor}/>
		<FactorFlattenCell topic={topic} factor={factor}/>
		<FactorButtons topic={topic} factor={factor}/>
	</FactorRowContainer>;
};