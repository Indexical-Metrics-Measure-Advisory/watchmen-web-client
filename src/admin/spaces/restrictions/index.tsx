import {Space} from '@/services/data/tuples/space-types';
import React from 'react';
import {RestrictionsTable} from './restrictions-table';

export const Restrictions = (props: { space: Space }) => {
	const {space} = props;

	return <RestrictionsTable space={space}/>;
};