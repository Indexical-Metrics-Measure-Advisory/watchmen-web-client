import {QueryReport} from '@/services/data/tuples/query-report-types';
import {StandardTupleCard} from '@/widgets/tuple-workbench/tuple-card';
import React from 'react';

export const renderCard = (report: QueryReport) => {
	return <StandardTupleCard key={report.reportId} tuple={report}
	                          name={() => report.name}
	                          description={() => report.description}/>;
};