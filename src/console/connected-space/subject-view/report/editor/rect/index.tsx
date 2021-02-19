import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { Section } from '../settings-widgets/section';
import { PropName, PropValue } from '../settings-widgets/widgets';

export const RectSection = (props: { report: Report }) => {
	const { report } = props;

	return <Section title={Lang.CONSOLE.CONNECTED_SPACE.CHART.SECTION_TITLE_SIZE}>
		<PropName>{Lang.CONSOLE.CONNECTED_SPACE.CHART.WIDTH}</PropName>
		<PropValue></PropValue>
		<PropName>{Lang.CONSOLE.CONNECTED_SPACE.CHART.HEIGHT}</PropName>
		<PropValue></PropValue>
	</Section>;
};