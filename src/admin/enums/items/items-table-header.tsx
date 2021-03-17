import React from 'react';
import { ItemsTableHeaderCell, ItemsTableHeaderContainer } from './widgets';

export const ItemsTableHeader = () => {
	return <ItemsTableHeaderContainer>
		<ItemsTableHeaderCell>#</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Code</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Label</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>New Code</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Parent Enum</ItemsTableHeaderCell>
	</ItemsTableHeaderContainer>;
};