import {LegendComponentOption} from 'echarts/components';
import {ECharts} from '../../services/tuples/echarts/echarts-types';
import {cleanUselessValues} from './data-utils';

export const buildEChartsLegend = (chart: ECharts, legendNames: Array<string>): LegendComponentOption | undefined => {
    let {settings} = chart;

    if (!settings) {
        settings = {};
        chart.settings = settings;
    }

    const {legend} = settings;

    if (!legend) {
        return (void 0);
    }

    return cleanUselessValues({
        show: legend.show,
        type: 'plain',
        orient: legend.orient,
        data: legendNames,
        textStyle: {
            color: legend.font?.color,
            fontStyle: legend.font?.style,
            fontWeight: legend.font?.weight as any,
            fontFamily: legend.font?.family,
            fontSize: legend.font?.size
        },
        backgroundColor: legend.backgroundColor,
        padding: legend.padding,
        borderColor: legend.border?.color,
        borderWidth: legend.border?.width,
        borderType: legend.border?.style as any,
        borderRadius: legend.border?.radius,
        top: legend.position?.top,
        right: legend.position?.right,
        left: legend.position?.left,
        bottom: legend.position?.bottom
    });
};