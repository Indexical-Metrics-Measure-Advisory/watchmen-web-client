import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { Section } from '../settings-widgets/section';
import { BorderRadius } from './border-radius';
import { BorderStyle } from './border-style';
import { BorderWidth } from './border-width';
import { BackgroundColor } from './colors/background-color';
import { BorderColor } from './colors/border-color';
import { FontColor } from './colors/font-color';

export const BasicStylesSection = (props: { report: Report }) => {
	const { report } = props;

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<FontColor report={report}/>
		<BackgroundColor report={report}/>
		<BorderStyle report={report}/>
		<BorderWidth report={report}/>
		<BorderColor report={report}/>
		<BorderRadius report={report}/>
	</Section>;
};