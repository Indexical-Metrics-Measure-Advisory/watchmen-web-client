import {QueryDataSource} from '@/services/data/tuples/query-data-source-types';
import {StandardTupleCard} from '@/widgets/tuple-workbench/tuple-card';
import React from 'react';

export const renderCard = (dataSource: QueryDataSource) => {
	return <StandardTupleCard key={dataSource.dataSourceId} tuple={dataSource}
	                          name={() => dataSource.dataSourceCode}
	                          description={() => `${dataSource.dataSourceType || ''} @${dataSource.tenantName || ''}`}/>;
};