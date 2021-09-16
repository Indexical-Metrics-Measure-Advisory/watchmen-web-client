import {
	BarChart,
	CustomChart,
	EffectScatterChart,
	GraphChart,
	LineChart,
	LinesChart,
	MapChart,
	PieChart,
	ScatterChart,
	SunburstChart,
	TreeChart,
	TreemapChart
} from 'echarts/charts';
import {
	AriaComponent,
	AxisPointerComponent,
	BrushComponent,
	DatasetComponent,
	DataZoomComponent,
	GeoComponent,
	GraphicComponent,
	GridComponent,
	LegendComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	VisualMapComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import React, {useEffect, useRef, useState} from 'react';
import {ChartEChartOptions} from '../chart-utils/types';
import {EChartDiagramContainer} from './widgets';
import {useReportEventBus} from '../report-event-bus';
import {ReportEventTypes} from '../report-event-bus-types';
import {Report} from '@/services/tuples/report-types';

echarts.use([
	TitleComponent, TooltipComponent, GridComponent, AxisPointerComponent, DataZoomComponent,
	GeoComponent, VisualMapComponent, ToolboxComponent, GraphicComponent, LegendComponent, AriaComponent, BrushComponent, DatasetComponent,
	GraphChart, CustomChart,
	BarChart, LineChart, LinesChart,
	PieChart,
	EffectScatterChart, ScatterChart,
	SunburstChart, TreeChart, TreemapChart,
	MapChart,
	CanvasRenderer
]);

export const EChartDiagram = (props: { report: Report, options: ChartEChartOptions }) => {
	const {report, options} = props;
	// console.log(JSON.stringify(options));

	const {on, off, fire} = useReportEventBus();
	// noinspection TypeScriptValidateTypes
	const rootRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useEffect(() => {
		if (!chartInstance) {
			setChartInstance(echarts.init(rootRef.current!));
		} else {
			chartInstance.setOption(options, true);
		}
	}, [options, chartInstance]);
	useEffect(() => {
		if (rootRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				if (chartInstance) {
					chartInstance.resize();
				}
			});
			resizeObserver.observe(rootRef.current);
			return () => resizeObserver.disconnect();
		}
	});
	useEffect(() => {
		const onAskDownloadChart = (aReport: Report) => {
			if (report !== aReport) {
				return;
			}
			const base64 = chartInstance?.getDataURL({type: 'png', pixelRatio: window.devicePixelRatio});
			fire(ReportEventTypes.CHART_BASE64_READY, report, base64);
		};
		on(ReportEventTypes.ASK_DOWNLOAD_CHART, onAskDownloadChart);
		return () => {
			off(ReportEventTypes.ASK_DOWNLOAD_CHART, onAskDownloadChart);
		};
	}, [on, off, fire, chartInstance, report]);

	return <EChartDiagramContainer ref={rootRef}/>;
};