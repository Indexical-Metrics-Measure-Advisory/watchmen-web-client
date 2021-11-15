import {QueryExternalWriter} from '@/services/data/tuples/query-external-writer-types';
import {StandardTupleCard} from '@/widgets/tuple-workbench/tuple-card';
import React from 'react';

export const renderCard = (writer: QueryExternalWriter) => {
	return <StandardTupleCard key={writer.writerId} tuple={writer}
	                          name={() => writer.writerCode}
	                          description={() => `${writer.type || ''} @${writer.tenantName || ''}`}/>;
};