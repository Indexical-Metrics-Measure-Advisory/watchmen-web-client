import {Enum} from '@/services/data/tuples/enum-types';
import React from 'react';
import {ItemsTable} from './items-table';

export const Items = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	return <ItemsTable enumeration={enumeration}/>;
};