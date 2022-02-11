import {Factor} from '@/services/data/tuples/factor-types';
import {QueryEnumForHolder} from '@/services/data/tuples/query-enum-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorButtons} from './factor-buttons';
import {FactorDefaultValueCell} from './factor-default-value-cell';
import {FactorDescriptionCell} from './factor-description-cell';
import {FactorEncryptCell} from './factor-encrypt-cell';
import {FactorEnumCell} from './factor-enum-cell';
import {FactorFlattenCell} from './factor-flatten-cell';
import {FactorIndexGroupCell} from './factor-index-group-cell';
import {FactorLabelCell} from './factor-label-cell';
import {FactorNameCell} from './factor-name-cell';
import {FactorTypeCell} from './factor-type-cell';
import {FactorDescriptionLabel, FactorPropLabel, FactorRowContainer} from './widgets';

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
		<FactorPropLabel>Type</FactorPropLabel>
		<FactorTypeCell topic={topic} factor={factor}/>
		<FactorPropLabel>Label</FactorPropLabel>
		<FactorLabelCell factor={factor}/>
		<FactorPropLabel>Default Value</FactorPropLabel>
		<FactorDefaultValueCell factor={factor}/>
		<FactorEnumCell factor={factor} enums={enums}/>
		<FactorPropLabel>Index Group</FactorPropLabel>
		<FactorIndexGroupCell factor={factor}/>
		<FactorEncryptCell topic={topic} factor={factor}/>
		<FactorFlattenCell topic={topic} factor={factor}/>
		<FactorDescriptionLabel>Description</FactorDescriptionLabel>
		<FactorDescriptionCell factor={factor}/>
		<FactorButtons topic={topic} factor={factor}/>
	</FactorRowContainer>;
};