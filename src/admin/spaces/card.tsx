import {QuerySpace} from '@/services/data/tuples/query-space-types';
import {StandardTupleCard} from '@/widgets/tuple-workbench/tuple-card';
import React from 'react';

export const renderCard = (space: QuerySpace) => {
	return <StandardTupleCard key={space.spaceId} tuple={space}
	                          name={() => space.name}
	                          description={() => space.description}/>;
};