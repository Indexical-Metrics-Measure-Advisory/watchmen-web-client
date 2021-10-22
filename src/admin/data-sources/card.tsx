import {QueryDataSource} from '@/services/data/tuples/query-data-source-types';
import React from 'react';
import {StandardTupleCard} from '../widgets/tuple-workbench/tuple-card';

export const renderCard = (dataSource: QueryDataSource) => {
	return <StandardTupleCard key={dataSource.dataSourceId} tuple={dataSource}
	                          name={() => dataSource.dataSourceCode}
	                          description={() => `${dataSource.dataSourceType || ''} @${dataSource.tenantName || ''}`}/>;
};