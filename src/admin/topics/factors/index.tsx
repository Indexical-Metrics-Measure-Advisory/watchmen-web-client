import {QueryEnumForHolder} from '@/services/data/tuples/query-enum-types';
import {Topic} from '@/services/data/tuples/topic-types';
import React from 'react';
import {FactorsButton} from './factors-button';
import {FactorsTable} from './factors-table';

export const Factors = (props: { topic: Topic, enums: Array<QueryEnumForHolder> }) => {
	const {topic, enums} = props;

	return <>
		<FactorsButton topic={topic}/>
		<FactorsTable topic={topic} enums={enums}/>
	</>;
};