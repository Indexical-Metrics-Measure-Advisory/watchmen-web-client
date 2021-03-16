import React from 'react';
import { Topic } from '../../../services/tuples/topic-types';
import { FactorAddButton } from './factor-add-button';
import { FactorsImportButton } from './factors-import-button';
import { FactorsTableBody } from './factors-table-body';
import { FactorsTableContainer, FactorsTableFooter } from './widgets';

export const FactorsTable = (props: { topic: Topic }) => {
	const { topic } = props;

	return <FactorsTableContainer>
		{/*<FactorsTableHeader>*/}
		{/*	<FactorsTableHeaderCell>#</FactorsTableHeaderCell>*/}
		{/*	<FactorsTableHeaderCell>Name</FactorsTableHeaderCell>*/}
		{/*	<FactorsTableHeaderCell>Label</FactorsTableHeaderCell>*/}
		{/*	<FactorsTableHeaderCell>Type</FactorsTableHeaderCell>*/}
		{/*	<FactorsTableHeaderCell>Default Value</FactorsTableHeaderCell>*/}
		{/*	<FactorsTableHeaderCell/>*/}
		{/*</FactorsTableHeader>*/}
		<FactorsTableBody topic={topic}/>
		<FactorsTableFooter>
			<FactorAddButton topic={topic}/>
			<FactorsImportButton topic={topic}/>
		</FactorsTableFooter>
	</FactorsTableContainer>;
};