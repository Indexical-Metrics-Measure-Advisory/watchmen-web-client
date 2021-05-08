import React from 'react';
import {Enum} from '../../../services/tuples/enum-types';
import {ItemsTable} from './items-table';

export const Items = (props: { enumeration: Enum }) => {
	const {enumeration} = props;

	return <ItemsTable enumeration={enumeration}/>;
};