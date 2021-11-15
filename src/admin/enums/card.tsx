import {QueryEnum} from '@/services/data/tuples/query-enum-types';
import {StandardTupleCard} from '@/widgets/tuple-workbench/tuple-card';
import React from 'react';

export const renderCard = (enumeration: QueryEnum) => {
	return <StandardTupleCard key={enumeration.enumId} tuple={enumeration}
	                          name={() => enumeration.name}
	                          description={() => enumeration.description}/>;
};