import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import React from 'react';
import {ReportDataSetNoColumn} from './widgets';

export const NoColumn = (props: { report: Report }) => {
	const {report} = props;

	if (report.indicators.length !== 0 || report.dimensions.length !== 0) {
		return null;
	}

	return <ReportDataSetNoColumn>
		<span>
			{Lang.CONSOLE.CONNECTED_SPACE.NO_DATASET_COLUMN}
		</span>
	</ReportDataSetNoColumn>;
};