import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { Section } from '../settings-widgets/section';

export const RectSection = (props: { report: Report }) => {
	const { report } = props;

	return <Section title={Lang.CONSOLE.CONNECTED_SPACE.CHART_SECTION_TITLE_SIZE}>
		</Section>
};