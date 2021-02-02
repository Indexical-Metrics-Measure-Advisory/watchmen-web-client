import React, { Fragment } from 'react';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorsTable } from './factors-table';
import { FactorsButton } from './factors-button';

export const Factors = (props: { topic: Topic }) => {
	const { topic } = props;

	return <Fragment>
		<FactorsButton topic={topic}/>
		<FactorsTable topic={topic}/>
	</Fragment>;
};