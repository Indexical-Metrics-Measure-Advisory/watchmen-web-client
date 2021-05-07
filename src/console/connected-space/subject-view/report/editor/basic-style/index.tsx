import React from 'react';
import {Lang} from '../../../../../../langs';
import {CHART_MIN_HEIGHT, CHART_MIN_WIDTH} from '../../../../../../report/constants';
import {ChartBorderStyle} from '../../../../../../services/tuples/chart-types';
import {
    isBarChart,
    isDoughnutChart,
    isNightingaleChart,
    isPieChart,
    isSunburstChart
} from '../../../../../../services/tuples/chart-utils';
import {Report} from '../../../../../../services/tuples/report-types';
import {getCurrentTheme} from '../../../../../../theme/theme-wrapper';
import {onBooleanChange, onColorChange, onDropdownValueChange, onNumberChange, validateNumber} from '../data-utils';
import {BorderStyleOptions} from '../prop-defs/dropdown-options/border-dropdown-options';
import {PeripheralStylePropNames} from '../prop-defs/peripheral-style-props';
import {useReportEditEventBus} from '../report-edit-event-bus';
import {ReportEditEventTypes} from '../report-edit-event-bus-types';
import {useChartType} from '../settings-effect/use-chart-type';
import {BooleanValue} from '../settings-widgets/boolean-value';
import {ColorValue} from '../settings-widgets/color-value';
import {DropdownValue} from '../settings-widgets/dropdown-value';
import {NumberValue} from '../settings-widgets/number-value';
import {Section} from '../settings-widgets/section';

export const BasicStyleSection = (props: { report: Report }) => {
    const {report} = props;
    const {chart, rect} = report;

    const {fire} = useReportEditEventBus();
    useChartType({report});

    const onValueChange = (prop: 'width' | 'height') => (value?: string) => {
        let numberValue = value ? parseInt(value) : 0;
        if (prop === 'width') {
            numberValue = Math.max(numberValue, CHART_MIN_WIDTH);
        } else {
            numberValue = Math.max(numberValue, CHART_MIN_HEIGHT);
        }
        rect[prop] = numberValue;
        fire(ReportEditEventTypes.SIZE_CHANGED, report);
        return numberValue;
    };
    const onBasicStyleValueChange = () => {
        fire(ReportEditEventTypes.BASIC_STYLE_CHANGED, report);
    };

    const supportDecal = isBarChart(chart) || isPieChart(chart) || isDoughnutChart(chart) || isNightingaleChart(chart) || isSunburstChart(chart);
    const theme = getCurrentTheme();

    return <Section title={Lang.CHART.SECTION_TITLE_BASIC_STYLE}>
        <NumberValue label={Lang.CHART.WIDTH} unitLabel={Lang.CHART.PIXEL}
                     value={rect.width}
                     placeholder={'1 - 9999'}
                     validate={validateNumber(4)}
                     onValueChange={onValueChange('width')}/>
        <NumberValue label={Lang.CHART.HEIGHT} unitLabel={Lang.CHART.PIXEL}
                     value={rect.height}
                     placeholder={'1 - 9999'}
                     validate={validateNumber(4)}
                     onValueChange={onValueChange('height')}/>
        <ColorValue label={Lang.CHART.BACKGROUND_COLOR}
                    value={report.chart.settings?.backgroundColor} defaultValue={theme.bgColor}
                    onValueChange={onColorChange({
                        report,
                        chart,
                        prop: PeripheralStylePropNames.BACKGROUND_COLOR,
                        done: onBasicStyleValueChange
                    })}/>
        {supportDecal
            ? <BooleanValue label={Lang.CHART.DECAL}
                            value={(report.chart.settings as any)?.decal} defaultValue={false}
                            onValueChange={onBooleanChange({
                                report,
                                chart,
                                prop: PeripheralStylePropNames.DECAL,
                                done: onBasicStyleValueChange
                            })}/>
            : null}
        <DropdownValue label={Lang.CHART.BORDER_STYLE} options={BorderStyleOptions}
                       value={report.chart.settings?.border?.style} defaultValue={ChartBorderStyle.NONE}
                       onValueChange={onDropdownValueChange({
                           report,
                           chart,
                           prop: PeripheralStylePropNames.BORDER_STYLE,
                           done: onBasicStyleValueChange
                       })}/>
        <NumberValue label={Lang.CHART.BORDER_WIDTH} unitLabel={Lang.CHART.PIXEL}
                     value={report.chart.settings?.border?.width} defaultValue={0}
                     placeholder={'0 - 999'}
                     validate={validateNumber(3)}
                     onValueChange={onNumberChange({
                         report,
                         chart,
                         prop: PeripheralStylePropNames.BORDER_WIDTH,
                         done: onBasicStyleValueChange
                     })}/>
        <ColorValue label={Lang.CHART.BORDER_COLOR}
                    value={report.chart.settings?.border?.color} defaultValue={theme.borderColor}
                    onValueChange={onColorChange({
                        report,
                        chart,
                        prop: PeripheralStylePropNames.BORDER_COLOR,
                        done: onBasicStyleValueChange
                    })}/>
        <NumberValue label={Lang.CHART.BORDER_RADIUS} unitLabel={Lang.CHART.PIXEL}
                     value={report.chart.settings?.border?.radius} defaultValue={0}
                     placeholder={'0 - 9999'}
                     validate={validateNumber(4)}
                     onValueChange={onNumberChange({
                         report,
                         chart,
                         prop: PeripheralStylePropNames.BORDER_RADIUS,
                         done: onBasicStyleValueChange
                     })}/>
    </Section>;
};