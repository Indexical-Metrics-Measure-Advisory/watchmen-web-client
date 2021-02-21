import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { Section } from '../settings-widgets/section';
import { PropName, PropValue } from '../settings-widgets/widgets';
import { BackgroundColor } from './colors/background-color';
import { BorderColor } from './colors/border-color';
import { FontColor } from './colors/font-color';

export const BasicStylesSection = (props: { report: Report }) => {
	const { report } = props;

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<FontColor report={report}/>
		<BackgroundColor report={report}/>
		<PropName>{Lang.CHART.BORDER}</PropName>
		<PropValue/>
		<PropName>{Lang.CHART.BORDER_WIDTH}</PropName>
		<PropValue/>
		<BorderColor report={report}/>
		<PropName>{Lang.CHART.BORDER_RADIUS}</PropName>
		<PropValue/>
	</Section>;
};