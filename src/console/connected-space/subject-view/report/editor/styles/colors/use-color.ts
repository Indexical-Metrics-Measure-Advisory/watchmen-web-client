import { useForceUpdate } from '../../../../../../../basic-widgets/utils';
import { Report } from '../../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../../report-edit-event-bus';
import { ReportEditEventTypes } from '../../report-edit-event-bus-types';

export const useColor = (options: {
	report: Report;
	propName: 'color' | 'backgroundColor' | 'borderColor';
	defaultColor?: string
}) => {
	const { report, propName, defaultColor = 'rgba(0,0,0,1)' } = options;
	const { chart: { settings } } = report;

	const { fire } = useReportEditEventBus();
	const forceUpdate = useForceUpdate();
	const onColorChange = (color?: string) => {
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		if (!color) {
			delete report.chart.settings[propName];
		} else {
			report.chart.settings[propName] = color;
		}
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
		forceUpdate();
	};

	return { color: (settings || {})[propName] || defaultColor, onColorChange };
};