import React, { Fragment } from 'react';
import { QueryEnumForHolder } from '../../../services/tuples/query-enum-types';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorsButton } from './factors-button';
import { FactorsTable } from './factors-table';

export const Factors = (props: { topic: Topic, enums: Array<QueryEnumForHolder> }) => {
	const { topic, enums } = props;

	return <Fragment>
		<FactorsButton topic={topic}/>
		<FactorsTable topic={topic} enums={enums}/>
	</Fragment>;
};