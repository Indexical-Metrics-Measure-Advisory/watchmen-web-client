import React from 'react';
import {Report} from '../../../../../services/tuples/report-types';
import {ReportDataSetNoColumn} from './widgets';
import {Lang} from '../../../../../langs';

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