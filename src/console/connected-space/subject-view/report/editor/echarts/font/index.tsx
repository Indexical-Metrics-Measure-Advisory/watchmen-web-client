import React from 'react';
import { Lang } from '../../../../../../../langs';
import { EChartsFontHolder } from '../../../../../../../services/tuples/echarts/echarts-font-types';
import { EChart } from '../../../../../../../services/tuples/echarts/echarts-types';
import { Report } from '../../../../../../../services/tuples/report-types';
import { getCurrentTheme } from '../../../../../../../theme/theme-wrapper';
import {
	createFontFamilyOptions,
	EChartTitlePropNames,
	FontStyleOptions,
	FontWeightOptions,
	onColorChange,
	onDropdownValueChange,
	onNumberChange,
	validateNumber
} from '../../data-utils';
import { ColorValue } from '../../settings-widgets/color-value';
import { DropdownValue } from '../../settings-widgets/dropdown-value';
import { NumberValue } from '../../settings-widgets/number-value';

export interface SettingsFontPropNames {
	family: EChartTitlePropNames.TEXT_FONT_FAMILY | EChartTitlePropNames.SUBTEXT_FONT_FAMILY;
	size: EChartTitlePropNames.TEXT_FONT_SIZE | EChartTitlePropNames.SUBTEXT_FONT_SIZE;
	weight: EChartTitlePropNames.TEXT_FONT_WEIGHT | EChartTitlePropNames.SUBTEXT_FONT_WEIGHT;
	color: EChartTitlePropNames.TEXT_FONT_COLOR | EChartTitlePropNames.SUBTEXT_FONT_COLOR;
	style: EChartTitlePropNames.TEXT_FONT_STYLE | EChartTitlePropNames.SUBTEXT_FONT_STYLE;
}

export const FontSettings = (props: {
	report: Report;
	chart: EChart;
	getHolder: (chart: EChart) => EChartsFontHolder | undefined;
	propNames: SettingsFontPropNames;
	onValueChange: () => void;
}) => {
	const {
		report, chart, getHolder,
		propNames: {
			family: fontFamilyPropName,
			size: fontSizePropName,
			weight: fontWeightPropName,
			color: fontColorPropName,
			style: fontStylePropName
		},
		onValueChange
	} = props;

	const theme = getCurrentTheme();
	const FontFamilyOptions = createFontFamilyOptions(theme);

	const holder = getHolder(chart);

	return <>
		<DropdownValue label={Lang.CHART.FONT_FAMILY} options={FontFamilyOptions}
		               value={holder?.font?.family}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: fontFamilyPropName,
			               done: onValueChange
		               })}/>
		<ColorValue label={Lang.CHART.FONT_COLOR}
		            value={holder?.font?.color}
		            onValueChange={onColorChange({
			            report,
			            chart,
			            prop: fontColorPropName,
			            done: onValueChange
		            })}/>
		<NumberValue label={Lang.CHART.FONT_SIZE} unitLabel={Lang.CHART.PIXEL}
		             value={holder?.font?.size}
		             validate={validateNumber(3)}
		             onValueChange={onNumberChange({
			             report,
			             chart,
			             prop: fontSizePropName,
			             done: onValueChange
		             })}/>
		<DropdownValue label={Lang.CHART.FONT_STYLE} options={FontStyleOptions}
		               value={holder?.font?.style}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: fontStylePropName,
			               done: onValueChange
		               })}/>
		<DropdownValue label={Lang.CHART.FONT_WEIGHT} options={FontWeightOptions}
		               value={holder?.font?.weight}
		               onValueChange={onDropdownValueChange({
			               report,
			               chart,
			               prop: fontWeightPropName,
			               done: onValueChange
		               })}/>
	</>;
};