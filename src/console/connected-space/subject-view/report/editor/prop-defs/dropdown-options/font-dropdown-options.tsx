import {DropdownOption} from '../../../../../../../basic-widgets/types';
import {Lang} from '../../../../../../../langs';
import {ChartFontStyle, ChartFontWeight} from '../../../../../../../services/tuples/chart-types';
import {Theme} from '../../../../../../../theme/types';

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
        .map(font => ({name: font, label: font.trim()}))
        .map(({name, label}) => {
            label = label.startsWith('\'') ? label.substr(1) : label;
            label = label.endsWith('\'') ? label.substr(0, label.length - 1) : label;
            label = label.replace(/-/g, ' ').trim();
            return {name, label};
        })
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