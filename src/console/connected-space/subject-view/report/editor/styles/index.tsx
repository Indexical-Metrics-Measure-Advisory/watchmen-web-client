import React from 'react';
import { DropdownOption } from '../../../../../../basic-widgets/types';
import { Lang } from '../../../../../../langs';
import {
	Chart,
	ChartBorderStyle,
	ChartFontStyle,
	ChartFontWeight
} from '../../../../../../services/tuples/chart-types';
import { Report } from '../../../../../../services/tuples/report-types';
import { getCurrentTheme } from '../../../../../../theme/theme-wrapper';
import { useReportEditEventBus } from '../report-edit-event-bus';
import { ReportEditEventTypes } from '../report-edit-event-bus-types';
import { ColorValue } from '../settings-widgets/color-value';
import { DropdownValue } from '../settings-widgets/dropdown-value';
import { NumberValue } from '../settings-widgets/number-value';
import { Section } from '../settings-widgets/section';

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

const assignValue = (chart: Chart, propNames: string, value: any, removePropOnNoValue: boolean) => {
	if (!chart.settings) {
		chart.settings = {};
	}

	const names = propNames.split('.');
	let holder = chart.settings as any;
	for (let index = 0, count = names.length - 1; index < count; index++) {
		const parent = holder;
		holder = parent[names[index]];
		if (!holder) {
			holder = {};
			parent[names[index]] = holder;
		}
	}
	if (value == null && removePropOnNoValue) {
		delete holder[names[names.length - 1]];
	} else {
		holder[names[names.length - 1]] = value;
	}
};

export const BasicStylesSection = (props: { report: Report }) => {
	const { report } = props;
	const { chart } = report;

	const { fire } = useReportEditEventBus();

	const onColorChange = (prop: 'font.color' | 'backgroundColor' | 'border.color') => (color?: string) => {
		assignValue(chart, prop, color, true);
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};
	const validateNumber = (fractionDigits: number) => (value: string) => {
		return new RegExp(`^\\d{1,${fractionDigits}}$`).test(value);
	};
	const onNumberChange = (prop: 'border.width' | 'border.radius' | 'font.size') => (value: string) => {
		const numberValue = parseInt(value);
		assignValue(chart, prop, numberValue, false);
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
		return numberValue;
	};
	const onDropdownValueChange = (prop: 'border.style' | 'font.family' | 'font.style' | 'font.weight') => (option: DropdownOption) => {
		const { value } = option;
		assignValue(chart, prop, value, false);
		fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
	};

	const theme = getCurrentTheme();
	const FontFamilyOptions = theme.fontFamily.split(',')
		.filter(x => !!x)
		.map(font => ({ name: font, label: font.trim() }))
		.map(({ name, label }) => {
			label = label.startsWith('\'') ? label.substr(1) : label;
			label = label.endsWith('\'') ? label.substr(0, label.length - 1) : label;
			label = label.replace(/-/g, ' ').trim();
			return { name, label };
		})
		.map(({ name, label }) => {
			return {
				value: name,
				label: () => {
					return {
						node: <span style={{ textTransform: 'capitalize' }}>{label}</span>,
						label
					};
				}
			};
		});

	return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
		<DropdownValue label={Lang.CHART.FONT_FAMILY} options={FontFamilyOptions}
		               value={report.chart.settings?.font?.family}
		               onValueChange={onDropdownValueChange('font.family')}/>
		<ColorValue label={Lang.CHART.FONT_COLOR}
		            value={report.chart.settings?.font?.color} defaultValue={theme.fontColor}
		            onValueChange={onColorChange('font.color')}/>
		<NumberValue label={Lang.CHART.FONT_SIZE} unitLabel={Lang.CHART.PIXEL}
		             value={report.chart.settings?.font?.size} defaultValue={theme.fontSize}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange('font.size')}/>
		<DropdownValue label={Lang.CHART.FONT_STYLE} options={FontStyleOptions}
		               value={report.chart.settings?.font?.style} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange('font.style')}/>
		<DropdownValue label={Lang.CHART.FONT_WEIGHT} options={FontWeightOptions}
		               value={report.chart.settings?.font?.weight} defaultValue={`${theme.fontNormal}`}
		               onValueChange={onDropdownValueChange('font.weight')}/>

		<ColorValue label={Lang.CHART.BACKGROUND_COLOR}
		            value={report.chart.settings?.backgroundColor} defaultValue={theme.bgColor}
		            onValueChange={onColorChange('backgroundColor')}/>

		<DropdownValue label={Lang.CHART.BORDER_STYLE} options={BorderStyleOptions}
		               value={report.chart.settings?.border?.style} defaultValue={ChartBorderStyle.NONE}
		               onValueChange={onDropdownValueChange('border.style')}/>
		<NumberValue label={Lang.CHART.BORDER_WIDTH} unitLabel={Lang.CHART.PIXEL}
		             value={report.chart.settings?.border?.width} defaultValue={0}
		             placeholder={'0 - 999'}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange('border.width')}/>
		<ColorValue label={Lang.CHART.BORDER_COLOR}
		            value={report.chart.settings?.border?.color} defaultValue={theme.borderColor}
		            onValueChange={onColorChange('border.color')}/>
		<NumberValue label={Lang.CHART.BORDER_RADIUS} unitLabel={Lang.CHART.PIXEL}
		             value={report.chart.settings?.border?.radius} defaultValue={0}
		             placeholder={'0 - 9999'}
		             validate={validateNumber(4)}
		             onValueChange={onNumberChange('border.radius')}/>
	</Section>;
};