import React from 'react';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import { Section } from '../settings-widgets/section';
import { PropName, PropValue } from '../settings-widgets/widgets';
import { ChartColorPicker } from './widgets';

export const StylesSection = (props: { report: Report }) => {
	// const { report } = props;

	// const { fire } = useReportEditEventBus();
	// const [ delegate, setDelegate ] = useState({ width: `${rect.width}`, height: `${rect.height}` });

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<PropName>{Lang.CHART.COLOR}</PropName>
		<PropValue>
			<ChartColorPicker/>
		</PropValue>
		<PropName>{Lang.CHART.BACKGROUND_COLOR}</PropName>
		<PropValue>
			<ChartColorPicker/>
		</PropValue>
		<PropName>{Lang.CHART.BORDER}</PropName>
		<PropValue/>
		<PropName>{Lang.CHART.BORDER_WIDTH}</PropName>
		<PropValue/>
		<PropName>{Lang.CHART.BORDER_COLOR}</PropName>
		<PropValue>
			<ChartColorPicker/>
		</PropValue>
		<PropName>{Lang.CHART.BORDER_RADIUS}</PropName>
		<PropValue/>
	</Section>;
};