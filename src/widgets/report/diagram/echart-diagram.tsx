import {Report} from '@/services/data/tuples/report-types';
import 'echarts-gl';
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
import {ChartOptions} from '../chart-utils/types';
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

export const EChartDiagram = (props: { report: Report; thumbnail: boolean }) => {
	const {report, thumbnail} = props;
	// console.log(JSON.stringify(options));

	const {on, off, fire} = useReportEventBus();
	// noinspection TypeScriptValidateTypes
	const rootRef = useRef<HTMLDivElement>(null);
	const [chartInstance, setChartInstance] = useState<EChartsType | null>(null);
	useEffect(() => {
		const onChartOptionsReady = (aReport: Report, options: ChartOptions) => {
			if (aReport !== report) {
				return;
			}
			if (chartInstance) {
				chartInstance.dispose();
			}
			const instance = echarts.init(rootRef.current!);
			const onFinished = () => {
				fire(ReportEventTypes.REPAINTED, report);
				instance.off('finished', onFinished);
				if (thumbnail) {
					const image = new Image();
					image.onload = () => {
						const canvas = document.createElement('canvas');
						canvas.width = 400;
						canvas.height = 300;
						const ctx = canvas.getContext('2d');
						let width = image.width;
						let height = image.height;
						if (width > canvas.width || height > canvas.height) {
							const ratio = Math.min(canvas.width / width, canvas.height / height);
							width = width * ratio;
							height = height * ratio;
						}
						const dx = (canvas.width - width) / 2;
						const dy = (canvas.height - height) / 2;
						ctx?.drawImage(image, dx, dy, width, height);
						report.simulateThumbnail = canvas.toDataURL('png');
						fire(ReportEventTypes.THUMBNAIL_CAUGHT, report);
					};
					image.src = instance.getDataURL({type: 'png', pixelRatio: window.devicePixelRatio});
				}
			};
			instance.on('finished', onFinished);
			instance.setOption(options, {notMerge: true});
			setChartInstance(instance);
		};
		on(ReportEventTypes.CHART_OPTIONS_READY, onChartOptionsReady);
		return () => {
			off(ReportEventTypes.CHART_OPTIONS_READY, onChartOptionsReady);
		};
	}, [fire, on, off, report, thumbnail, chartInstance]);
	useEffect(() => {
		if (rootRef.current) {
			// @ts-ignore
			const resizeObserver = new ResizeObserver(() => {
				chartInstance && chartInstance.resize();
			});
			resizeObserver.observe(rootRef.current);
			return () => resizeObserver.disconnect();
		}
	});
	useEffect(() => {
		const onAskDownloadChart = (aReport: Report, onChartBase64Ready: (base64?: string) => void) => {
			if (report !== aReport) {
				return;
			}
			const base64 = chartInstance?.getDataURL({type: 'png', pixelRatio: window.devicePixelRatio});
			onChartBase64Ready(base64);
		};
		on(ReportEventTypes.ASK_DOWNLOAD_CHART, onAskDownloadChart);
		return () => {
			off(ReportEventTypes.ASK_DOWNLOAD_CHART, onAskDownloadChart);
		};
	}, [on, off, fire, chartInstance, report]);

	return <EChartDiagramContainer ref={rootRef}/>;
};