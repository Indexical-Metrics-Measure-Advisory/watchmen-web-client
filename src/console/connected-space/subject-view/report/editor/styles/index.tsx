import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { ChartBorderStyle } from '../../../../../../services/tuples/chart-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { ColorValue } from '../settings-widgets/color-value';
import { DropdownValue } from '../settings-widgets/dropdown-value';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';
import { TextValue } from '../settings-widgets/text-value';

const BorderStyleOptions: Array<DropdownOption> = [
	{ value: ChartBorderStyle.NONE, label: Lang.CHART.BORDER_NONE },
	{ value: ChartBorderStyle.SOLID, label: Lang.CHART.BORDER_SOLID },
	{ value: ChartBorderStyle.DOTTED, label: Lang.CHART.BORDER_DOTTED },
	{ value: ChartBorderStyle.DASHED, label: Lang.CHART.BORDER_DASHED }
];

export const BasicStylesSection = (props: { report: Report }) => {
	const { report } = props;

	const { fire } = useReportEditEventBus();

	const onFontFamilyChange = (value: string) => {
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		report.chart.settings.fontFamily = value;
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};
	const onColorChange = (prop: 'fontColor' | 'backgroundColor' | 'borderColor') => (color?: string) => {
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		if (!color) {
			delete report.chart.settings[prop];
		} else {
			report.chart.settings[prop] = color;
		}
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};
	const validateNumber = (fractionDigits: number) => (value: string) => {
		return new RegExp(`^\\d{1,${fractionDigits}}$`).test(value);
	};
	const onNumberChange = (prop: 'borderWidth' | 'borderRadius') => (value: string) => {
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		const numberValue = parseInt(value);
		report.chart.settings[prop] = numberValue;
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
		return numberValue;
	};
	const onDropdownValueChange = (prop: 'borderStyle') => (option: DropdownOption) => {
		const { value } = option;
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		report.chart.settings[prop] = value;
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<TextValue label={Lang.CHART.FONT_FAMILY}
		           value={report.chart.settings?.fontFamily} onValueChange={onFontFamilyChange}/>
		<ColorValue label={Lang.CHART.FONT_COLOR}
		            value={report.chart.settings?.fontColor} onValueChange={onColorChange('fontColor')}/>
		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={report.chart.settings?.backgroundColor} onValueChange={onColorChange('backgroundColor')}/>
		<DropdownValue label={Lang.CHART.BORDER_STYLE} options={BorderStyleOptions}
		               value={report.chart.settings?.borderStyle} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange('borderStyle')}/>
		<NumberValue label={Lang.CHART.BORDER_WIDTH}
		             value={report.chart.settings?.borderWidth} defaultValue={0}
		             placeholder={'0 - 99'}
		             validate={validateNumber(2)} onValueChange={onNumberChange('borderWidth')}/>
		<ColorValue label={Lang.CHART.BORDER_COLOR}
		            value={report.chart.settings?.borderColor} onValueChange={onColorChange('borderColor')}/>
		<NumberValue label={Lang.CHART.BORDER_RADIUS}
		             value={report.chart.settings?.borderRadius} defaultValue={0}
		             placeholder={'0 - 9999'}
		             validate={validateNumber(4)} onValueChange={onNumberChange('borderRadius')}/>
	</Section>;
};