import React from 'react';
import { ItemsTableHeaderCell, ItemsTableHeaderContainer } from './widgets';

export const ItemsTableHeader = () => {
	return <ItemsTableHeaderContainer>
		<ItemsTableHeaderCell>#</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Code</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Label</ItemsTableHeaderCell>
		<ItemsTableHeaderCell>Parent Code</ItemsTableHeaderCell>
	</ItemsTableHeaderContainer>;
};