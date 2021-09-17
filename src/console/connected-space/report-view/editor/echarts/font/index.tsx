import {EChartsFontHolder} from '@/services/data/tuples/echarts/echarts-font-types';
import {ECharts} from '@/services/data/tuples/echarts/echarts-types';
import {Report} from '@/services/data/tuples/report-types';
import {Lang} from '@/widgets/langs';
import {getCurrentTheme} from '@/widgets/theme/theme-wrapper';
import React from 'react';
import {onColorChange, onDropdownValueChange, onNumberChange, validateNumber} from '../../data-utils';
import {BarChartStylePropNames} from '../../prop-defs/chart-styles/bar-chart-style-props';
import {CountChartStylePropNames} from '../../prop-defs/chart-styles/count-chart-style-props';
import {PieChartStylePropNames} from '../../prop-defs/chart-styles/pie-chart-style-props';
import {
	createFontFamilyOptions,
	FontStyleOptions,
	FontWeightOptions
} from '../../prop-defs/dropdown-options/font-dropdown-options';
import {EChartsLegendPropNames} from '../../prop-defs/echart-styles/echarts-legend-props';
import {EChartsTitlePropNames} from '../../prop-defs/echart-styles/echarts-title-props';
import {EChartsXAxisPropNames} from '../../prop-defs/echart-styles/echarts-xaxis-props';
import {EChartsYAxisPropNames} from '../../prop-defs/echart-styles/echarts-yaxis-props';
import {ColorValue} from '../../settings-widgets/color-value';
import {DropdownValue} from '../../settings-widgets/dropdown-value';
import {NumberValue} from '../../settings-widgets/number-value';

export interface SettingsFontPropNames {
	family: CountChartStylePropNames.TEXT_FONT_FAMILY
		| BarChartStylePropNames.LABEL_FONT_FAMILY
		| PieChartStylePropNames.LABEL_FONT_FAMILY
		| EChartsTitlePropNames.TEXT_FONT_FAMILY
		| EChartsTitlePropNames.SUBTEXT_FONT_FAMILY
		| EChartsLegendPropNames.FONT_FAMILY
		| EChartsXAxisPropNames.NAME_FONT_FAMILY
		| EChartsXAxisPropNames.LABEL_FONT_FAMILY
		| EChartsYAxisPropNames.NAME_FONT_FAMILY
		| EChartsYAxisPropNames.LABEL_FONT_FAMILY;
	size: CountChartStylePropNames.TEXT_FONT_SIZE
		| BarChartStylePropNames.LABEL_FONT_SIZE
		| PieChartStylePropNames.LABEL_FONT_SIZE
		| EChartsTitlePropNames.TEXT_FONT_SIZE
		| EChartsTitlePropNames.SUBTEXT_FONT_SIZE
		| EChartsLegendPropNames.FONT_SIZE
		| EChartsXAxisPropNames.NAME_FONT_SIZE
		| EChartsXAxisPropNames.LABEL_FONT_SIZE
		| EChartsYAxisPropNames.NAME_FONT_SIZE
		| EChartsYAxisPropNames.LABEL_FONT_SIZE;
	weight: CountChartStylePropNames.TEXT_FONT_WEIGHT
		| BarChartStylePropNames.LABEL_FONT_WEIGHT
		| PieChartStylePropNames.LABEL_FONT_WEIGHT
		| EChartsTitlePropNames.TEXT_FONT_WEIGHT
		| EChartsTitlePropNames.SUBTEXT_FONT_WEIGHT
		| EChartsLegendPropNames.FONT_WEIGHT
		| EChartsXAxisPropNames.NAME_FONT_WEIGHT
		| EChartsXAxisPropNames.LABEL_FONT_WEIGHT
		| EChartsYAxisPropNames.NAME_FONT_WEIGHT
		| EChartsYAxisPropNames.LABEL_FONT_WEIGHT;
	color: CountChartStylePropNames.TEXT_FONT_COLOR
		| BarChartStylePropNames.LABEL_FONT_COLOR
		| PieChartStylePropNames.LABEL_FONT_COLOR
		| EChartsTitlePropNames.TEXT_FONT_COLOR
		| EChartsTitlePropNames.SUBTEXT_FONT_COLOR
		| EChartsLegendPropNames.FONT_COLOR
		| EChartsXAxisPropNames.NAME_FONT_COLOR
		| EChartsXAxisPropNames.LABEL_FONT_COLOR
		| EChartsYAxisPropNames.NAME_FONT_COLOR
		| EChartsYAxisPropNames.LABEL_FONT_COLOR;
	style: CountChartStylePropNames.TEXT_FONT_STYLE
		| BarChartStylePropNames.LABEL_FONT_STYLE
		| PieChartStylePropNames.LABEL_FONT_STYLE
		| EChartsTitlePropNames.TEXT_FONT_STYLE
		| EChartsTitlePropNames.SUBTEXT_FONT_STYLE
		| EChartsLegendPropNames.FONT_STYLE
		| EChartsXAxisPropNames.NAME_FONT_STYLE
		| EChartsXAxisPropNames.LABEL_FONT_STYLE
		| EChartsYAxisPropNames.NAME_FONT_STYLE
		| EChartsYAxisPropNames.LABEL_FONT_STYLE;
}

export const FontSettings = (props: {
	report: Report;
	chart: ECharts;
	getHolder: (chart: ECharts) => EChartsFontHolder | undefined;
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