import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import { ChartBorderStyle, ChartFontStyle, ChartFontWeight } from '../../../../../../services/tuples/chart-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { getCurrentTheme } from '../../../../../../theme/theme-wrapper';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { ColorValue } from '../settings-widgets/color-value';
import { DropdownValue } from '../settings-widgets/dropdown-value';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';
import { TextValue } from '../settings-widgets/text-value';

const BorderStyleOptions: Array<DropdownOption> = [
	{ value: ChartBorderStyle.NONE, label: Lang.CHART.BORDER_STYLE_NONE },
	{ value: ChartBorderStyle.SOLID, label: Lang.CHART.BORDER_STYLE_SOLID },
	{ value: ChartBorderStyle.DOTTED, label: Lang.CHART.BORDER_STYLE_DOTTED },
	{ value: ChartBorderStyle.DASHED, label: Lang.CHART.BORDER_STYLE_DASHED }
];
const FontStyleOptions: Array<DropdownOption> = [
	{ value: ChartFontStyle.NORMAL, label: Lang.CHART.FONT_STYLE_NORMAL },
	{ value: ChartFontStyle.ITALIC, label: Lang.CHART.FONT_STYLE_ITALIC }
];
const FontWeightOptions: Array<DropdownOption> = [
	{ value: ChartFontWeight.W100, label: Lang.CHART.FONT_WEIGHT_100 },
	{ value: ChartFontWeight.W200, label: Lang.CHART.FONT_WEIGHT_200 },
	{ value: ChartFontWeight.W300, label: Lang.CHART.FONT_WEIGHT_300 },
	{ value: ChartFontWeight.W400, label: Lang.CHART.FONT_WEIGHT_400 },
	{ value: ChartFontWeight.W500, label: Lang.CHART.FONT_WEIGHT_500 },
	{ value: ChartFontWeight.W600, label: Lang.CHART.FONT_WEIGHT_600 },
	{ value: ChartFontWeight.W700, label: Lang.CHART.FONT_WEIGHT_700 },
	{ value: ChartFontWeight.W800, label: Lang.CHART.FONT_WEIGHT_800 },
	{ value: ChartFontWeight.W900, label: Lang.CHART.FONT_WEIGHT_900 }
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
	const onNumberChange = (prop: 'borderWidth' | 'borderRadius' | 'fontSize') => (value: string) => {
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		const numberValue = parseInt(value);
		report.chart.settings[prop] = numberValue;
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
		return numberValue;
	};
	const onDropdownValueChange = (prop: 'borderStyle' | 'fontStyle' | 'fontWeight') => (option: DropdownOption) => {
		const { value } = option;
		if (!report.chart.settings) {
			report.chart.settings = {};
		}
		report.chart.settings[prop] = value;
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};

	const theme = getCurrentTheme();
	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<TextValue label={Lang.CHART.FONT_FAMILY}
		           value={report.chart.settings?.fontFamily} onValueChange={onFontFamilyChange}/>
		<ColorValue label={Lang.CHART.FONT_COLOR}
		            value={report.chart.settings?.fontColor} defaultValue={theme.fontColor}
		            onValueChange={onColorChange('fontColor')}/>
		<NumberValue label={Lang.CHART.FONT_SIZE}
		             value={report.chart.settings?.fontSize} defaultValue={theme.fontSize}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange('fontSize')}/>
		<DropdownValue label={Lang.CHART.FONT_STYLE} options={FontStyleOptions}
		               value={report.chart.settings?.fontStyle} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange('fontStyle')}/>
		<DropdownValue label={Lang.CHART.FONT_WEIGHT} options={FontWeightOptions}
		               value={report.chart.settings?.fontWeight} defaultValue={`${theme.fontNormal}`}
		               onValueChange={onDropdownValueChange('fontWeight')}/>

		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={report.chart.settings?.backgroundColor} defaultValue={theme.bgColor}
		            onValueChange={onColorChange('backgroundColor')}/>

		<DropdownValue label={Lang.CHART.BORDER_STYLE} options={BorderStyleOptions}
		               value={report.chart.settings?.borderStyle} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange('borderStyle')}/>
		<NumberValue label={Lang.CHART.BORDER_WIDTH}
		             value={report.chart.settings?.borderWidth} defaultValue={0}
		             placeholder={'0 - 999'}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange('borderWidth')}/>
		<ColorValue label={Lang.CHART.BORDER_COLOR}
		            value={report.chart.settings?.borderColor} defaultValue={theme.borderColor}
		            onValueChange={onColorChange('borderColor')}/>
		<NumberValue label={Lang.CHART.BORDER_RADIUS}
		             value={report.chart.settings?.borderRadius} defaultValue={0}
		             placeholder={'0 - 9999'}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange('borderRadius')}/>
	</Section>;
};