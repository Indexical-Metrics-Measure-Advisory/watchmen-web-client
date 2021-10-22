import {QuerySpace} from '@/services/data/tuples/query-space-types';
import React from 'react';
import {StandardTupleCard} from '../widgets/tuple-workbench/tuple-card';

export const renderCard = (space: QuerySpace) => {
	return <StandardTupleCard key={space.spaceId} tuple={space}
	                          name={() => space.name}
	                          description={() => space.description}/>;
};