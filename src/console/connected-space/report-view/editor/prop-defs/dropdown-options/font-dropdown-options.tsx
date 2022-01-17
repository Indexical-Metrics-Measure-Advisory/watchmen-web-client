import {ChartFontStyle, ChartFontWeight} from '@/services/data/tuples/chart-types';
import {DropdownOption} from '@/widgets/basic/types';
import {Lang} from '@/widgets/langs';
import {Theme} from '@/widgets/theme/types';

export const FontStyleOptions: Array<DropdownOption> = [
	{value: ChartFontStyle.NORMAL, label: Lang.CHART.FONT_STYLE_NORMAL},
	{value: ChartFontStyle.ITALIC, label: Lang.CHART.FONT_STYLE_ITALIC}
];
export const FontWeightOptions: Array<DropdownOption> = [
	{value: ChartFontWeight.W100, label: Lang.CHART.FONT_WEIGHT_100},
	{value: ChartFontWeight.W200, label: Lang.CHART.FONT_WEIGHT_200},
	{value: ChartFontWeight.W300, label: Lang.CHART.FONT_WEIGHT_300},
	{value: ChartFontWeight.W400, label: Lang.CHART.FONT_WEIGHT_400},
	{value: ChartFontWeight.W500, label: Lang.CHART.FONT_WEIGHT_500},
	{value: ChartFontWeight.W600, label: Lang.CHART.FONT_WEIGHT_600},
	{value: ChartFontWeight.W700, label: Lang.CHART.FONT_WEIGHT_700},
	{value: ChartFontWeight.W800, label: Lang.CHART.FONT_WEIGHT_800},
	{value: ChartFontWeight.W900, label: Lang.CHART.FONT_WEIGHT_900}
];
export const createFontFamilyOptions = (theme: Theme) => {
	return theme.fontFamily.split(',')
		.filter(x => !!x)
		.map(font => font.trim())
		.map(font => font.startsWith('\'') ? font.substring(1) : font)
		.map(font => font.endsWith('\'') ? font.substring(0, font.length - 1) : font)
		.map(font => font.replace(/-/g, ' ').trim())
		.map(font => ({name: font, label: font}))
		.map(({name, label}) => {
			return {
				value: name,
				label: () => {
					return {
						node: <span style={{textTransform: 'capitalize'}}>{label}</span>,
						label
					};
				}
			};
		});
};