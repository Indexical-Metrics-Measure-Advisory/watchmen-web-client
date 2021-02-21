import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { Section } from '../settings-widgets/section';

export const ChartCountSettings = (props: { report: Report }) => {
	// const { report } = props;

	return <Section title={Lang.CHART.SECTION_TITLE_COUNT_CHART}>
		<span/>
	</Section>;
};