import {Report} from '@/services/data/tuples/report-types';
import {
	BarChart,
	BoxplotChart,
	CandlestickChart,
	CustomChart,
	EffectScatterChart,
	FunnelChart,
	GaugeChart,
	GraphChart,
	HeatmapChart,
	LineChart,
	LinesChart,
	MapChart,
	ParallelChart,
	PictorialBarChart,
	PieChart,
	RadarChart,
	SankeyChart,
	ScatterChart,
	SunburstChart,
	ThemeRiverChart,
	TreeChart,
	TreemapChart
} from 'echarts/charts';
import {
	AriaComponent,
	AxisPointerComponent,
	BrushComponent,
	CalendarComponent,
	DatasetComponent,
	DataZoomComponent,
	DataZoomInsideComponent,
	DataZoomSliderComponent,
	GeoComponent,
	GraphicComponent,
	GridComponent,
	GridSimpleComponent,
	LegendComponent,
	LegendPlainComponent,
	LegendScrollComponent,
	MarkAreaComponent,
	MarkLineComponent,
	MarkPointComponent,
	ParallelComponent,
	PolarComponent,
	RadarComponent,
	SingleAxisComponent,
	TimelineComponent,
	TitleComponent,
	ToolboxComponent,
	TooltipComponent,
	TransformComponent,
	VisualMapComponent,
	VisualMapContinuousComponent,
	VisualMapPiecewiseComponent
} from 'echarts/components';
import * as echarts from 'echarts/core';
import {EChartsType} from 'echarts/core';
import {CanvasRenderer} from 'echarts/renderers';
import React, {useEffect, useRef, useState} from 'react';
import {ChartEChartOptions} from '../chart-utils/types';
import {useReportEventBus} from '../report-event-bus';
import {ReportEventTypes} from '../report-event-bus-types';
import {EChartDiagramContainer} from './widgets';

echarts.use([
	TitleComponent, TooltipComponent, GridComponent, AxisPointerComponent, DataZoomComponent,
	GeoComponent, VisualMapComponent, ToolboxComponent, GraphicComponent, LegendComponent, AriaComponent, BrushComponent, DatasetComponent,
	// for customized
	CalendarComponent, DataZoomInsideComponent, DataZoomSliderComponent, GridSimpleComponent, LegendPlainComponent, LegendScrollComponent,
	MarkAreaComponent, MarkLineComponent, MarkPointComponent, ParallelComponent, PolarComponent, RadarComponent, SingleAxisComponent,
	TimelineComponent, TransformComponent, VisualMapContinuousComponent, VisualMapPiecewiseComponent,

	GraphChart, CustomChart, BarChart, LineChart, LinesChart, PieChart, EffectScatterChart, ScatterChart, SunburstChart, TreeChart, TreemapChart, MapChart,
	// for customized
	CandlestickChart, FunnelChart, GaugeChart, HeatmapChart, ParallelChart, BoxplotChart, PictorialBarChart, SankeyChart, RadarChart, ThemeRiverChart,
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