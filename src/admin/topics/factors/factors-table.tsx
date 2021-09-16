import React from 'react';
import {QueryEnumForHolder} from '@/services/tuples/query-enum-types';
import {Topic} from '@/services/tuples/topic-types';
import {FactorAddButton} from './factor-add-button';
import {FactorsImportButton} from './factors-import-button';
import {FactorsTableBody} from './factors-table-body';
import {FactorsTableHeader} from './factors-table-header';
import {FactorsTableContainer, FactorsTableFooter} from './widgets';

export const FactorsTable = (props: { topic: Topic, enums: Array<QueryEnumForHolder> }) => {
	const {topic, enums} = props;

	return <FactorsTableContainer>
		<FactorsTableHeader topic={topic}/>
		<FactorsTableBody topic={topic} enums={enums}/>
		<FactorsTableFooter>
			<FactorAddButton topic={topic}/>
			<FactorsImportButton topic={topic}/>
		</FactorsTableFooter>
	</FactorsTableContainer>;
};