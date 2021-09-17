import {Enum} from '@/services/data/tuples/enum-types';
import React from 'react';
import {ItemsExportButton} from './items-export-button';
import {ItemsImportButton} from './items-import-button';
import {ItemsTableBody} from './items-table-body';
import {ItemsTableHeader} from './items-table-header';
import {ItemsTableContainer, ItemsTableFooter} from './widgets';

export const ItemsTable = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	return <ItemsTableContainer>
		<ItemsTableHeader enumeration={enumeration}/>
		<ItemsTableBody enumeration={enumeration}/>
		<ItemsTableFooter>
			<ItemsImportButton enumeration={enumeration}/>
			<ItemsExportButton enumeration={enumeration}/>
		</ItemsTableFooter>
	</ItemsTableContainer>;
};