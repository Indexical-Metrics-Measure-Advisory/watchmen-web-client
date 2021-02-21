import React from 'react';
import { useForceUpdate } from '../../../../../../basic-widgets/utils';
import { Lang } from '../../../../../../langs';
import { Report } from '../../../../../../services/tuples/report-types';
import DefaultTheme from '../../../../../../theme/default-theme';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { Section } from '../settings-widgets/section';
import { PropName, PropValue } from '../settings-widgets/widgets';
import { ChartColorPicker } from './widgets';

export const BasicStylesSection = (props: { report: Report }) => {
	const { report } = props;
	const { chart: { settings } } = report;

	const { fire } = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	const onColorChange = (prop: 'color' | 'backgroundColor' | 'borderColor') => (color?: string) => {
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		if (!color) {
			delete report.chart.settings[prop];
		} else {
			report.chart.settings[prop] = color;
		}
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
		forceUpdate();
	};

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<PropName>{Lang.CHART.COLOR}</PropName>
		<PropValue>
			<ChartColorPicker color={settings?.color || DefaultTheme.fontColor} onChange={onColorChange('color')}/>
		</PropValue>
		<PropName>{Lang.CHART.BACKGROUND_COLOR}</PropName>
		<PropValue>
			<ChartColorPicker color={settings?.backgroundColor || DefaultTheme.bgColor}
			                  onChange={onColorChange('backgroundColor')}/>
		</PropValue>
		<PropName>{Lang.CHART.BORDER}</PropName>
		<PropValue/>
		<PropName>{Lang.CHART.BORDER_WIDTH}</PropName>
		<PropValue/>
		<PropName>{Lang.CHART.BORDER_COLOR}</PropName>
		<PropValue>
			<ChartColorPicker color={settings?.borderColor || DefaultTheme.borderColor}
			                  onChange={onColorChange('borderColor')}/>
		</PropValue>
		<PropName>{Lang.CHART.BORDER_RADIUS}</PropName>
		<PropValue/>
	</Section>;
};